import React from "react";
import {
	Icon,
	Menu,
	Segment,
	Sidebar,
} from "semantic-ui-react";
import Navbar from "./Navbar";
import CardGroup from "./CardGroup";
import ImageSearchModal from "./backgroundImage/components/ImageSearchModal";

import "../styles/styles.css";

class NavSidebar extends React.Component {
	state = { visible: false };

	onSidebarButtonClick = () => {
		this.setState({ visible: true });
	};

	onImageSearchButtonClick = () => {
		this.setState({visible: false})
		return <ImageSearchModal />
	}

	

	render() {
		return (
			<div className="customSidebar">
				<Sidebar.Pushable as={Segment} >
					<Sidebar
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
									onClick={() => this.setState({visible: false})}
								/>
								To Do List
							</div>
						</Menu.Item>
						<Menu.Item className="customMenuItem" as="a" onClick={() => this.setState({visible: false})}>
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
							<Menu.Item className="customMenuItem" as="a" onClick={this.onImageSearchButtonClick} >								
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
					</Sidebar>

					<Sidebar.Pusher className="customPusher" dimmed={this.state.visible}>
						<Navbar onSidebarButtonClick={this.onSidebarButtonClick} />
						<CardGroup />
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
		);
	}
}

export default NavSidebar;
