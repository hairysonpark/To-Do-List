import React from "react";
import { Button, Checkbox, Icon, Input, Menu } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";

import "../styles/styles.css";
import CreatePopup from "./CreatePopup";
import EditPopup from "./EditPopup";

class ToDoCard extends React.Component {
	onButtonSubmit = (title, description) => {
		this.props.onDataSubmit(this.props.column.id, title, description); // call CardGroup function
	};

	render() {
		return (
			<Menu
				vertical
				onChange={this.onChange}
				className="customCard"
				activeIndex="1"
			>
				<Menu.Item>
					<b>{this.props.column.title}</b>
				</Menu.Item>
				{this.props.tasks.map((task, index) => {
					return (
						<Draggable draggableId={task.id} index={index} key={task.id}>
							{(provided) => (
								<div
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									ref={provided.innerRef}
								>
									<EditPopup
										task={task}
										editRecord={this.props.editRecord}
										deleteRecord={this.props.deleteRecord}
									>
										<Menu.Item className="customItem">
										<div>
										<h4><Checkbox label={task.title}/></h4>
										<p>{task.description}</p>
										</div>
										</Menu.Item>
									</EditPopup>
								</div>
							)}
						</Draggable>
					);
				})}
				{this.props.placeholderAtEndOfList}
				<Menu.Item>
					<Input fluid action color="green">
						<CreatePopup onButtonSubmit={this.onButtonSubmit} />
					</Input>
				</Menu.Item>
			</Menu>
		);
	}
}

export default ToDoCard;
