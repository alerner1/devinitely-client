import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    this.setState({edit: false})
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.id)
  }

  toggleComplete = () => {
    this.props.toggleComplete(this.props.id, this.state.checklistItem)
  }

  showItem = () => {
    if (this.props.task && this.state.edit === false) {
      return (
        <Row>
          <Col xs={4}>
          {this.props.completed ? <strike>{this.state.checklistItem}</strike> : this.state.checklistItem}
          </Col>
          <Col xs={8}>
          <Button  variant="danger" className="float-right" onClick={this.handleDelete}>Delete</Button>
          <Button className="float-right mr-1" onClick={this.handleEdit}>Edit</Button>
          <Button className="float-right mr-1" onClick={this.toggleComplete}>{this.props.completed ? 'Mark Incomplete' : 'Mark Complete'}</Button>
          </Col>
        </Row>
      )
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