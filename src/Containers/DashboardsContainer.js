import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import ActivitiesDashboard from '../Components/ActivitiesDashboard'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import JobLeadsDashboard from '../Components/JobLeadsDashboard';
import Row from 'react-bootstrap/Row'

class DashboardsContainer extends React.Component {


  renderDashboard = () => {
    if (this.props.dashboard === 'activities') {
      return <ActivitiesDashboard user={this.props.user} />
    } else if (this.props.dashboard === 'jobleads') {
      return <JobLeadsDashboard />
    }
  }

  render() {
    return (
      <>
        {this.props.user ?
          <Container style={{ height: '90vh' }}>
            <Row className="my-auto h-75">
            <Card style={{  margin: 'auto' }}>
              <Card.Body className="d-flex flex-column">
                {this.renderDashboard()}
              </Card.Body>
            </Card>
            </Row>
          </Container>
          :
          null
        }
      </>
    )
  }
}

export default DashboardsContainer;