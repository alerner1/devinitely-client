import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

  showItem = () => {
    if (this.props.note && this.state.edit === false) {
      return <li>{this.state.noteContent}<Button onClick={this.handleEdit}>Edit</Button></li>
    } else {
      return (
        <>
      <Form.Control name="noteContent" onChange={this.handleChange} value={this.state.noteContent} type="text" placeholder="Next action item" />
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

export default Note;