import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import ShowJobLead from '../Components/ShowJobLead'
import EditJobLeadForm from '../Components/EditJobLeadForm'

class JobLeadContainer extends React.Component {
  state = {
    jobLead: []
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/job_leads/${this.props.match.params.jobLeadId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(resp => resp.json())
      .then(json => this.setState({jobLead: json}))
  }

  chooseChild = () => {
    if (this.props.action === 'show') {
      return <ShowJobLead jobLead={this.state.jobLead} />
    } else if (this.props.action === 'edit') {
      return <EditJobLeadForm user={this.props.user} jobLead={this.state.jobLead} />
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