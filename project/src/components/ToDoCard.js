import React from 'react';
import {Button, Checkbox, Icon, Input, Menu} from 'semantic-ui-react'

import '../styles/styles.css';
import Popup from './Popup';

class ToDoCard extends React.Component {
    state = { tasks: [] }

    onButtonSubmit = (title, description) => {
        this.props.onDataSubmit(this.props.column.id, title, description)   // call CardGroup function
    }

    render() {
        return (
            <Menu vertical onChange={this.onChange} className="customCard" activeIndex='1'>
                <Menu.Item>
                    <b>{this.props.column.title}</b>
                </Menu.Item>
                {this.props.tasks.map((task, index) => 
                {
                    return <Menu.Item key={index}>
                                <Checkbox label={
                                    <div>
                                        <h4>{task.title}</h4>
                                        <p>{task.description}</p>
                                    </div>
                                    } 
                                />
                            </Menu.Item>;
                })}
                <Menu.Item>
                    <Input fluid action color='green'>
                        <Popup onButtonSubmit={this.onButtonSubmit} />
                    </Input>
                </Menu.Item>
            </Menu>
        )
    }
}

export default ToDoCard;