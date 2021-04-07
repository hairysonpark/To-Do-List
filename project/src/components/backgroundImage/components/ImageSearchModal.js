import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import PhotoSearch from "./PhotoSearch";

/*
 * @Props: menuItem
 */
class ImageSearchModal extends React.Component {
	state = { open: false };

	onCloseButtonClick = () => {
		this.setState({ open: false });
	};

	onImageClickInImageCard = (imageURL) => {
		document.querySelector(
			".customContainer"
		).style.backgroundImage = `url("${imageURL}")`;
		this.setState({ open: false });
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
