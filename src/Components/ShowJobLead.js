import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

class ShowJobLead extends React.Component {
  renderChecklist = () => {
    const allTasks = [];
    
    if (this.props.jobLead.checklist) {
      for (const task of this.props.jobLead.checklist.task_list) {
        for (const taskName in task) {
          allTasks.push(taskName)
        }
      }
    }
    return allTasks.map(task => {
      return <li>{task}</li>
    })
  }

  mapNotes = () => {
    const allNotes = [];
    if (this.props.jobLead.notes) {
      for (const note of this.props.jobLead.notes) {
        allNotes.push(note.content)
      }
    }

    return allNotes.map(note => {
      return <p>{note}</p>
    })
  }

  handleClick = () => {
    this.props.history.push(`/job_leads/${this.props.jobLead.id}/edit`)
  }

  render() {
    return(
      <>
        <Card.Title className="text-center">
          <h3>{this.props.jobLead.title} at {this.props.jobLead.company}</h3>
        <Button id="edit-job-lead" className="float-right" onClick={this.handleClick}>Edit Information</Button></Card.Title>
        <Card.Text>
          <Button href={`http://www.${this.props.jobLead.link}`}>Visit Application Website</Button>
          <p>Date started: {this.props.jobLead.date}</p>
          <p>Referral method: {this.props.jobLead.referral}</p>
          <p>Contact:</p>
          <p>Name: {this.props.jobLead.contact && this.props.jobLead.contact.name}</p>
          <p>Title: {this.props.jobLead.contact && this.props.jobLead.contact.title}</p>
          <p>Email: {this.props.jobLead.contact && this.props.jobLead.contact.email}</p>
          <p>Contact method: {this.props.jobLead.contact_method}</p>
          <p>Checklist: </p>
          <ul>
            {this.renderChecklist()}
          </ul>
          <h3>Notes: </h3>
          {this.mapNotes()}

        </Card.Text>
      </>
    )
  }
}

export default withRouter(ShowJobLead);