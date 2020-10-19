import React from 'react';
import GridItem from './GridItem';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class LeadsGrid extends React.Component {
  state = {
    jobLeads: [],
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    fetch('http://localhost:3000/job_leads', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(jobLeads => this.setState({jobLeads: jobLeads}))
  }

  mapRow = (row) => {
    // here, i < # of cols
    const thisRow = this.state.jobLeads.filter(jobLead => {
      return this.state.jobLeads.indexOf(jobLead) >= row * 4 && this.state.jobLeads.indexOf(jobLead) < (row + 1) * 4
    })
    return <Row style={{marginLeft: 0, marginRight: 0}} key={row}>{thisRow.map(jobLead => {
      return <GridItem key={jobLead.id} jobLead={jobLead} />
    })}</Row>
  } 

  renderJobLeads = () => {
    let rows = parseInt(this.state.jobLeads.length / 4, 10)
    if (this.state.jobLeads.length % 4 !== 0) {
      rows++;
    }
    const allJobs = [];
    for (let i = 0; i < rows; i++) {
      allJobs.push(this.mapRow(i))
    }
    return allJobs;
  }



  render() {
    return (<Container>{this.renderJobLeads()}</Container>)
  }
}

export default LeadsGrid;