import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/UselocalStorage";
import Sun from '../assets/images/weather-sun-icon-10.jpg'
import Moon from '../assets/images/Weather_icon_-_full_moon.svg.png'
import logo from '../assets/images/BanKGold.png'
import { Dropdown, Image, NavbarText } from "react-bootstrap";
import { Link } from "react-router-dom";
import guest from "../assets/images/_user_circle_duotone_icon.png";
import { toast } from "react-toastify";

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: {
    publisherName: string;
    avatar?: string;
  } | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  updateUserAvatar: (avatarUrl: string) => void;
}

const NavBar = ({ isDarkMode, toggleDarkMode, user, isLoggedIn, setIsLoggedIn, updateUserAvatar }: NavBarProps) => {
  const [avatar, setAvatar] = useState(user?.avatar || "/default-avatar.png");
  

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await fetch('/api/upload-avatar', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('Token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          updateUserAvatar(data.avatarUrl);
          toast.success("Avatar updated successfully!");
        } else {
          toast.error("Failed to upload avatar. Please try again.");
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        toast.error("An error occurred while uploading the avatar.");
      }
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        data-bs-theme={`${isDarkMode ? "dark" : "light"}`}
        className={`${isDarkMode ? "bg-dark" : ""}`}
      // fixed="top"
      >
        <Container className="NavContainer">
          <Navbar.Brand as={Link} to={"/"} className="logo">EXPENSE  <img src={logo} width={40} /> TRACKER
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
                {isDarkMode ? <img src={Sun} className="SunImg" width={30} title="Light Mode" /> : <img src={Moon} width={30} title="Dark Mode" />}
              </Nav.Link>
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/CreateAccount">Create Account</Nav.Link>
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                  <Image className="profilepic"
                    src={guest}
                    width={50}
                  />
                </>
              ) : (
                <></>
              )}
              {isLoggedIn && (
                <>
                  <NavbarText>{user ? user.publisherName : "Guest"}</NavbarText>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" id="dropdown-avatar">
                      <Image
                        src={avatar}
                        roundedCircle
                        width={50}
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
                      <Dropdown.Item
                        as={Link} to="/HomePage" onClick={handleLogout}
                      >Logout
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



