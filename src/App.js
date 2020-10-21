import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Button from 'react-bootstrap/Button';
import NavMenu from './Components/NavMenu';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from './Components/Login'
import ActivitiesDashboard from './Components/ActivitiesDashboard'
import Signup from './Components/Signup'
import LoginContainer from './Containers/LoginContainer'
import DashboardsContainer from './Containers/DashboardsContainer';
import FormContainer from './Containers/FormContainer'
import JobLeadContainer from './Containers/JobLeadContainer'

class App extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      console.log('got a token')
      fetch('http://localhost:3000/profile', {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      })
        .then(resp => resp.json())
        .then(json => this.setState({user: json.user}))
    } else {
      console.log('no token')
      this.props.history.push('/login')
    }
  }

  appHandleLogin = (userInfo) => {
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }, 
      body: JSON.stringify({user: userInfo})
    })
      .then(resp => resp.json())
      .then(json => {
        localStorage.setItem("token", json.jwt)
        this.setState({user: json.user }, () => {
          console.log(localStorage.getItem('token'))
        })
      })
  }

  logoutHandler = () => {
    localStorage.removeItem("token")
    this.props.history.push("/login")
    this.setState({user: null})
  }

  appHandleSignup = (userInfo) => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({user: userInfo})
    })
      .then(resp => resp.json())
      .then(json => this.appHandleLogin({email: userInfo.email, password: userInfo.password}))
  }

  
  updateActivities = (deltaActivities, deltaResumes, deltaCoverLetters, deltaInterviews) => {
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/users/${this.state.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user: {
            activities: this.state.user.activities + deltaActivities,
            resumes: this.state.user.resumes + deltaResumes,
            cover_letters: this.state.user.cover_letters + deltaCoverLetters,
            interviews: this.state.user.interviews + deltaInterviews
          }
        })
      })
      .then(resp => resp.json())
      .then(json => this.setState({user: json.user}))
  }

  render() {
    return (
      // in render statement of routes, check if user and if not return null
      <>
        <NavMenu user={this.state.user} logoutHandler={this.logoutHandler} />
        <Switch>
          <Route path="/login" render={routerProps => <LoginContainer {...routerProps} appHandleLogin={this.appHandleLogin} appHandleSignup={this.appHandleSignup} user={this.state.user} />} />
          <Route exact path="/dashboards/job_leads" render={routerProps => 
            this.state.user ? 
            (<DashboardsContainer {...routerProps} dashboard='jobleads' user={this.state.user} />)
            : 
            null 
          } />
          <Route exact path="/dashboards/job_leads/create" render={routerProps => <FormContainer {...routerProps} user={this.state.user} updateActivities={this.updateActivities} formType='new' />} />
          <Route exact path="/dashboards" render={routerProps => <DashboardsContainer {...routerProps} dashboard='activities' user={this.state.user} />} />
          <Route exact path={`/job_leads/:jobLeadId/edit`} render={routerProps => <JobLeadContainer {...routerProps} action="edit" updateActivities={this.updateActivities} user={this.state.user} />} />
          <Route exact path={`/job_leads/:jobLeadId`} render={routerProps => {
          return <JobLeadContainer {...routerProps} updateActivities={this.updateActivities} action="show" />
          }} />
          <Route exact path="/" render={routerProps => <DashboardsContainer {...routerProps} dashboard='activities' user={this.state.user} />} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
