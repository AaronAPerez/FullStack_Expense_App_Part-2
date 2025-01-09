import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/UselocalStorage";
import Sun from '../assets/images/weather-sun-icon-10.jpg'
import Moon from '../assets/images/Weather_icon_-_full_moon.svg.png'
import logo from '../assets/images/BanKGold.png'
import { Dropdown, Image, NavbarText } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import guest from "../assets/images/_user_circle_duotone_icon.png";
import { toast } from "react-toastify";
import { getLoggedInUserData, checkToken } from "../Services/DataService";

//  Structure of the User object
interface User {
  id: number;
  username: string;
  publisherName: string;
  avatar?: string;
}

// Props for the NavBar component
interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const NavBar = ({ isDarkMode, toggleDarkMode, isLoggedIn, setIsLoggedIn }: NavBarProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { setItem: setUserLocalStorage, getItem: getUserLocalStorage, removeItem: removeUserLocalStorage,  } = useLocalStorage("user");
  const navigate = useNavigate();

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = getUserLocalStorage();
    if (storedUser && checkToken()) {
      setUser(storedUser);
      setIsLoggedIn(true);
    } else {
      // If there's no valid token, clear the user data
      handleLogout();
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("Token");
    removeUserLocalStorage();
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
    toast.info("You have been logged out.");
  };


  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newUser = { ...user, avatar: reader.result as string };
        setUser(newUser);
        setUserLocalStorage(newUser); // Save updated user data to localStorage
        toast.success("Avatar updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine which avatar to display
  const avatarSrc = user?.avatar || guest;

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        data-bs-theme={isDarkMode ? "dark" : "light"}
        className={isDarkMode ? "bg-dark" : ""}
      >
        <Container className="NavContainer">
          <Navbar.Brand as={Link} to="/" className="logo">
            EXPENSE <img src={logo} width={40} alt="Logo" /> TRACKER
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && (
                <Nav.Link as={Link} to="/Dashboard">
                  Dashboard
                </Nav.Link>
              )}
            </Nav>
            <Nav className="welcome">
              <Nav.Link onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <img src={Sun} className="SunImg" width={30} title="Light Mode" alt="Sun" />
                ) : (
                  <img src={Moon} width={30} title="Dark Mode" alt="Moon" />
                )}
              </Nav.Link>
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/CreateAccount">Create Account</Nav.Link>
                  <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                  <Image className="profilepic" src={guest} width={50} alt="Guest" />
                </>
              ) : (
                <>
                  {/* <NavbarText>{user ? user.publisherName : "Guest"}</NavbarText> */}
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" id="dropdown-avatar">
                      <Image
                        src={avatarSrc}
                        roundedCircle
                        width={50}
                        height={50}
                        alt="User Avatar"
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
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
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
  );
};

export default NavBar;

