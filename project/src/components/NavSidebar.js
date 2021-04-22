import React from "react";
import { Icon, Menu, Segment, Sidebar, Button } from "semantic-ui-react";

import Navbar from "./Navbar";
import CardGroup from "./CardGroup";
import ImageSearchModal from "./backgroundImage/components/ImageSearchModal";
import Firebase from "../firebase/index";
import "../styles/styles.css";

class NavSidebar extends React.Component {
	state = {
		/* @type Boolean*/
		visible: false,

		/* @type Boolean*/
		googleButtonSignIn: false,

		/* @type object*/
		firebaseData: null,

		/* @type Function */
		firebaseSetDataFunc: null,

		/* @type Boolean */
		userSignedOutWithGoogle: null
	};

	onSidebarButtonClick = () => {
		this.setState({ visible: true });
	};

	onImageSearchButtonClick = () => {
		this.setState({ visible: false });
		return <ImageSearchModal />;
	};

	getDataFromFirebaseComp = (data) => {
		this.setState({ firebaseData: data });
	};

	setDataToFirebase = (func) => {
		this.setState({ firebaseSetDataFunc: func });
	};

	userSignedOutWithGoogle = (bool) => {
		this.setState({ userSignedOutWithGoogle: bool });
	};

	render() {
		return (
			<div className="customSidebar">
				<Sidebar.Pushable as={Segment}>
					<Sidebar
						className="customSideBarPushable"
						as={Menu}
						animation="overlay"
						inverted
						onHide={() => this.setState({ visible: false })}
						vertical
						visible={this.state.visible}
						width="wide"
					>
						<Menu.Item className="customMenuItem">
							<div>
								<Icon
									name="list"
									link
									size="large"
									className="customMenuItemIcon"
									onClick={() => this.setState({ visible: false })}
								/>
								To Do List
							</div>
						</Menu.Item>
						<Menu.Item
							className="customMenuItem"
							as="a"
							onClick={() => this.setState({ visible: false })}
						>
							<div>
								<Icon
									name="home"
									link
									size="large"
									className="customMenuItemIcon"
								/>
								Home
							</div>
						</Menu.Item>
						<ImageSearchModal>
							<Menu.Item
								className="customMenuItem"
								as="a"
								onClick={this.onImageSearchButtonClick}
							>
								<div>
									<Icon
										name="images"
										link
										size="large"
										className="customMenuItemIcon"
									/>
									Change Background Image
								</div>
							</Menu.Item>
						</ImageSearchModal>
						<Menu.Item className="customMenuItem">
							<Firebase
								getDataFromFirebaseComp={this.getDataFromFirebaseComp}
								setDataToFirebase={this.setDataToFirebase}
								userSignedOutWithGoogle={this.userSignedOutWithGoogle}
							/>
						</Menu.Item>
					</Sidebar>

					<Sidebar.Pusher className="customPusher" dimmed={this.state.visible}>
						<Navbar onSidebarButtonClick={this.onSidebarButtonClick} />
						<CardGroup
							firebaseData={this.state.firebaseData}
							firebaseSetDataFunc={this.state.firebaseSetDataFunc}
							userSignedOutWithGoogle={this.state.userSignedOutWithGoogle}
						/>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}

export default NavSidebar;
