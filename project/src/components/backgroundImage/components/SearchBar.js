import React from "react";
import { Button } from "semantic-ui-react";

class SearchBar extends React.Component {
	state = { term: "" };

	onFormSubmit = (event) => {
		event.preventDefault();

		this.props.onSubmit(this.state.term);
	};

	render() {
		return (
			<div className="ui segment">
				<form onSubmit={this.onFormSubmit} className="ui form">
					<div className="field">
						<label>Image Search</label>
						<input
							autoFocus
							type="text"
							value={this.state.term}
							onChange={(e) => this.setState({ term: e.target.value })}
						/>

						<div style={{ textAlign: "right", marginTop: "20px" }}>
							<Button
								type="button"
								onClick={() => this.props.onCloseButtonClick()}
								style={{ marginRight: "20px" }}
							>
								back
							</Button>
							<Button
								type="button"
								content="Search"
								labelPosition="right"
								icon="search"
								onClick={() => this.props.onSubmit(this.state.term)}
								positive
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
