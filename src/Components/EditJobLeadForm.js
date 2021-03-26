import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ActionItem from './ActionItem'
import Note from './Note'
import {withRouter} from 'react-router-dom'
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class EditJobLeadForm extends React.Component {
  state = {
    submitData: {
      company: '',
      link: '',
      date: '',
      contact_method: '',
      referral: '',
      title: '',
      user_id: null,
      checklist_attributes: {
        id: '',
        task_list: ''
      },
      contact_attributes: {
        id: '',
        name: '',
        title: '',
        email: ''
      },
      notes_attributes: []
    },
    checklistItem: '',
    noteContent: '',
    jobLead: [],
    activitiesCounter: 0,
    resumesCounter: 0,
    coverLettersCounter: 0,
    interviewsCounter: 0
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.props.match.params.jobLeadId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(resp => resp.json())
      .then(jobLead => {
        let activitiesCounter = 0;
        let resumesCounter = 0;
        let coverLettersCounter = 0;
        let interviewsCounter = 0;
        for (let task of jobLead.checklist.task_list) {
          for (let taskName in task) {
            if (task[taskName] === true) {
              activitiesCounter++;
              if (taskName === 'Submit Resume') {
                resumesCounter = 1;
              } else if (taskName === 'Submit Cover Letter') {
                coverLettersCounter = 1;
              } else if (taskName === 'Interview') {
                interviewsCounter = 1;
              }
            }
          }
        }
        this.setState({
          submitData: {
            company: jobLead.company,
            link: jobLead.link,
            date: jobLead.date,
            contact_method: jobLead.contact_method,
            referral: jobLead.referral,
            title: jobLead.title,
            user_id: this.props.user && this.props.user.id,
            checklist_attributes: {
              id: jobLead.checklist.id,
              task_list: jobLead.checklist.task_list
            },
            contact_attributes: {
              id: jobLead.contact.id,
              name: jobLead.contact.name,
              title: jobLead.contact.title,
              email: jobLead.contact.email
            },
            notes_attributes: jobLead.notes
          },
          activitiesCounter: activitiesCounter,
          resumesCounter: resumesCounter,
          coverLettersCounter: coverLettersCounter,
          interviewsCounter: interviewsCounter
        })
      })
  }

  toggleComplete = (key, task) => {
    const newList = this.state.submitData.checklist_attributes.task_list.slice()
    newList.splice(key, 1, {[`${task}`]: !newList[key][`${task}`]})

    this.setState(prev => ({
      submitData: {...prev.submitData, checklist_attributes: {
        ...prev.submitData.checklist_attributes, task_list: newList
      }}
    }))
  }

  mapTasks = () => {
    const allTasks = [];
    
    for (const task of this.state.submitData.checklist_attributes.task_list) {
      for (const taskName in task) {
        allTasks.push(
          <ListGroup.Item>
            <ActionItem toggleComplete={this.toggleComplete} handleDelete={this.handleDelete} id={this.state.submitData.checklist_attributes.task_list.indexOf(task)} key={this.state.submitData.checklist_attributes.task_list.indexOf(task)} handleSave={this.saveTask} task={taskName} completed={task[taskName]} />
          </ListGroup.Item>
        )
      }
    }
    return (
      <ListGroup>
        {
          
          allTasks
        }
      </ListGroup>
    )
  }

  mapNotes = () => {
    const allNotes = [];
    for (const note of this.state.submitData.notes_attributes) {
      if (typeof note['_destroy'] === 'undefined') {
        allNotes.push(note.content)
      }
    }

    return (
      <ListGroup>
        {allNotes.map(note => {
          return <Note id={allNotes.indexOf(note)} key={allNotes.indexOf(note)} handleSave={this.saveNote} handleDelete={this.deleteNote} note={note} />
        })}
      </ListGroup>
    )
  }

  handleClick = event => {
    if (event.target.id === 'addActionItem') {
      const newTask = this.state.checklistItem;
      this.setState(prev => ({
        submitData: {
          ...prev.submitData,
          checklist_attributes: {
            ...prev.submitData.checklist_attributes,
            task_list: [...prev.submitData.checklist_attributes.task_list, {[newTask]: false}]
          }
        }
      }), () => this.setState(prev => ({...prev, checklistItem: ''})))
    } else if (event.target.id === 'addNote') {
      const newNote = this.state.noteContent;
      const newList = [...this.state.submitData.notes_attributes, {content: newNote}]
      this.setState(prev => ({
        ...prev,
        submitData: {
          ...prev.submitData,
          notes_attributes: newList
        }
      }), () => this.setState(prev => ({...prev, noteContent: ''})))
    } 
  }

  saveTask = (key, task) => {
    const newList = this.state.submitData.checklist_attributes.task_list.slice()
    newList.splice(key, 1, {[`${task}`]: false})
    this.setState(prev => ({
      submitData: {...prev.submitData, checklist_attributes: {
        ...prev.submitData.checklist_attributes, task_list: newList
      }}
    }))
  }

  saveNote = (key, note) => {
    const newList = this.state.submitData.notes_attributes.slice()
    newList[key]['content'] = note;
    this.setState(prev => ({
      submitData: {...prev.submitData, notes_attributes: newList}
    }))
  }
  
  deleteNote = (key, noteContent) => {
    const newList = this.state.submitData.notes_attributes.slice()
    let actualKey = null;
    for (let note of newList) {
      if (note.content === noteContent) {
        actualKey = newList.indexOf(note)
      }
    }

    newList[actualKey]['_destroy'] = true
    console.log(newList)
    this.setState(prev => ({
      submitData: {...prev.submitData, notes_attributes: newList}
    }), () => {console.log(this.state.submitData)})
  }

  handleSubmit = event => {
    event.preventDefault()
    const token = localStorage.getItem("token")

    let finalActivitiesCounter = 0;
    let finalResumesCounter = 0;
    let finalCoverLettersCounter = 0;
    let finalInterviewsCounter = 0;
    for (let task of this.state.submitData.checklist_attributes.task_list) {
      for (let taskName in task) {
        if (task[taskName] === true) {
          finalActivitiesCounter++;
          if (taskName === 'Submit Resume') {
            finalResumesCounter++;
          } else if (taskName === 'Submit Cover Letter') {
            finalCoverLettersCounter++;
          } else if (taskName === 'Interview') {
            finalInterviewsCounter++;
          }
        }
      }
    }

    const activitiesChange = finalActivitiesCounter - this.state.activitiesCounter;
    const resumesChange = finalResumesCounter - this.state.resumesCounter;
    const coverLettersChange = finalCoverLettersCounter - this.state.coverLettersCounter;
    const interviewsChange = finalInterviewsCounter - this.state.interviewsCounter;
    this.props.updateActivities(activitiesChange, resumesChange, coverLettersChange, interviewsChange)

    fetch(`http://localhost:3000/job_leads/${this.props.jobLeadId}`, {
      method: "PATCH",
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
    .then((json) => {
      console.log(json)
      this.props.history.push(`/job_leads/${this.props.jobLeadId}`)
    })
  
    
  }
  
  handleChange = event => {
    event.persist();
    if (event.target.name.includes('contact-info')) {
      if (event.target.name.includes('name')) {
        console.log('name')
        this.setState(prev => ({
          ...prev,
          submitData: {
            ...prev.submitData,
            ['contact_attributes']: {...prev.submitData.contact_attributes, name: event.target.value} 
          }
        }))
      } else if (event.target.name.includes('title')) {
        this.setState(prev => ({
          ...prev,
          submitData: {
            ...prev.submitData,
            ['contact_attributes']: {...prev.submitData.contact_attributes, title: event.target.value} 
          }
        }))
      } else if (event.target.name.includes('email')) {
        this.setState(prev => ({
          ...prev,
          submitData: {
            ...prev.submitData,
            ['contact_attributes']: {...prev.submitData.contact_attributes, email: event.target.value} 
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
      }), () => console.log(this.state.submitData))
    }
  }

  handleDelete = (key) => {
    console.log(key)
    const newList = this.state.submitData.checklist_attributes.task_list.slice()
    newList.splice(key, 1)
    this.setState(prev => ({
      submitData: {...prev.submitData, checklist_attributes: {
        ...prev.submitData.checklist_attributes, task_list: newList
      }}
    }))
  }

  render() {
    return (
      <>
      <h3 className="text-center">Edit Job Lead Information</h3>
      <Form onSubmit={this.handleSubmit} className="w-50 mx-auto">
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
          <Form.Control name="date" onChange={this.handleChange} defaultValue={this.state.submitData.date} type="date" placeholder="Date you started working on this app" />
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
            {this.mapTasks()}
        </Form.Group>
        <Form.Group controlId="formBasicAddChecklist">
          <Row>
            <Col xs={8}>
              <Form.Control name="checklistItem" onChange={this.handleChange} value={this.state.checklistItem} type="text" placeholder="New action item" />
            </Col>
            <Col xs={4}>
              <Button className="float-right background-blue"  id="addActionItem" onClick={this.handleClick}>Save Action Item</Button>
            </Col>
          </Row>
        </Form.Group> 
        <Form.Group controlId="formBasicNotes">
          <Form.Label>Notes</Form.Label>
            {this.mapNotes()}
        </Form.Group>
        <Form.Group controlId="formBasicAddNote">
          <Row>
            <Col xs={9}>
              <Form.Control name="noteContent" onChange={this.handleChange} value={this.state.noteContent} type="textarea" placeholder="New note" />
            </Col>
            <Col xs={3}>
              <Button className="float-right background-blue" id="addNote" onClick={this.handleClick}>Save Note</Button>
            </Col>
          </Row>
        </Form.Group> 
        <Button block variant="primary" className="background-blue" type="submit">
          Submit
        </Button>
      </Form>
      </>


    )
  }
}

export default withRouter(EditJobLeadForm);