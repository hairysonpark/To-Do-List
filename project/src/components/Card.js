import React from 'react';

import '../styles/styles.css';

class Card extends React.Component {
    render() {
        return (
            <div class="ui vertical menu customCard">
                <a class="item">
                    <h4 class="ui header">Things to do</h4>
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
                    <h4 class="ui header">Description 3</h4>
                    <p>Description 3</p>
                </a>
            </div>
        )
    }
}

export default Card;