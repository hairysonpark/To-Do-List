import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

import { firebaseConfig } from "./firebaseConfig";

class Firebase extends React.Component {
	state = { user: null, docData: null };

	notify = () =>
		toast.warn(googleSignInWarning, {
			position: "bottom-right",
			autoClose: 10000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			onClick: () => {
				this.signInWithGooglePopup();
			},
		});

	constructor() {
		super();

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		this.database = firebase.firestore();
		this.googleProvider = new firebase.auth.GoogleAuthProvider();
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.setState({ user: null });

				/* Notify user to signIn with Google */
				this.notify();
				this.props.userSignedOutWithGoogle(true);
			} else {
				this.setState({ user: firebase.auth().currentUser });
				this.props.userSignedOutWithGoogle(false);
				this.getDatafromFirebase().then((result) => {
					this.props.getDataFromFirebaseComp(result);
				});
			}
		});
		this.props.setDataToFirebase(this.setDataToFirebase);
	};

	getDatafromFirebase = async () => {
		if (this.state.user) {
			try {
				const result = await this.database
					.collection("toDoList")
					.doc(this.state.user.uid)
					.get();

				const data = result.data();
				return data;
			} catch (e) {
				console.log(e);
			}
		}
	};

	setDataToFirebase = async (data, update = false) => {
		const firebaseData = data;

		/* Data will only be submitted to firestore if user is logined */
		if (this.state.user) {
			try {
				if (update) {
					const result = await this.database
						.collection("toDoList")
						.doc(this.state.user.uid)
						.update(firebaseData);
				} else {
					const result = await this.database
						.collection("toDoList")
						.doc(this.state.user.uid)
						.set(firebaseData);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	signInWithGooglePopup = async () => {
		try {
			const result = await firebase.auth().signInWithPopup(this.googleProvider);
			this.setState({ user: firebase.auth().currentUser });
		} catch (e) {
			console.log(e);
		}
	};

	signOutWithGoogle = async () => {
		try {
			const result = await firebase.auth().signOut();
			this.setState({ user: null });
			this.props.userSignedOutWithGoogle(true);
		} catch (e) {
			console.log(e);
		}
	};

	renderAuthButton = () => {
		if (!this.state.user) {
			return (
				<Button
					fluid
					className="ui red google button"
					onClick={this.signInWithGooglePopup}
				>
					<Icon name="google" />
					Sign In with Google
				</Button>
			);
		} else {
			return (
				<div>
					<div style={{ paddingBottom: "1em" }}>
						Hello {this.state.user.displayName}
					</div>
					<Button
						fluid
						className="ui red google button"
						onClick={this.signOutWithGoogle}
					>
						<Icon name="google" />
						Sign Out
					</Button>
				</div>
			);
		}
	};

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const googleSignInWarning = (
	<div>
		<p>Warning! Please sign in with Google to save your progress.</p>
		<Button fluid className="ui red google button">
			<Icon name="google" />
			Sign In with Google
		</Button>
	</div>
);

export default Firebase;
