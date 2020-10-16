import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Button from 'react-bootstrap/Button';
import NavMenu from './Components/NavMenu';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from './Components/Login'
import Home from './Components/Home'
import Signup from './Components/Signup'
import LoginContainer from './Containers/LoginContainer'

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
        .then(json => this.setState({user: json.user}), () => this.props.history.push('/home'))
    } else {
      // this.props.history.push('/login')
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
          this.props.history.push('/home')
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

  render() {
    return (
      <>
        <NavMenu user={this.state.user} logoutHandler={this.logoutHandler} />
        <Switch>
          {/* <Route exact path="/login" render={routerProps => <Login {...routerProps} appHandleLogin={this.appHandleLogin} user={this.state.user} />} /> */}
          <Route path="/login" render={routerProps => <LoginContainer {...routerProps} appHandleLogin={this.appHandleLogin} appHandleSignup={this.appHandleSignup} user={this.state.user} />} />
          <Route exact path="/home" render={routerProps => <Home {...routerProps} user={this.state.user} />} />
          <Route path="/" render={routerProps => <Home {...routerProps} user={this.state.user} />} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
