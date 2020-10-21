import React from 'react';
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


class ActivitiesDashboard extends React.Component {

  clickHandler = () => {
    this.props.history.push('/dashboards/job_leads')
  }


  render() {
    return (
      <>
            <Card.Title className="text-center"><h1>Your Job Search Progress</h1></Card.Title>
            <div className="d-flex flex-column h-100 justify-content-center">
              <div className="h3 text-center mb-3">This Week:</div>
              <Row>
                <Col className="text-center">
                  <img src="https://www.flaticon.com/svg/static/icons/svg/948/948369.svg" width="100vw" height="100vw" alt="coding guy" />
                  <p>{this.props.activities} Job Lead{this.props.activities !== 1 ? 's' : ''} Updated</p>
                </Col>
                <Col className="text-center">
                 <img src="https://www.flaticon.com/svg/static/icons/svg/2427/2427233.svg" width="100vw" height="100vw" alt="resume icon" />
                  <p>2 Resumes Submitted</p>
                </Col>
                <Col className="text-center">
                 <img src="https://www.flaticon.com/svg/static/icons/svg/1034/1034147.svg" width="100vw" height="100vw" alt="cover letter icon" />
                  <p>3 Cover Letters Submitted</p>
                </Col>
                <Col className="text-center">
                 <img src="https://www.flaticon.com/svg/static/icons/svg/942/942790.svg" width="100vw" height="100vw" alt="interview icon" />
                  <p>4 Interviews Pending</p>
                </Col>
              </Row>
            </div>
            <div className='text-center' onClick={this.clickHandler}>
              <Button variant="primary">View Job Leads</Button>
            </div>
            </>
    )
  }
}

export default withRouter(ActivitiesDashboard)