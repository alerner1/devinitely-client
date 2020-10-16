import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Redirect } from 'react-router-dom'
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

class NavMenu extends React.Component {
  goHome = () => {
    this.props.history.push('/dashboards');
  }

  goJobLeads = () => {
    this.props.history.push('/dashboards/job_leads');
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand onClick={this.goHome} href="http://localhost:3001/home">Devinitely!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.goHome} href="http://localhost:3001/home">Home</Nav.Link>
            <Nav.Link onClick={this.goJobLeads} href="http://localhost:3001/job_leads/index">Job Leads</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            {this.props.user ?
            <Nav.Link href="http://localhost:3001/logout" onClick={this.props.logoutHandler}>Logout</Nav.Link>
            : null
            }
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavMenu;