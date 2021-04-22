import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import "firebase/firestore";
import firebase from "firebase/app";

import PhotoSearch from "./PhotoSearch";
import { firebaseConfig } from "../../../firebase/firebaseConfig";

/*
 * @Props: menuItem
 */
class ImageSearchModal extends React.Component {
	state = { open: false };

	onCloseButtonClick = () => {
		this.setState({ open: false });
	};

	initializeFirebase = () => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		this.db = firebase.firestore();
	};

	onImageClickInImageCard = (imageURL) => {
		/* Update background image to the firebase database */
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.db
					.collection("toDoList")
					.doc(user.uid)
					.update({ imageURL: imageURL });
			}
		});

		/* Set image to the background */
		document.querySelector(
			".customContainer"
		).style.backgroundImage = `url("${imageURL}")`;
		this.setState({ open: false });
	};

	componentDidMount = () => {
		this.initializeFirebase();
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.db
					.collection("toDoList")
					.doc(user.uid)
					.get()
					.then((doc) => {
						if (doc.data().imageURL === undefined) {
							document.querySelector(
								".customContainer"
							).style.backgroundImage = `url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-johannes-plenio-1103970.jpg&fm=jpg")`;
						} else {
							document.querySelector(
								".customContainer"
							).style.backgroundImage = `url("${doc.data().imageURL}")`;
						}
					})
					.catch((e) => {
						document.querySelector(
							".customContainer"
						).style.backgroundImage = `url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-johannes-plenio-1103970.jpg&fm=jpg")`;
					});
			}
		});
	};

	render() {
		return (
			<Modal
				basic
				centered={false}
				onClose={() => this.setState({ open: false })}
				onOpen={() => this.setState({ open: true })}
				open={this.state.open}
				size="large"
				closeOnDimmerClick={false}
				trigger={this.props.children}
			>
				<Modal.Content>
					<PhotoSearch
						onCloseButtonClick={this.onCloseButtonClick}
						onImageClickInImageCard={this.onImageClickInImageCard}
					/>
				</Modal.Content>
			</Modal>
		);
	}
}

export default ImageSearchModal;
