import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

class ShowJobLead extends React.Component {
  state = {
    jobLead: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.props.jobLeadId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => resp.json())
      .then(json => this.setState({ jobLead: json }))
  }

  renderChecklist = () => {
    const allTasks = [];

    if (this.state.jobLead && this.state.jobLead.checklist) {
      for (const task of this.state.jobLead.checklist.task_list) {
        for (const taskName in task) {
          allTasks.push(taskName)
        }
      }
    }

    if (this.state.jobLead && this.state.jobLead.checklist && this.state.jobLead.checklist.task_list.length === 0) {
      return (
        <>
          <h5 className="text-center">Action Items Checklist</h5>
          <p className="mt-3">No action items yet! Click the Edit Information button to get started.</p>
        </>
      )
    } else if (this.state.jobLead && this.state.jobLead.checklist) {
      return (
        <>
          <h5 className="text-center">Action Items Checklist</h5>
          <ListGroup>
            {this.state.jobLead.checklist.task_list.map(task => {
              for (const taskName in task) {
                if (task[taskName] === false) {
                  return <ListGroup.Item action>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="w-75" onClick={() => this.toggleItem(taskName, false)}>
                        {taskName}
                      </div>
                      <div>

                      {this.state.jobLead.checklist.task_list.indexOf(task) === this.state.jobLead.checklist.task_list.length - 1 ?
                        null
                        :
                        <Button className="background-blue float-right mr-1" onClick={event => {
                          this.moveDown(this.state.jobLead.checklist.task_list.indexOf(task))
                        }}>&darr;</Button>
                      } 
                      {this.state.jobLead.checklist.task_list.indexOf(task) === 0 ?
                        null
                        :
                        <Button className="background-blue float-right mr-1" onClick={event => {
                          this.moveUp(this.state.jobLead.checklist.task_list.indexOf(task))
                        }}>&uarr;</Button>
                      }
                      </div>
                    </div>

                  </ListGroup.Item>
                } else {
                  return <ListGroup.Item action>
                    <div className="d-flex flex-row justify-content-between">
                      <div className="w-75" onClick={() => this.toggleItem(taskName, true)}>
                        <strike>{taskName} </strike>
                      </div>
                      <div>

                        {this.state.jobLead.checklist.task_list.indexOf(task) === this.state.jobLead.checklist.task_list.length - 1 ?
                          null
                          :
                          <Button className="background-blue float-right mr-1" onClick={event => {
                            this.moveDown(this.state.jobLead.checklist.task_list.indexOf(task))
                          }}>&darr;</Button>
                        } 
                      {this.state.jobLead.checklist.task_list.indexOf(task) === 0 ?
                        null
                        :
                        <Button className="background-blue float-right mr-1" onClick={event => {
                          this.moveUp(this.state.jobLead.checklist.task_list.indexOf(task))
                        }}>&uarr;</Button>
                      }
                      </div>
                    </div>

                  </ListGroup.Item>
                }
              }
            })}
          </ListGroup>
        </>
      )
    }
  }

  moveUp = taskIndex => {
    const newList = this.state.jobLead.checklist.task_list.slice();
    const temp = newList[taskIndex - 1]
    newList[taskIndex - 1] = newList[taskIndex]
    newList[taskIndex] = temp

    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.state.jobLead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        job_leads: {
          checklist_attributes: {
            id: this.state.jobLead.checklist.id,
            task_list: newList
          }
        }
      })
    })
      .then(resp => resp.json())
      .then(json => this.setState({ jobLead: json.job_lead }))
  }

  moveDown = taskIndex => {
    const newList = this.state.jobLead.checklist.task_list.slice();
    const temp = newList[taskIndex + 1]
    newList[taskIndex + 1] = newList[taskIndex]
    newList[taskIndex] = temp

    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.state.jobLead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        job_leads: {
          checklist_attributes: {
            id: this.state.jobLead.checklist.id,
            task_list: newList
          }
        }
      })
    })
      .then(resp => resp.json())
      .then(json => this.setState({ jobLead: json.job_lead }))
  }


  toggleItem = (taskName) => {

    const newList = this.state.jobLead.checklist.task_list.slice();
    for (let i = 0; i < newList.length; i++) {
      if (typeof newList[i][taskName] !== 'undefined') {
        newList[i][taskName] = !newList[i][taskName]
        if (newList[i][taskName] === true) {
          let deltaResumes = 0;
          let deltaCoverLetters = 0;
          let deltaInterviews = 0;
          if (taskName === 'Submit Resume') {
            deltaResumes = 1;
          } else if (taskName === 'Submit Cover Letter') {
            deltaCoverLetters = 1;
          } else if (taskName === 'Interview') {
            deltaInterviews = 1;
          }
          this.props.updateActivities(1, deltaResumes, deltaCoverLetters, deltaInterviews)
        } else {
          let deltaResumes = 0;
          let deltaCoverLetters = 0;
          let deltaInterviews = 0;
          if (taskName === 'Submit Resume') {
            deltaResumes = -1;
          } else if (taskName === 'Submit Cover Letter') {
            deltaCoverLetters = -1;
          } else if (taskName === 'Interview') {
            deltaInterviews = -1;
          }
          this.props.updateActivities(-1, deltaResumes, deltaCoverLetters, deltaInterviews)
        }
      }
    }

    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.state.jobLead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        job_leads: {
          checklist_attributes: {
            id: this.state.jobLead.checklist.id,
            task_list: newList
          }
        }
      })
    })
      .then(resp => resp.json())
      .then(json => this.setState({ jobLead: json.job_lead }))

  }

  mapNotesRow = (row, allNotes) => {
    const thisRow = allNotes.filter(note => {
      return allNotes.indexOf(note) >= row * 4 && allNotes.indexOf(note) < (row + 1) * 4
    })
    return (
      <Row style={{ marginLeft: 0, marginRight: 0 }} key={row}>
        {thisRow.map(note => {
          return (
            <Col xs={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Container>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      {note}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Container>
            </Col>
          )
        })}
      </Row>
    )
  }

  mapNotes = () => {
    const allNotes = [];
    if (this.state.jobLead && this.state.jobLead.notes) {
      for (const note of this.state.jobLead.notes) {
        allNotes.push(note.content)
      }
    }

    let rows = parseInt(allNotes.length / 4, 10);
    if (allNotes.length % 4 !== 0) {
      rows++;
    }


    if (allNotes.length === 0) {
      return (
        <>
          <h5 className="text-center">Notes</h5>
          <p className="text-center">No notes yet! Click the Edit Information button to get started.</p>
        </>
      )
    } else {
      const formattedNotes = []
      for (let i = 0; i < rows; i++) {
        formattedNotes.push(this.mapNotesRow(i, allNotes))
      }
      return (
        <>
        <h5 className="mt-5 text-center">Notes</h5>
        <Container>
          <Card className="background-ivory">
            <Card.Body>
              <Card.Text>
                {formattedNotes}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        </>
      )

    }

  }

  handleClick = () => {
    this.props.history.push(`/job_leads/${this.state.jobLead.id}/edit`)
  }

  formatDate = date => {
    const [year, month, day] = date.split('-');
    const dateObj = { month, day, year };
    return `${this.getMonth(dateObj.month)} ${dateObj.day}, ${dateObj.year}`
  }

  getMonth = monthNum => {
    switch (parseInt(monthNum, 10)) {
      case 1:
        return 'January'
      case 2:
        return 'February'
      case 3:
        return 'March'
      case 4:
        return 'April'
      case 5:
        return 'May'
      case 6:
        return 'June'
      case 7:
        return 'July'
      case 8:
        return 'August'
      case 9:
        return 'September'
      case 10:
        return 'October'
      case 11:
        return 'November'
      case 12:
        return 'December'
    }

  }

  render() {
    return (
      <div className="background-ivory">
        <Card.Title className="text-center">
          <h3>{this.state.jobLead && this.state.jobLead.title}</h3>
          <h6>at</h6>
          <h5 className="font-italic">{this.state.jobLead && this.state.jobLead.company}</h5>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h6>
              Started application on {this.state.jobLead && this.state.jobLead.date && this.formatDate(this.state.jobLead.date)}
            </h6>
            <div className="d-flex flex-row justify-content-end">
              <Button className="background-blue mr-2" href={`http://www.${this.state.jobLead && this.state.jobLead.link}`}>Visit Application Website</Button>
              <Button id="edit-job-lead" className="background-blue float-right" onClick={this.handleClick}>Edit Information</Button>
            </div>
          </div>
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>
              {this.renderChecklist()}
            </Col>
            <Col>
              <Container>
                <Card className="background-ivory">
                  <Card.Body>
                    <Card.Title className="text-center">
                      Contact Information
                    </Card.Title>
                    <Card.Text>
                      <Table style={{backgroundColor: 'white'}}>
                        <tbody>
                          <tr>
                            <th scope="row">
                              Name
                            </th>
                            <td>
                              {this.state.jobLead && this.state.jobLead.contact && this.state.jobLead.contact.name}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Title
                            </th>
                            <td>
                              {this.state.jobLead && this.state.jobLead.contact && this.state.jobLead.contact.title}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Email
                            </th>
                            <td>
                              {this.state.jobLead && this.state.jobLead.contact && this.state.jobLead.contact.email}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Referred By
                            </th>
                            <td>
                              {this.state.jobLead && this.state.jobLead.referral}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Contact Method
                            </th>
                            <td>
                              {this.state.jobLead && this.state.jobLead.contact_method}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              {this.mapNotes()}
            </Col>
          </Row>

        </Card.Text>
      </div>
    )
  }
}

export default withRouter(ShowJobLead);