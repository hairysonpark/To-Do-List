import React from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";

class Popup extends React.Component {
    state = {open: false, title: '', description: ''}

    onButtonClick = (event) => {
        this.props.onButtonSubmit(this.state.title, this.state.description)
        this.setState({open: false})
    }

    render() {
        return (
            <Modal
              onClose={() => this.setState({open: false})}
              onOpen={() => this.setState({open: true})}
              open={this.state.open}
              trigger={<Button icon fluid labelPosition='right'>
                            Create New  
                            <Icon name='plus' />
                        </Button>}
            >
              <Modal.Header>Create a task</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form>
                    <Form.Field>
                      <label>Title</label>
                      <input
                        autoFocus
                        placeholder="Enter a tilte" 
                        value={this.state.title}
                        onChange={(e) => this.setState({title: e.target.value})} 
                        />
                    </Form.Field>
                    <Form.Field>
                      <label>Description</label>
                      <input placeholder="Enter a description" 
                        value={this.state.description} 
                        onChange={(e) => this.setState({description: e.target.value})}
                        />
                    </Form.Field>
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color="black" onClick={() => this.setState({open: false})}>
                  back
                </Button>
                <Button
                  content="Create"
                  labelPosition="right"
                  icon="checkmark"
                  onClick={this.onButtonClick}
                  positive
                />
              </Modal.Actions>
            </Modal>
        )
    }
}

export default Popup;
