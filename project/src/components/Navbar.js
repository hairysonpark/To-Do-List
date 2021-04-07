import React from "react";
import { Button, Icon } from "semantic-ui-react";

class Navbar extends React.Component {
	render() {
		return (
			<div className="ui secondary pointing menu">
				<Button
					basic
					icon
					size="large"
					onClick={this.props.onSidebarButtonClick}
				>
					<Icon name="list" />
				</Button>
				<a href="/" className="item">
					<div>To Do List</div>
				</a>
			</div>
		);
	}
}

export default Navbar;
