import React from 'react';
import Card from 'react-bootstrap/Card';
import LeadsGrid from './LeadsGrid';
import Button from 'react-bootstrap/Button';
import {withRouter} from 'react-router-dom';

class JobLeadsDashboard extends React.Component {
  handleClick = event => {
    if (event.target.id === "add-job-lead") {
      this.props.history.push('/dashboards/job_leads/create')
    }
  }

  render() {
    return (
      <>
        <Card.Title>
          <div className="h1 w-100 text-center">
            <p>Job Leads</p>
            <Button id="add-job-lead" className="float-right" onClick={this.handleClick}>Add Job Lead</Button>
          </div>
        </Card.Title>
        <Card.Text> 
          <LeadsGrid />
        </Card.Text>
      </>
    )
  }


}

export default withRouter(JobLeadsDashboard);