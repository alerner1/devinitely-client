import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Signup extends React.Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.appHandleSignup(this.state);
  }

  render() {
    return (
      // this.props.user ? 
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="first_name" onChange={this.handleChange} value={this.state.first_name} type="text" placeholder="Enter first name" />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="last_name" onChange={this.handleChange} value={this.state.last_name} type="text" placeholder="Enter last name" />
        </Form.Group>
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
      </Form>
      // :
      // <Redirect to="/home" />
    );
  }

}

export default Signup;