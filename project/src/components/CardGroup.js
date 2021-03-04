import React from 'react';

import ToDoCard from './ToDoCard';
import DoingCard from './DoingCard';

class CardGroup extends React.Component {
    render() {
        return (
            <div className="ui four column doubling stackable grid container"> 
                <ToDoCard />
                <DoingCard />
            </div>
        )
    }
}

export default CardGroup;