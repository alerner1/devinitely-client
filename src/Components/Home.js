import React from 'react';
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter } from 'react-router-dom'

class Home extends React.Component {
  
  render() {
    return (
      <Button variant="danger">
          bootstrapped!
      </Button>
    )
  }
}

export default withRouter(Home)