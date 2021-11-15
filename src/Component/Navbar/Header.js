import React from 'react'
import logo from "../../Asset/Image/university.jpg";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from "react-bootstrap";


const Header = () => {
  return (
    <>

      <Navbar bg="warning" expand="lg">
        <Navbar.Brand className="logo-brand" href="https://google.com"><img src={logo} alt="no logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0 text-center"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>

            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>

          </Nav>

          <Nav className="navbar-nav ms-auto my-2 navbar-fixed">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success marbtn">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header;
