import React from 'react';

import '../styles/styles.css';

class DoingCard extends React.Component {
    render() {
        return (
            <div class="ui vertical menu customCard">
                <a class="item">
                    <h4 class="ui header">Doing</h4>
                </a>
                <a class="item">
                    <h4 class="ui header">Sample List 1</h4>
                    <p>Description 1</p>
                </a>
                <a class="item">
                    <h4 class="ui header">Sample List 2</h4>
                    <p>Description 2</p>
                </a>
                <a class="item">
                    <div class="ui fluid action green input">
                        <input type="text" placeholder="I'm doing ..."></input>
                        <button class="ui icon button">
                            <i class="plus icon"></i>
                        </button>
                    </div>
                </a>
            </div>
        )
    }
}

export default DoingCard;