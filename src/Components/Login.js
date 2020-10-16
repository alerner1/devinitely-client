import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.appHandleLogin(this.state);
  }

  clickHandler = e => {
    e.preventDefault();
    this.props.history.push('/login/create')
  }

  render() {
    return (
      !this.props.user ? 
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" onChange={this.handleChange} value={this.state.email} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" onChange={this.handleChange} value={this.state.password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>New here? <a onClick={this.clickHandler} href="/login/create">Create Account.</a></p>
      </Form>
      :
      <Redirect to="/dashboards" />
    );
  }
}

export default Login;