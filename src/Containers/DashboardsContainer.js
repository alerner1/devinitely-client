import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import ActivitiesDashboard from '../Components/ActivitiesDashboard'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import JobLeadsDashboard from '../Components/JobLeadsDashboard';

class DashboardsContainer extends React.Component {
  renderDashboard = () => {
    if (this.props.dashboard === 'activities') {
      return <ActivitiesDashboard />
    } else if (this.props.dashboard === 'jobleads') {
      return <JobLeadsDashboard />
    }
  }

  render() {
    return (
      <>
        {this.props.user ?
          <Container>
            <Card style={{  margin: 'auto' }}>
              <Card.Body className="d-flex flex-column">
                {this.renderDashboard()}
              </Card.Body>
            </Card>
          </Container>
          :
          // <Redirect to="/login" />
          null
        }
      </>
    )
  }
}

export default DashboardsContainer;