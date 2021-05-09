import React from "react";
import { Button, Icon, Image, Modal, Table } from "semantic-ui-react";
import "firebase/firestore";
import firebase from "firebase/app";

class CompletedTasksModal extends React.Component {
	state = { archiveModalOpen: false, taskList: {} };

	retrieveTaskList = async () => {
		/* User has to be signed in */
		if (!firebase.auth().currentUser) {
			return;
		}

		const db = firebase.firestore();
		const uid = firebase.auth().currentUser.uid;
		const dataRef = await db.collection("toDoList").doc(uid).get();
		const data = dataRef.data();

		let taskList = {};

		Object.keys(data).map((subKey) => {
			if (subKey === "tasks") {
				taskList = data[subKey];
			}
		});

		this.setState({ taskList: taskList });
	};

	componentWillReceiveProps = async (prev) => {
		await this.retrieveTaskList();
	};

	renderTaskList = () => {
		let jsxBlock = [];

		for (let task in this.state.taskList) {
			if (this.state.taskList[task].deleted) {
				jsxBlock.push(
					<Table.Row key={this.state.taskList[task].id}>
						<Table.Cell>{this.state.taskList[task].title}</Table.Cell>
						<Table.Cell>{this.state.taskList[task].description}</Table.Cell>
						<Table.Cell width={2} selectable>
							<Button
								icon="undo"
								fluid
								basic
								color="red"
								onClick={(e) => {
									this.props.onUndoButtonClick(task);
									this.setState({ archiveModalOpen: false });
								}}
							/>
						</Table.Cell>
					</Table.Row>
				);
			}
		}

		return jsxBlock;
	};

	render() {
		return (
			<Modal
				open={this.state.archiveModalOpen}
				onClose={() => this.setState({ archiveModalOpen: false })}
				onOpen={() => this.setState({ archiveModalOpen: true })}
				trigger={this.props.children}
				onClick={(e) => e.stopPropagation()}
			>
				<Modal.Header>Completed Tasks Review</Modal.Header>
				<Modal.Content scrolling>
					<Modal.Description>
						<Table celled striped color="red">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Title</Table.HeaderCell>
									<Table.HeaderCell>Description</Table.HeaderCell>
									<Table.HeaderCell>Recover?</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>{this.renderTaskList()}</Table.Body>
						</Table>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions></Modal.Actions>
			</Modal>
		);
	}
}

export default CompletedTasksModal;
