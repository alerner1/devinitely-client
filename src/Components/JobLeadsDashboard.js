import React from 'react';
import Card from 'react-bootstrap/Card';
import LeadsGrid from './LeadsGrid';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class JobLeadsDashboard extends React.Component {
  handleClick = event => {
    if (event.target.id === "add-job-lead") {
      this.props.history.push('/dashboards/job_leads/create')
    }
  }

  render() {
    return (
      <div className="background-ivory">
        <Card.Title>
          <div className="h1 w-100 text-center">
            <Row>
              <Col xs={2}>
              </Col>
              <Col>
                <p>Job Leads</p>
              </Col>
              <Col xs={2}>
                <Button id="add-job-lead" className="btn-lg background-blue float-right" onClick={this.handleClick}>Add Job Lead</Button>
              </Col>
            </Row>
          </div>
        </Card.Title>
        <Card.Text> 
          <LeadsGrid />
        </Card.Text>
      </div>
    )
  }


}

export default withRouter(JobLeadsDashboard);