import React from 'react';

import '../styles/styles.css';

class ToDoCard extends React.Component {
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
                        <input type="text" placeholder="I'm gonna do ..."></input>
                        <button className="ui icon button">
                            <i className="plus icon"></i>
                        </button>
                    </div>
                </a>
            </div>
        )
    }
}

export default ToDoCard;