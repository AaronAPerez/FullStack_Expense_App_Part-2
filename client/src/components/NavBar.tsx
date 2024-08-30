import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap"
import { FaRegMoon } from "react-icons/fa6";
import { IoSunnyOutline } from 'react-icons/io5';



const NavBar = ({ isDarkMode, toggleDarkMode }) => {
  return (

    <>
      <Navbar 
      collapseOnSelect 
      expand="lg" 
      data-bs-theme={`${isDarkMode ? "dark" : "light"}`} 
      className={`${isDarkMode ? "bg-dark text-light" : "bg-body-tertiary"}`}
      fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">Our Daily Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                {
                isDarkMode ? (
                  <FaRegMoon onClick={toggleDarkMode} fontSize={20} />
                ) : (
                  <IoSunnyOutline onClick={toggleDarkMode} fontSize={30} />
                )
                </Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar