import React from "react";
import { Nav, Navbar, NavDropdown, Container, Row, Col, Text, Icon } from 'react-bootstrap';
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from 'react-icons/io5';
import Sun from '../assets/images/Sun Screenshot 2024-09-03 210225-Photoroom.png'
import Moon from '../assets/images/Weather_icon_-_full_moon.svg.png'
import Monopoly from '../assets/images/Monopoly Screenshot 2024-09-03 215301.png'

import Money from "../assets/images/Money-Benjamin-unsplash.jpg";


const NavBar = ({ isDarkMode, toggleDarkMode }) => {
  return (

    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        data-bs-theme={`${isDarkMode ? "dark" : "light"}`}
        className={`${isDarkMode ? "bg-dark text-light" : "bg-body-tertiary"}`}
      // fixed="top"
      >
        <Container>
          <Navbar.Brand href="#home">Daily Expenses</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">About</Nav.Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
              <NavDropdown title="Write" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Write</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Published</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Unpublished
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="welcome">
              <Nav.Link href="#deets">
                {
                  isDarkMode ? (
                    <img
                    src={Sun} 
             onClick={toggleDarkMode} width={30} title="Light Mode"/>
           
                    // <FaRegMoon onClick={toggleDarkMode} fontSize={20} />
                  ) : (
                

                     <img
                    src={Moon} 
             onClick={toggleDarkMode} width={30} title="Dark Mode" />
      
                  )
                }
              </Nav.Link>
              <Nav.Link>Welcome Aaron</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                <img src={Monopoly} width={30} className="roundedCircle" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar