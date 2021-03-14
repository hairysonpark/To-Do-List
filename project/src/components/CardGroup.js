import React from 'react';

import ToDoCard from './ToDoCard';

class CardGroup extends React.Component {
    render() {
        return (
            <div className="ui four column doubling stackable grid container"> 
                <ToDoCard listName='Things To Do'/>
                <ToDoCard listName='Second List'/>
            </div>
        )
    }
}

export default CardGroup;