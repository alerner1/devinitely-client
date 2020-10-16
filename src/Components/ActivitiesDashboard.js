import React from 'react';
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


class ActivitiesDashboard extends React.Component {

  render() {
    return (
      <Container>
        <Card style={{ width: '75vw', height: '75vh', margin: 'auto' }}>
          <Card.Body>
            <Card.Title className="text-center">Your Job Search Progress</Card.Title>
            <Card.Text>
              <h5 className="text-center">This Week:</h5>
              <Row>
                <Col>
                  <img src="https://www.flaticon.com/svg/static/icons/svg/948/948369.svg" width="100vw" alt="coding guy" />
                  <p>15 Job Leads Updated</p>
                </Col>
                <Col>
                 <img src="https://www.flaticon.com/svg/static/icons/svg/948/948369.svg" width="100vw" alt="coding guy" />
                  <p>2 Resumes Submitted</p>
                </Col>
                <Col>
                 <img src="https://www.flaticon.com/svg/static/icons/svg/948/948369.svg" width="100vw" alt="coding guy" />
                  <p>3 Cover Letters Submitted</p>
                </Col>
                <Col>
                 <img src="https://www.flaticon.com/svg/static/icons/svg/948/948369.svg" width="100vw" alt="coding guy" />
                  <p>1 Interview Pending</p>
                </Col>
              </Row>
            </Card.Text>
            <div className='text-center'>
              <Button variant="primary">View Job Leads</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default withRouter(ActivitiesDashboard)