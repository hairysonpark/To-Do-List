import React from 'react';
import {Button, Checkbox, Icon, Input, Menu} from 'semantic-ui-react'

import '../styles/styles.css';

class ToDoCard extends React.Component {
    state = { inputText: '', tasks: ['Item 1','Item 2','Item 3'] }

    onButtonSubmit = (event) => {
        console.log(this);
        console.log(this.state.inputText);
        this.setState({inputText: '', tasks: this.state.tasks.concat(this.state.inputText)});
    }


    render() {
        return (
            <Menu vertical onChange={this.onChange} className="customCard" activeIndex='1'>
                <Menu.Item>
                    <b>{this.props.listName}</b>
                </Menu.Item>
                {this.state.tasks.map((value, index, array) => 
                {
                    return <Menu.Item key={(value,index)}>
                        <Checkbox label={value} />
                        </Menu.Item>;
                })}
                <Menu.Item>
                    <Input fluid action color='green'>
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
                    </Input>
                </Menu.Item>
            </Menu>
        )
    }
}

export default ToDoCard;