import React from "react";
import { Button, Icon } from "semantic-ui-react";

import "../styles/styles.css";

class Navbar extends React.Component {
	render() {
		return (
			<div className="ui secondary pointing menu customMenu">
				<Button
					id="navbarButton"
					basic
					icon
					size="large"
					onClick={this.props.onSidebarButtonClick}
				>
					<Icon name="list"/>
				</Button>
				<a href="/" className="item" id="navbarLink">
					<div>To Do List</div>
				</a>
			</div>
		);
	}
}

export default Navbar;
