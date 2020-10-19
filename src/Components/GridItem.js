import React from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

class GridItem extends React.Component {
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

  render() {
    return (
      <Col xs={3} style={{paddingLeft:0, paddingRight:0}}>
        <Container fluid>
          <Card style={{height: '50vh', width: '20vw'}}>
            <Card.Body>
              <Card.Title>
                {/* adjust href below if not using faker links */}
                <a href={`http://www.${this.props.jobLead.link}`}>{this.props.jobLead.title}</a>, {this.props.jobLead.company}
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

export default GridItem;