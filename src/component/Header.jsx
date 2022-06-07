import React, { Component } from 'react'; //imrc
import {Navbar, Nav, Container} from "react-bootstrap";
//cc
class Header extends Component {
    render() { 
        return (<Navbar bg="dark" variant = "dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">React ROS Robot</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>);
    }
}
 
export default Header; //export and be visiable by outside