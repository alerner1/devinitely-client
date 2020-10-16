import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Home from '../Components/Home'

class DashboardsContainer extends React.Component {
  render() {
    return(
      <>
      {this.props.user ? 
      <Home appHandleSignup={this.props.appHandleSignup} /> 
       :
      <Redirect to="/login" />
      } 
      </>
    )
  }
}

export default DashboardsContainer;