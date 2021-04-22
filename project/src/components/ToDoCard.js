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
	state = {
		deleteCardConfirmOpen: false,
		editCardTitleOpen: false,
		newTitleValue: "",
		showCompleteTasks: false
	};

	onButtonSubmit = (title, description) => {
		this.props.onDataSubmit(this.props.column.id, title, description); // call CardGroup function
	};

	deleteCard = () => {
		this.setState({ deleteCardConfirmOpen: false });
		this.props.deleteCard(this.props.column);
	};

	renderEditCardTitle = (
		<div>
			<Input
				autoFocus
				icon="edit"
				placeholder="new name"
				onChange={(e) => this.setState({ newTitleValue: e.target.value })}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						let {column} = this.props;
						column.title = this.state.newTitleValue;
						this.props.editTitle(column);
						this.setState({ editCardTitleOpen: false })
					}
				}}
				onBlur={() => this.setState({ editCardTitleOpen: false })}
				style={{ width: "14em", height: "2.2em"}}
			/>
			<Icon
				className="createNewCardExitIcon"
				name="close"
				size="large"
				onClick={() => this.setState({ editCardTitleOpen: false })}
			/>
		</div>
	);

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
						<b>
							{this.state.editCardTitleOpen ? (
								this.renderEditCardTitle
							) : (
								<p className="cardTitle" onClick={() => this.setState({ editCardTitleOpen: true })}>
									{this.props.column.title}
								</p>
							)}
						</b>
						<Dropdown>
							<Dropdown.Menu>
								<Dropdown.Item
									icon="trash"
									text="Delete"
									onClick={() => this.setState({ deleteCardConfirmOpen: true })}
								/>
								<Dropdown.Item
									icon="checkmark"
									text="Show Completed"
									onClick={
										() => this.setState({ showCompleteTasks: !this.state.showCompleteTasks})
									}
								/>
							</Dropdown.Menu>
						</Dropdown>
					</div>
				</Menu.Item>
				{ /* Display all completed tasks */
				this.props.tasks.filter( (task) => this.state.showCompleteTasks || (task.done === 'false')).map((task, index) => {
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
													{ /* TODOs:
															refactor into separate component
															change state with onCheck
															make checkbox match the 'done' field of the task
													*/}
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

				{/* This part of code is hidden by default. It will be triggered when open is set to true
				 * Click on the dropdown menu -> delete will set open to true
				 */}
				<Confirm
					open={this.state.deleteCardConfirmOpen}
					onCancel={() => this.setState({ deleteCardConfirmOpen: false })}
					onConfirm={() => this.deleteCard()}
					content="Are you sure you want to delete this column?"
				/>
			</Menu>
		);
	}
}

export default ToDoCard;
