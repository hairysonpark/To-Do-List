import React from "react";
import unsplash from "../apis/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class PhotoSearch extends React.Component {
	state = { pics: [] };

	onSearchSubmit = async (term) => {
		const responce = await unsplash.get("/search/photos", {
			params: { query: term, orientation: 'landscape', per_page: 30 },
		});

		this.setState({ pics: responce.data.results });
	};

	render() {
		return (
			<div className="ui container" style={{ marginTop: "10px", color: "" }}>
				<SearchBar
					onSubmit={this.onSearchSubmit}
					onCloseButtonClick={this.props.onCloseButtonClick}
				/>
				<ImageList images={this.state.pics} onImageClickInImageCard={this.props.onImageClickInImageCard}/>
			</div>
		);
	}
}

export default PhotoSearch;
