import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class ActionItem extends React.Component {
  state = {
    checklistItem: this.props.task,
    edit: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEdit = event => {
    this.setState({edit: true})
  }

  handleSave = event => {
    this.props.handleSave(this.props.id, this.state.checklistItem)
  }

  showItem = () => {
    if (this.state.edit === false) {
      return <li>{this.props.task}<Button onClick={this.handleEdit}>Edit</Button></li>
    } else {
      return (
        <>
      <Form.Control name="checklistItem" onChange={this.handleChange} value={this.state.checklistItem} type="text" placeholder="Next action item" />
      <Button id="saveItem" onClick={this.handleSave}>Save</Button>
        </>
      )
    }
  }

  render() {
    return (
      this.showItem()
    )
  }
}

export default ActionItem;