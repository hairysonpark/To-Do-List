import React from "react";
import { Button, Modal, Form, Icon, Grid } from "semantic-ui-react";

class EditPopup extends React.Component {
	state = { firstOpen: false, secondOpen: false, title: "", description: "" };

	componentDidMount() {
		this.setState({
			title: this.props.task.title,
			description: this.props.task.description,
		});
	}

	onEditButtonClick = () => {
		this.editRecord()
		this.setState({firstOpen: false, secondOpen: false})
	}

	onDeleteButtonClick = () => {
		this.deleteRecord()
		this.setState({firstOpen: false, secondOpen: false})
	}

	editRecord = () => {
		// copy a task object from props and edit the title and description
		let taskObject = this.props.task
		taskObject.title = this.state.title
		taskObject.description = this.state.description

		this.props.editRecord(taskObject)
	}

	deleteRecord = () => {
		this.props.deleteRecord(this.props.task)
	}

	render() {
		return (
			<Modal
				onClose={() => this.setState({ firstOpen: false })}
				onOpen={() => this.setState({ firstOpen: true })}
				open={this.state.firstOpen}
				trigger={this.props.children}
			>
				<Modal.Header>Edit a task</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<Form>
							<Form.Field>
								<label>New Title</label>
								<input
									autoFocus
									placeholder="Enter a title"
									value={this.state.title}
									onChange={(e) => this.setState({ title: e.target.value })}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											this.onEditButtonClick();
										}
									}}
								/>
							</Form.Field>
							<Form.Field>
								<label>New Description</label>
								<input
									placeholder="Enter a description"
									value={this.state.description}
									onChange={(e) =>
										this.setState({ description: e.target.value })
									}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											this.onEditButtonClick();
										}
									}}
								/>
							</Form.Field>
						</Form>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						color="black"
						onClick={() => this.setState({ firstOpen: false })}
					>
						Back
					</Button>
					{/* <Button
						content="Delete"
						icon="trash alternate"
						color="red"
						onClick={() => this.setState({ secondOpen: true })}
					/> */}
					<Button
						content="Finish"
						labelPosition="right"
						icon="checkmark"
						onClick={this.onEditButtonClick}
						positive
					/>
				</Modal.Actions>

				<Modal
					onClose={() => this.setState({ secondOpen: false })}
					open={this.state.secondOpen}
					size="small"
				>
					<Modal.Header>Are you sure?</Modal.Header>
					<Modal.Content>
						<p>Are you sure you want to delete this task?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button
							color="red"
							onClick={() => this.setState({ secondOpen: false })}
						>
							<Icon name="remove" /> No
						</Button>
						<Button
							color="green"
							onClick={this.onDeleteButtonClick}
						>
							<Icon name="checkmark" /> Yes
						</Button>
					</Modal.Actions>
				</Modal>
			</Modal>
		);
	}
}

export default EditPopup;
