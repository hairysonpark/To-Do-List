import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button, Icon, Form, Dimmer, Loader } from "semantic-ui-react";

import ToDoCard from "./ToDoCard";
import data from "../data/data";
import "../styles/styles.css";

const emptyTemplate = {
	tasks: {},
	columns: {},
	columnOrder: [],
	totalTasks: 0,
	createCardButtonOpen: false,
	newListName: "",
	imageURL:
		"https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-johannes-plenio-1103970.jpg&fm=jpg",
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
					this.setState(nextProps.firebaseData);
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

<<<<<<< HEAD
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

	onDataSubmit = async (columnId, title, description) => {
=======
	onDataSubmit = (columnId, title, description, done = 'false') => {
>>>>>>> 1350ee62d6b1dbb2a755e2bb67d6016bcd9e16b0
		let currentTaskTotal = this.state.totalTasks; // Get total number of tasks
		let newTaskId = "task-" + (currentTaskTotal + 1); // Create new task id. e.g., task-5
		let newTaskObject = {
			// Create a object using title and description from parameter
			id: newTaskId,
			title: title,
			description: description,
			done: done,
		};

		let entireObjectCopy = { ...this.state }; // Copy entire data structure to a new variable. dummy way, but it works
		entireObjectCopy.tasks[newTaskId] = newTaskObject; // Put the previous created object into the tasks object
		entireObjectCopy.columns[columnId].taskIds.push(newTaskId); // Add the newly created task's ID to the correspond column
		entireObjectCopy.totalTasks = ++currentTaskTotal; // Increment the total number of tasks

		this.setState({ ...entireObjectCopy }); // Destructure the object and update
		await this.props.firebaseSetDataFunc(entireObjectCopy);
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
			await this.props.firebaseSetDataFunc(newState);
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
			await this.props.firebaseSetDataFunc(newState);
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
		await this.props.firebaseSetDataFunc(newState);
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
		await this.props.firebaseSetDataFunc(newState);
	};

	deleteRecord = async (taskObject) => {
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

		const newState = {
			...this.state,
			tasks: {
				...this.state.tasks,
				[taskObject.id]: {}, // clear the value, but the key still there
			},
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
		};

		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState);
	};

	deleteCard = async (column) => {
		/* Copy the entire state object */
		const newState = {
			...this.state,
		};

		/* Delete the object in data.js-> columns -> object */
		delete newState.columns[column.id];

<<<<<<< HEAD
		/* Find out this column id is corrspond to which index in the columnOrder array */
		const indexOfColumn = newState.columnOrder.indexOf(column.id);
=======
		/* Find out this column id is correspond to which index in the columnOrder array */
		const indexOfColumn = newState.columnOrder.indexOf(column.id)
>>>>>>> 1350ee62d6b1dbb2a755e2bb67d6016bcd9e16b0

		/* Remove the column id in columnOrder by its index */
		newState.columnOrder.splice(indexOfColumn, 1);

		/* Update state */
		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState);
	};

	addNewListItem = async () => {
		/* add new item to the column order array */
		let newColumnOrder = [...this.state.columnOrder, this.state.newListName];

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[this.state.newListName]: {
					id: this.state.newListName,
					title: `${this.state.newListName}`,
					taskIds: [],
				},
			},
			columnOrder: newColumnOrder,
			createCardButtonOpen: false,
			newListName: "",
		};

		this.setState(newState);
		await this.props.firebaseSetDataFunc(newState);
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
						onClick={() => this.addNewListItem()}
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
											onDataSubmit={this.onDataSubmit}
											placeholderAtEndOfList={provided.placeholder}
											editRecord={this.editRecord}
											editTitle={this.editTitle}
											deleteRecord={this.deleteRecord}
											deleteCard={this.deleteCard}
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
