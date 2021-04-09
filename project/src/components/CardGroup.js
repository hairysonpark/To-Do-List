import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ToDoCard from "./ToDoCard";
import data from "../data/data";
import "../styles/styles.css";

class CardGroup extends React.Component {
	state = data; // state is pointing to the centralized data file

	onDataSubmit = (columnId, title, description) => {
		let currentTaskTotal = this.state.totalTasks; // Get total number of tasks
		let newTaskId = "task-" + (currentTaskTotal + 1); // Create new task id. e.g., task-5
		let newTaskObject = {
			// Create a object using title and description from parameter
			id: newTaskId,
			title: title,
			description: description,
		};

		let entireObjectCopy = { ...this.state }; // Copy entire data structure to a new variable. dummy way, but it works
		entireObjectCopy.tasks[newTaskId] = newTaskObject; // Put the previous created object into the tasks object
		entireObjectCopy.columns[columnId].taskIds.push(newTaskId); // Add the newly created task's ID to the correspond column
		entireObjectCopy.totalTasks = ++currentTaskTotal; // Increment the total number of tasks

		this.setState({ ...entireObjectCopy }); // Destructure the object and update
	};

	componentDidUpdate() {
		// console.log(this.state); // Check the update after the state is updated
	}

	handleOnDragEnd = (result) => {
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
		}
	};

	editRecord = (taskObject) => {
		const newState = {
			...this.state,
			tasks: {
				...this.state.tasks,
				[taskObject.id]: taskObject
			},
		};
		this.setState(newState);
		console.log(this.state)
	}

	deleteRecord = (taskObject) => {
		let columns = {...this.state.columns}
		let columnId = ''

		// find which column is the owner of the delete task
		Object.keys(columns).map((column) => {
			Object.keys(columns[column]).map((columnProperty) => {
				if (columnProperty === 'taskIds') {
					columns[column][columnProperty].map((taskId) => {
						if (taskId === taskObject.id) {
							columnId = column
						}
					})
				}
			})
		})
		
		const newState = {
			...this.state,
			tasks: {
				...this.state.tasks,
				[taskObject.id]: {}		// clear the value, but the key still there
			},
			columns: {
				...this.state.columns,
				[columnId]: {
					...this.state.columns[columnId],
					// filter out a task when it find the target task id 
					taskIds: [...this.state.columns[columnId].taskIds].filter(function(task){return task != taskObject.id})
				}
			}
		};

		this.setState(newState)		
	}

	render() {
		return (
			<div className="ui four column doubling stackable grid customContainer">
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
											deleteRecord={this.deleteRecord}
										/>
									</div>
								)}
							</Droppable>
						);
					})}
				</DragDropContext>
			</div>
		);
	}
}

export default CardGroup;
