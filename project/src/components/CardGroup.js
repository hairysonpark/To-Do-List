import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button, Icon, Form, Dimmer, Loader } from "semantic-ui-react";
import { toast } from "react-toastify";

import ToDoCard from "./ToDoCard";
import "../styles/styles.css";

const emptyTemplate = {
	tasks: {},
	columns: {},
	columnOrder: [],
	totalTasks: 0,
	createCardButtonOpen: false,
	newListName: "",
	showCompleteTasks: true,
};

class CardGroup extends React.Component {
	state = null; // state is pointing to the centralized data file

	/* Initialize empty object to the state before render() method invoked */
	UNSAFE_componentWillMount() {
		this.setState(emptyTemplate);
		this.dimmerActive = true;
	}

	/* New props will be passed to this component.
	 * Update the state with nextProps
	 * Use the following if statement to prevent infinite loop
	 */
	UNSAFE_componentWillReceiveProps = (nextProps) => {
		/* When data object passed from firebase and send it as a props to this component
		 * set this new object to the state
		 */
		if (this.props.firebaseData !== nextProps.firebaseData) {
			/* User signed in with Google */
			if (!nextProps.userSignedOutWithGoogle) {
				/* User has data in the firestore */
				if (nextProps.firebaseData !== undefined) {
					let state = nextProps.firebaseData;
					delete state.imageURL;

					this.setState(state);
				} else if (
					/* User has create something but nothing was found in the firestore*/
					this.state !== emptyTemplate &&
					nextProps.firebaseData === undefined
				) {
					this.props.firebaseSetDataFunc(this.state);
				}
			}
			this.dimmerActive = false;
		}
	};

	/* If the user click the sign out button in firebase's index.js,
	 * The sign out button function will sent a logout signal to NavSidebar and re-render
	 * The signal will then pass to this component as a prop and update this component
	 * componentDidUpdate will be triggered. The state will be set to empty.
	 * The otter if statement is for preventing infinite loop
	 */
	componentDidUpdate = (prevState) => {
		if (
			prevState.userSignedOutWithGoogle !== this.props.userSignedOutWithGoogle
		) {
			if (this.props.userSignedOutWithGoogle) {
				this.setState({
					tasks: {},
					columns: {},
					columnOrder: [],
					totalTasks: 0,
					createCardButtonOpen: false,
					newListName: "",
				});
			}

			/* If no user is signed in, disable the dimmer since we are not able to
			 * deactivate the dimmer in UNSAFE_componentWillReceiveProps because
			 * this function will not be invoked due to the fact that no nextProp
			 * will be passed in to the component
			 */
			if (this.props.userSignedOutWithGoogle === true) {
				this.dimmerActive = false;
			}
		}
	};

	onDataSubmit = async (columnId, title, description, done = false) => {
		let currentTaskTotal = this.state.totalTasks; // Get total number of tasks
		let newTaskId = "task-" + (currentTaskTotal + 1); // Create new task id. e.g., task-5
		let newTaskObject = {
			// Create a object using title and description from parameter
			id: newTaskId,
			title: title,
			description: description,
			done: done,
			deleted: false,
		};

		let entireObjectCopy = { ...this.state }; // Copy entire data structure to a new variable. dummy way, but it works
		entireObjectCopy.tasks[newTaskId] = newTaskObject; // Put the previous created object into the tasks object
		entireObjectCopy.columns[columnId].taskIds.push(newTaskId); // Add the newly created task's ID to the correspond column
		entireObjectCopy.totalTasks = ++currentTaskTotal; // Increment the total number of tasks

		this.setState({ ...entireObjectCopy }); // Destructure the object and update

		await this.props.firebaseSetDataFunc(entireObjectCopy, true);
	};

	componentDidUpdate() {
		this.setState(this.state);
	}

	handleOnDragEnd = async (result) => {
		const { destination, source, draggableId } = result;

		// If the item is drag and drop outside of the expected area
		if (!destination) {
			return;
		}

		// If the item is drag and drop at the exactly same place
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		const sourceColumn = this.state.columns[source.droppableId];
		const destinationColumn = this.state.columns[destination.droppableId];
		const newSourceTaskIds = Array.from(sourceColumn.taskIds);
		const newDestinationTaskIds = Array.from(destinationColumn.taskIds);

		// If the item is drag and drop on the same column
		if (
			this.state.columns[source.droppableId] ===
			this.state.columns[destination.droppableId]
		) {
			newSourceTaskIds.splice(source.index, 1);
			newSourceTaskIds.splice(destination.index, 0, draggableId);

			const newSourceColumn = {
				...sourceColumn,
				taskIds: newSourceTaskIds,
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newSourceColumn.id]: newSourceColumn,
				},
			};
			this.setState(newState);
			await this.props.firebaseSetDataFunc(newState, true);
		} // If the item is drag and drop on different column
		else {
			newSourceTaskIds.splice(source.index, 1);
			newDestinationTaskIds.splice(destination.index, 0, draggableId);

			const newSourceColumn = {
				...sourceColumn,
				taskIds: newSourceTaskIds,
			};

			const newDestinationColumn = {
				...destinationColumn,
				taskIds: newDestinationTaskIds,
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newSourceColumn.id]: newSourceColumn,
					[newDestinationColumn.id]: newDestinationColumn,
				},
			};
			this.setState(newState);
			await this.props.firebaseSetDataFunc(newState, true);
		}
	};

	editRecord = async (taskObject) => {
		const newState = {
			...this.state,
			tasks: {
				...this.state.tasks,
				[taskObject.id]: taskObject,
			},
		};
		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	editTitle = async (taskObject) => {
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[taskObject.id]: {
					...this.state.columns[taskObject.id],
					title: taskObject.title,
				},
			},
		};
		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	deleteRecord = async (taskObject) => {
		const notifyComponent = () => {
			return (
				<div style={{ display: "flex" }}>
					<Icon name="trash" size="large" />
					<p>One task was deleted successfully.</p>
				</div>
			);
		};

		const notify = () =>
			toast.success(notifyComponent(), {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

		let columns = { ...this.state.columns };
		let columnId = "";

		// find which column is the owner of the delete task
		Object.keys(columns).map((column) => {
			Object.keys(columns[column]).map((columnProperty) => {
				if (columnProperty === "taskIds") {
					columns[column][columnProperty].map((taskId) => {
						if (taskId === taskObject.id) {
							columnId = column;
						}
					});
				}
			});
		});

		/* Find the correspond column and remove the task from that column
		 * And set deleted: true in the task field
		 */
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[columnId]: {
					...this.state.columns[columnId],
					// filter out a task when it find the target task id
					taskIds: [...this.state.columns[columnId].taskIds].filter(function (
						task
					) {
						return task != taskObject.id;
					}),
				},
			},
			tasks: {
				...this.state.tasks,
				[taskObject.id]: {
					...this.state.tasks[taskObject.id],
					deleted: true,
				},
			},
		};

		/* @local function: notify user the task was deleted */
		notify();
		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	deleteCard = async (column) => {
		/* Copy the entire state object */
		const newState = {
			...this.state,
		};

		/* Delete the object in data.js-> columns -> object */
		delete newState.columns[column.id];

		/* Find out this column id is corrspond to which index in the columnOrder array */
		const indexOfColumn = newState.columnOrder.indexOf(column.id);

		/* Remove the column id in columnOrder by its index */
		newState.columnOrder.splice(indexOfColumn, 1);

		/* Update state */
		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	onUndoButtonClick = async (/*FromToDoCard*/ taskId, columnId) => {
		const notifyComponent = () => {
			return (
				<div style={{ display: "flex" }}>
					<Icon name="undo alternate" size="large" />
					<p>One task was recovered successfully.</p>
				</div>
			);
		};

		const notify = () =>
			toast.success(notifyComponent(), {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

		const newState = {
			...this.state,
			tasks: {
				...this.state.tasks,
				[taskId]: {
					...this.state.tasks[taskId],
					deleted: false,
				},
			},
			columns: {
				...this.state.columns,
				[columnId]: {
					...this.state.columns[columnId],
					taskIds: [...this.state.columns[columnId].taskIds, taskId],
				},
			},
		};

		notify();

		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	createNewCard = async () => {
		/* Get the last item from columnOrder. e.g., 'list-3' */
		let temp = this.state.columnOrder.length === 0 ?
			"list-0":
			this.state.columnOrder[this.state.columnOrder.length - 1];
		
		let number = [];
		/* Break the string into char, and extract the digit part. e.g., list-15 --> 15 */
		[...temp].map((char) => {
			if (char >= '0' && char <= '9')
			number.push(char);
		})

		/* Number is a array. Need to merge them into string */
		number = number.join('');
		
		/* Convert char to Int and + 1 for the next id */
		let newId = `list-${parseInt(number, 10) + 1}`;

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newId]: {
					id: newId,
					title: `${this.state.newListName}`,
					taskIds: [],
				},
			},
			columnOrder: [...this.state.columnOrder, newId],
			createCardButtonOpen: false,
			newListName: "",
		};

		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	renderCreateNewCardButton = () => {
		return !this.state.createCardButtonOpen ? (
			<Button
				icon
				labelPosition="right"
				className="createNewCardFieldPos"
				onClick={() => this.setState({ createCardButtonOpen: true })}
			>
				Create New Card
				<Icon name="plus" />
			</Button>
		) : (
			<Form className="createNewCardForm">
				<Form.Field>
					<input
						autoFocus
						placeholder="List name"
						onChange={(e) => this.setState({ newListName: e.target.value })}
						value={this.state.newListName}
					/>
					<Button
						className="createNewCardFormButton"
						icon
						positive
						labelPosition="right"
						onClick={() => this.createNewCard()}
					>
						Add
						<Icon name="plus" />
					</Button>

					<Icon
						className="createNewCardExitIcon"
						name="close"
						size="large"
						onClick={() => this.setState({ createCardButtonOpen: false })}
					/>
				</Form.Field>
			</Form>
		);
	};

	putToCompleted = async (e, data, taskObject) => {
		/* pervent checkbox trigger parent onClick event */
		e.stopPropagation();

		const notifyComponent = () => {
			return (
				<div style={{ display: "flex" }}>
					<Icon name="archive" size="large" />
					<p>One task was marked as completed.</p>
				</div>
			);
		};

		const notify = () =>
			toast.success(notifyComponent(), {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
			});

		if (data.checked) {
			taskObject.done = true;
			/* Only notify user when a task is marked as completed */
			notify();
		} else {
			taskObject.done = false;
		}

		let newState = {
			...this.state,
			tasks: {
				...this.state.tasks,
				[taskObject.id]: taskObject,
			},
		};

		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	onShowCompleteTasksCheckboxClick = async () => {
		let newState = {
			...this.state,
			showCompleteTasks: !this.state.showCompleteTasks,
		};

		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState, true);
	};

	render() {
		return (
			<div className="ui four column doubling stackable grid customContainer">
				<Dimmer inverted active={this.dimmerActive}>
					<Loader>Loading</Loader>
				</Dimmer>
				<DragDropContext onDragEnd={this.handleOnDragEnd}>
					{this.state.columnOrder.map((columnId) => {
						const column = this.state.columns[columnId];
						const tasks = column.taskIds.map(
							(taskId) => this.state.tasks[taskId]
						);

						return (
							<Droppable droppableId={columnId} key={columnId}>
								{(provided) => (
									<div {...provided.droppableProps} ref={provided.innerRef}>
										<ToDoCard
											className="card"
											column={column}
											tasks={tasks}
											showCompleteTasks={this.state.showCompleteTasks}
											onDataSubmit={this.onDataSubmit}
											placeholderAtEndOfList={provided.placeholder}
											editRecord={this.editRecord}
											editTitle={this.editTitle}
											deleteRecord={this.deleteRecord}
											deleteCard={this.deleteCard}
											putToCompleted={this.putToCompleted}
											onUndoButtonClick={this.onUndoButtonClick}
											onShowCompleteTasksCheckboxClick={
												this.onShowCompleteTasksCheckboxClick
											}
										/>
									</div>
								)}
							</Droppable>
						);
					})}
					{this.renderCreateNewCardButton()}
				</DragDropContext>
			</div>
		);
	}
}

export default CardGroup;
