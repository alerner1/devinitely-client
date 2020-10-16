import React from 'react';
import Card from 'react-bootstrap/Card';
import LeadsGrid from './LeadsGrid';

class JobLeadsDashboard extends React.Component {
  render() {
    return (
      <>
        <Card.Title className="text-center"><h1>Job Leads</h1></Card.Title>
        <Card.Text> 
          <LeadsGrid />
        </Card.Text>
      </>
    )
  }


}

export default JobLeadsDashboard;