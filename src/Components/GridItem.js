import React from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import {withRouter} from 'react-router-dom';

class GridItem extends React.Component {
  state = {
    
    color: 'white'
  }

  toggleColor = () => {
    if (this.state.color === 'white') {
      this.setState({color: 'lightgrey'})
    } else {
      this.setState({color: 'white'})
    }
  }

  renderChecklist = () => {
    // console.log(this.props.jobLead.checklist.task_list)
    const notCompleted = [];
    
    for (const task of this.props.jobLead.checklist.task_list) {
      for (const taskName in task) {
        if (task[taskName] === false) {
          notCompleted.push(taskName)
        }
      }
    }
    return notCompleted.map(task => {
      return <li>{task}</li>
    })
  }

  
  handleClick = () => {
    this.props.history.push(`/job_leads/${this.props.jobLead.id}`)
  }

  render() {
    return (
      <Col xs={3} style={{paddingLeft:0, paddingRight:0}}>
        <Container fluid>
          <Card onClick={this.handleClick} onMouseEnter={this.toggleColor} onMouseLeave={this.toggleColor} style={{cursor: 'pointer', backgroundColor: this.state.color, height: '50vh', width: '20vw'}} >
            <Card.Body>
              <Card.Title>
                {/* adjust href below if not using faker links */}
                {this.props.jobLead.title}, <a href={`http://www.${this.props.jobLead.link}`}>{this.props.jobLead.company}</a>
              </Card.Title>
              <Card.Text>
                Action Items:
                <ul>
                  {this.renderChecklist()}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    )
  }
}

export default withRouter(GridItem);