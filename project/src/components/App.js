import React from "react";

import Navbar from "./Navbar";
import CardGroup from "./CardGroup";
import "../styles/styles.css";

class App extends React.Component {
	render() {
		return (
			<div className="root">
				<Navbar />
				<CardGroup />
			</div>
		);
	}
}

export default App;
