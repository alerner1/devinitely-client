import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import ShowJobLead from '../Components/ShowJobLead'
import EditJobLeadForm from '../Components/EditJobLeadForm'

class JobLeadContainer extends React.Component {
  

  chooseChild = () => {
    if (this.props.action === 'show') {
      return <ShowJobLead user={this.props.user} updateActivities={this.props.updateActivities} jobLeadId={this.props.match.params.jobLeadId} />
    } else if (this.props.action === 'edit') {
      return <EditJobLeadForm updateActivities={this.props.updateActivities} user={this.props.user} jobLeadId={this.props.match.params.jobLeadId} />
    }
  }

  render() {
    return(
      <Container>
        <Card style={{  margin: 'auto' }}>
          <Card.Body className="d-flex flex-column">
            {this.chooseChild()}
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default JobLeadContainer;