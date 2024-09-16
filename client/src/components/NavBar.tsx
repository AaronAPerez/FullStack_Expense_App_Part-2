import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoSunnyOutline } from 'react-icons/io5';
import { FaPiggyBank, FaRegMoon } from 'react-icons/fa';
import Monopoly from '../assets/images/Monopoly- 2024-09-07 210940.png'
import Sun from '../assets/images/weather-sun-icon-10.jpg'
import Moon from '../assets/images/Weather_icon_-_full_moon.svg.png'
import logo from '../assets/images/BanKGold.png'
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}




const NavBar = ({ isDarkMode, toggleDarkMode, user, isLoggedIn, setIsLoggedIn }: NavBarProps) => {

  const handleLogout = () => {
    localStorage.clear();
    // setUser(null);
    setIsLoggedIn(false);
  }


  return (

    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        data-bs-theme={`${isDarkMode ? "dark" : "light" }`}
        className={`${isDarkMode ? "bg-dark text-light" : "bg-body-tertiary"}`}
        // fixed="top"
      >
        <Container>
            <Navbar.Brand as={Link} to={"/"} className="logo">EXPENSE  <img src={logo} width={40}/> TRACKER
            {/* <FaPiggyBank color="pink"/> */}
            </Navbar.Brand>
         
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
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
                </>
              ) : (
                <Nav.Link as={Link} to="/Login" onClick={handleLogout}>Logout</Nav.Link>
              )}
              {isLoggedIn && (
                <>
                  <Nav.Link>Welcome {user ? user.publisherName : "Guest"}</Nav.Link>
                    <Nav.Link>
                  <Image className="profilepic" src={Monopoly} roundedCircle />
                </Nav.Link>  

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




