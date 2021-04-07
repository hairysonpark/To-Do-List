import React from "react";

import NavSidebar from "./NavSidebar";
import "../styles/styles.css";

class App extends React.Component {
	render() {
		return (
			<div className="root">
				<NavSidebar	/>
			</div>
		);
	}
}

export default App;
