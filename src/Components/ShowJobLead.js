import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

class ShowJobLead extends React.Component {
  state = {
    jobLead: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.props.jobLeadId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(resp => resp.json())
      .then(json => this.setState({jobLead: json}))
  }


  renderChecklist = () => {
    const allTasks = [];
    
    if (this.state.jobLead.checklist) {
      for (const task of this.state.jobLead.checklist.task_list) {
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
    if (this.state.jobLead.notes) {
      for (const note of this.state.jobLead.notes) {
        allNotes.push(note.content)
      }
    }

    return allNotes.map(note => {
      return <p>{note}</p>
    })
  }

  handleClick = () => {
    this.props.history.push(`/job_leads/${this.state.jobLead.id}/edit`)
  }

  render() {
    return(
      <>
        <Card.Title className="text-center">
          <h3>{this.state.jobLead.title} at {this.state.jobLead.company}</h3>
        <Button id="edit-job-lead" className="float-right" onClick={this.handleClick}>Edit Information</Button></Card.Title>
        <Card.Text>
          <Button href={`http://www.${this.state.jobLead.link}`}>Visit Application Website</Button>
          <p>Date started: {this.state.jobLead.date}</p>
          <p>Referral method: {this.state.jobLead.referral}</p>
          <p>Contact:</p>
          <p>Name: {this.state.jobLead.contact && this.state.jobLead.contact.name}</p>
          <p>Title: {this.state.jobLead.contact && this.state.jobLead.contact.title}</p>
          <p>Email: {this.state.jobLead.contact && this.state.jobLead.contact.email}</p>
          <p>Contact method: {this.state.jobLead.contact_method}</p>
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