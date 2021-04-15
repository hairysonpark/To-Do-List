import React from "react";
import {
	Button,
	Checkbox,
	Icon,
	Input,
	Menu,
	Dropdown,
	Confirm,
} from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";

import "../styles/styles.css";
import CreatePopup from "./CreatePopup";
import EditPopup from "./EditPopup";

class ToDoCard extends React.Component {
	state = { deleteCardConfirmOpen: false };

	onButtonSubmit = (title, description) => {
		this.props.onDataSubmit(this.props.column.id, title, description); // call CardGroup function
	};

	deleteCard = () => {
		this.setState({ deleteCardConfirmOpen: false })
		this.props.deleteCard()
	}

	render() {
		return (
			<Menu
				vertical
				onChange={this.onChange}
				className="customCard"
				activeIndex="1"
			>
				<Menu.Item>
					<div className="itemTitleRow">
						<b>{this.props.column.title}</b>
						<Dropdown>
							<Dropdown.Menu>
								<Dropdown.Item
									icon="trash"
									text="Delete"
									onClick={() => this.setState({ deleteCardConfirmOpen: true })}
								/>
								<Confirm
									open={this.state.deleteCardConfirmOpen}
									onCancel={() =>
										this.setState({ deleteCardConfirmOpen: false })
									}
									onConfirm={() => this.deleteCard()}
								/>
							</Dropdown.Menu>
						</Dropdown>
					</div>
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
												<h4 className="itemTitleRow">
													<Checkbox label={task.title} />
													<Icon
														name="delete"
														className="deleteRecordIcon"
														onClick={() => this.props.deleteRecord(task)}
													/>
												</h4>
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
