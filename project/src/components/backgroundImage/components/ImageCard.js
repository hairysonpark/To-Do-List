import React from "react";

import "../../../styles/styles.css";

class ImageCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = { spans: 0 };

		this.imageRef = React.createRef();
	}

	componentDidMount() {
		this.imageRef.current.addEventListener("load", this.setSpan);
	}

	setSpan = () => {
		const height = this.imageRef.current.clientHeight;
		const spans = Math.ceil(height / 10);

		this.setState({ spans: spans });
	};

	render() {
		const { description, urls } = this.props.image;

		return (
			<div
				style={{ gridRowEnd: `span ${this.state.spans}`, cursor: 'pointer' }}
				onClick={() => {
					this.props.onImageClickInImageCard(urls.regular);
				}}
			>
				<img ref={this.imageRef} alt={description} src={urls.regular} />
			</div>
		);
	}
}

export default ImageCard;
