import React from "react";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavSidebar from "./NavSidebar";
import "../styles/styles.css";

class App extends React.Component {
	render() {
		return (
			<div className="root">
				<NavSidebar />
				<ToastContainer transition={Slide} style={{ color: "black" }} />
			</div>
		);
	}
}

export default App;
