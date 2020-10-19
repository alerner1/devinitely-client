import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

class NewJobLeadForm extends React.Component {
  state = {
    submitData: {
      company: "",
      link: "",
      date : "",
      contact_method: "",
      referral: "",
      title: "",
      user_id: this.props.user && this.props.user.id,
      checklist_attributes: {
        task_list: []
      },
      contact_attributes: {
        name: '',
        title: '',
        email: ''
      },
      notes_attributes: []
    },
    checklistItem: '',
    noteContent: ''
  }

  mapTasks = () => {
    

    const allTasks = [];
    
    for (const task of this.state.submitData.checklist_attributes.task_list) {
      for (const taskName in task) {
        allTasks.push(taskName)
      }
    }
    return allTasks.map(task => {
      return <li>{task}</li>
    })
  }

  mapNotes = () => {
    const allNotes = [];
    for (const note of this.state.submitData.notes_attributes) {
      allNotes.push(note.content)
    }

    return allNotes.map(note => {
      return <li>{note}</li>
    })
  }

  handleClick = event => {
    if (event.target.id === 'addActionItem') {
      const newTask = this.state.checklistItem;
      this.setState(prev => ({
        ...prev,
        submitData: {
          ...prev.submitData,
          checklist_attributes: {
            task_list: [...prev.submitData.checklist_attributes.task_list, {[newTask]: false}]
          }
        }
      }), () => this.setState(prev => ({...prev, checklistItem: ''})))
    } else if (event.target.id === 'addNote') {
      const newNote = this.state.noteContent;
      this.setState(prev => ({
        ...prev,
        submitData: {
          ...prev.submitData,
          notes_attributes: [
            ...prev.submitData.notes_attributes, {content: newNote}
          ]
        }
      }), () => this.setState(prev => ({...prev, noteContent: ''})))
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const token = localStorage.getItem("token")
    console.log(this.state)
    fetch('http://localhost:3000/job_leads', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        job_leads: this.state.submitData
      })
    })
    .then(resp => resp.json())
    .then(this.props.history.push('/dashboards/job_leads'))
  }
  
  handleChange = event => {
    event.persist();
    if (event.target.name.includes('contact-info')) {
      if (event.target.name.includes('name')) {
        this.setState(prev => ({
          ...prev,
          submitData: {
            ...prev.submitData,
            ['contact_attributes']: {...prev.contact_attributes, name: event.target.value} 
          }
        }))
      } else if (event.target.name.includes('title')) {
        this.setState(prev => ({
          ...prev,
          submitData: {
            ...prev.submitData,
            ['contact_attributes']: {...prev.contact_attributes, title: event.target.value} 
          }
        }))
      } else if (event.target.name.includes('email')) {
        this.setState(prev => ({
          ...prev,
          submitData: {
            ...prev.submitData,
            ['contact_attributes']: {...prev.contact_attributes, email: event.target.value} 
          }
        }))
      }
    } else if (event.target.name === 'checklistItem') {
      this.setState(prev => ({
        ...prev,
        checklistItem: event.target.value
      }))
    } else if (event.target.name === 'noteContent') {
      this.setState(prev => ({
        ...prev,
        noteContent: event.target.value
      }))
    } else {
      this.setState(prev => ({ 
        ...prev, 
        submitData: {...prev.submitData, [event.target.name]: event.target.value}
      }))
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicCompany">
          <Form.Label>Company Name</Form.Label>
          <Form.Control name="company" onChange={this.handleChange} value={this.state.submitData.company} type="text" placeholder="Enter company name" />
        </Form.Group>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control name="title" onChange={this.handleChange} value={this.state.submitData.title} type="text" placeholder="Job title" />
        </Form.Group>
        <Form.Group controlId="formBasicLink">
          <Form.Label>Job Posting Link</Form.Label>
          <Form.Control name="link" onChange={this.handleChange} value={this.state.submitData.link} type="text" placeholder="Link to job posting" />
        </Form.Group>
        <Form.Group controlId="formBasicDate">
          <Form.Label>Date initiated</Form.Label>
          <Form.Control name="date" onChange={this.handleChange} value={this.state.submitData.email} type="date" placeholder="Date you started working on this app" />
        </Form.Group>
        <Form.Group controlId="formBasicReferral">
          <Form.Label>Referral</Form.Label>
          <Form.Control name="referral" onChange={this.handleChange} value={this.state.submitData.referral} type="text" placeholder="How you found this job application" />
        </Form.Group>
        <Form.Group controlId="formBasicContactMethod">
          <Form.Label>Contact Method</Form.Label>
          <Form.Control name="contact_method" onChange={this.handleChange} value={this.state.submitData.contact_method} type="text" placeholder="Email, phone, etc" />
        </Form.Group>
        <Form.Group controlId="formBasicContactInfoName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control name="contact-info-name" onChange={this.handleChange} value={this.state.submitData.contact_attributes.name} type="text" placeholder="Enter contact name" />
        </Form.Group>
        <Form.Group controlId="formBasicContactInfoTitle">
          <Form.Label>Contact Title</Form.Label>
          <Form.Control name="contact-info-title" onChange={this.handleChange} value={this.state.submitData.contact_attributes.title} type="text" placeholder="Enter contact title" />
        </Form.Group>
        <Form.Group controlId="formBasicContactInfoEmail">
          <Form.Label>Contact Email</Form.Label>
          <Form.Control name="contact-info-email" onChange={this.handleChange} value={this.state.submitData.contact_attributes.email} type="email" placeholder="Enter contact email" />
        </Form.Group>
        <Form.Group controlId="formBasicChecklist">
          <Form.Label>Action Items</Form.Label>
          <ul>
            {this.mapTasks()}
          </ul>
          <Form.Control name="checklistItem" onChange={this.handleChange} value={this.state.checklistItem} type="text" placeholder="Next action item" />
          <Button id="addActionItem" onClick={this.handleClick}>Add Action Item</Button>
        </Form.Group> 
        <Form.Group controlId="formBasicNotes">
          <Form.Label>Notes</Form.Label>
          <ul>
            {this.mapNotes()}
          </ul>
          <Form.Control name="noteContent" onChange={this.handleChange} value={this.state.noteContent} type="textarea" placeholder="Note content" />
          <Button id="addNote" onClick={this.handleClick}>Add Note</Button>
        </Form.Group> 
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>


    )
  }
}

export default withRouter(NewJobLeadForm);





































