import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Note extends React.Component {
  state = {
    noteContent: this.props.note,
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
    this.props.handleSave(this.props.id, this.state.noteContent)
    this.setState({edit: false})
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.id, this.state.noteContent)
  }

  showItem = () => {
    if (this.props.note && this.state.edit === false) {
      return (
        <ListGroup.Item>
          <Row>
            <Col xs={8}>
             {this.state.noteContent}
            </Col>
            <Col xs={4}>
            <Button variant="danger" className="float-right" onClick={this.handleDelete}>Delete</Button>
            <Button onClick={this.handleEdit} className="float-right mr-1">Edit</Button>
            </Col>
          </Row>
        </ListGroup.Item>
      )
    } else {
      return (
        <div>
          <Form.Control name="noteContent" onChange={this.handleChange} value={this.state.noteContent} type="text"/>
          <Button id="saveItem" onClick={this.handleSave}>Save</Button>
        </div>
      )
    }
  }

  render() {
    return (
      this.showItem()
    )
  }
}

export default Note;