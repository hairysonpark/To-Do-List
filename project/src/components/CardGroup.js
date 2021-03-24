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
		console.log(this.state); // Check the update after the state is updated

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
		const newDestinaionTaskIds = Array.from(destinationColumn.taskIds);

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
			newDestinaionTaskIds.splice(destination.index, 0, draggableId);

			const newSourceColumn = {
				...sourceColumn,
				taskIds: newSourceTaskIds,
			};

			const newDestinationColumn = {
				...destinationColumn,
				taskIds: newDestinaionTaskIds,
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
											palceholderAtEndOfList={provided.placeholder}
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
