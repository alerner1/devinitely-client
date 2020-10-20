import React from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {withRouter} from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'

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

  getThreeItems = notCompleted => {
    const listOfThree = []
    for (let i = 0; i < 3; i++) {
      if (notCompleted[i]) {
        listOfThree.push(<ListGroup.Item className="text-sm">{notCompleted[i]}</ListGroup.Item>)
      }
    }
    return listOfThree;
  }

  renderChecklist = () => {
    const notCompleted = [];
    
    for (const task of this.props.jobLead.checklist.task_list) {
      for (const taskName in task) {
        if (task[taskName] === false) {
          notCompleted.push(taskName)
        }
      }
    }
    if (notCompleted.length === 0) {
      return (
      <>
      <br />
      No action items right now!
      </>
      )
    } else {
      return (
      <>
      <div className="text-center">Action Items:</div>
      <ListGroup >
        {
          this.getThreeItems(notCompleted)
        }
      </ListGroup>
      </>)
    }
  }

  
  handleClick = () => {
    this.props.history.push(`/job_leads/${this.props.jobLead.id}`)
  }

  render() {
    return (
      <Col xs={3} style={{paddingLeft:0, paddingRight:0}}>
        <Container>
          <Card onClick={this.handleClick} onMouseEnter={this.toggleColor} onMouseLeave={this.toggleColor} style={{cursor: 'pointer', backgroundColor: this.state.color, height: '58vh', width: '20vw'}} >
            <Card.Body >
              <Row className='mb-3'>
                <Col>
                  <Card.Title className="text-center ">
                    {/* adjust href below if not using faker links */}
                    <h5>{this.props.jobLead.title}</h5>
                    <h6 className="font-italic">{this.props.jobLead.company}</h6>
                  </Card.Title>
                </Col>
              </Row>
              <Row>
                <Col className="text-center mb-3">
                  <Button  size="sm" href={`http://www.${this.props.jobLead.link}`}>App Site</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card.Text>
                    
                    {this.renderChecklist()}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </Col>
    )
  }
}

export default withRouter(GridItem);