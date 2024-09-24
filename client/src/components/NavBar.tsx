import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import avatar from '../assets/images/Money-Benjamin-unsplash.jpg'
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/UselocalStorage";
import Sun from '../assets/images/weather-sun-icon-10.jpg'
import Moon from '../assets/images/Weather_icon_-_full_moon.svg.png'
import logo from '../assets/images/BanKGold.png'
import { Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import {  } from "react-icons/gr";
import guest from "../assets/images/_user_circle_duotone_icon.png";

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: {
    publisherName: string;
    avatar?: string;
  } | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}



const NavBar = ({ isDarkMode, toggleDarkMode, isLoggedIn, setIsLoggedIn }: NavBarProps) => {
  const [user, setUser] = useState<{ publisherName: string; avatar?: string } | null>(null);
  const { setItem: setUserLocalStorage, getItem: getUserLocalStorage } = useLocalStorage("user");

  useEffect(() => {
    const storedUser = getUserLocalStorage();
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newUser = { ...user, avatar: reader.result as string };
        setUser(newUser);
        setUserLocalStorage(newUser);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        data-bs-theme={`${isDarkMode ? "dark" : "light" }`}
        className={`${isDarkMode ? "bg-dark" : "bg-body-tertiary"}`}
        // fixed="top"
      >
        <Container>
            <Navbar.Brand as={Link} to={"/"} className="logo">EXPENSE  <img src={logo} width={40}/> TRACKER
            {/* <FaPiggyBank color="pink"/> */}
            </Navbar.Brand>
         
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"
            
            >
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/Dashboard">
                    Dashboard
                  </Nav.Link>
                </>
              )}
            </Nav>

            <Nav className="welcome">

              <Nav.Link onClick={toggleDarkMode}>
                {isDarkMode ? <img src={Sun} className="SunImg" width={30}/> : <img src={Moon} width={30} />}
              </Nav.Link>

              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/CreateAccount">Create Account</Nav.Link>
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                  <Image className="profilepic"
                  src={guest}
                  width={40}
                />
                   
             
                </>
              ) : (
                <Nav.Link></Nav.Link> 
              )}
              {isLoggedIn && (
                <>
                  <Nav.Link>Welcome {user ? user.publisherName : "Guest"}</Nav.Link>
                 
                    <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-avatar" className="px-2">
                
                    <Image
                      src={avatar}
                      roundedCircle
                      width={55}
                      height={50}
                      
                   
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as="label" htmlFor="avatar-upload">
                      Change Avatar
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Nav.Link as={Link} to="/Login" onClick={handleLogout}
                >Logout</Nav.Link>
                 
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
               

                </>
              )}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;



