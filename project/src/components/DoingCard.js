import React from 'react';

import '../styles/styles.css';

class DoingCard extends React.Component {
    state = { inputText: '' }

    onButtonSubmit = (event) => {
        console.log(this.state.inputText);
        this.setState({inputText: ''})
    }

    render() {
        return (
            <div className="ui vertical menu customCard">
                <a className="item">
                    <h4 className="ui header">Things to do</h4>
                </a>
                <a className="item">
                    <h4 className="ui header">Sample List 1</h4>
                    <p>Description 1</p>
                </a>
                <a className="item">
                    <h4 className="ui header">Sample List 2</h4>
                    <p>Description 2</p>
                </a>
                <a className="item">
                    <div className="ui fluid action green input">
                        <input 
                            type="text" 
                            placeholder="I'm gonna do ..."
                            value={this.state.inputText}
                            onChange={(e) => this.setState({inputText: e.target.value})}
                            >
                        </input>
                        <button className="ui icon button" onClick={this.onButtonSubmit}>
                            <i className="plus icon"></i>
                        </button>
                    </div>
                </a>
            </div>
        )
    }
}

export default DoingCard;