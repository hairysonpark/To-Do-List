import React from 'react';

import ToDoCard from './ToDoCard';
import data from '../data/data';

class CardGroup extends React.Component {
    state = data       // state is pointing to the centralized data file

    onDataSubmit = (columnId, title, description) => {
        let currentTaskTotal = this.state.totalTasks        // Get total number of tasks
        let newTaskId = 'task-' + (currentTaskTotal + 1)    // Create new task id. e.g., task-5
        let newTaskObject = {                               // Create a object using title and description from parameter
            id: newTaskId,
            title: title,
            description: description            
        }

        let entireObjectCopy = {...this.state}              // Copy entire data structure to a new variable. dummy way, but it works
        entireObjectCopy.tasks[newTaskId] = newTaskObject               // Put the previous created object into the tasks object
        entireObjectCopy.columns[columnId].taskIds.push(newTaskId)      // Add the newly created task's ID to the correspond column
        entireObjectCopy.totalTasks = ++currentTaskTotal                // Increment the total number of tasks

        this.setState({...entireObjectCopy})                // Destructure the object and update
    }

    componentDidUpdate() {
        // console.log(this.state)     // Check the update after the button clicked
    }

    render() {
        return (
            <div className="ui four column doubling stackable grid container"> 
            {this.state.columnOrder.map(columnId => {
                const column = this.state.columns[columnId]
                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                return <div key={columnId}>
                    <ToDoCard 
                        column={column} 
                        tasks={tasks}
                        onDataSubmit={this.onDataSubmit}
                    />
                </div>
            })}           
            </div>
        )
    }
}

export default CardGroup;