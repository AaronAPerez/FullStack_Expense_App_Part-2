import { Nav, Navbar, Container } from 'react-bootstrap';
// import { FaRegMoon } from "react-icons/fa";
// import { IoSunnyOutline } from 'react-icons/io5';
import Sun from '../assets/images/weather-sun-icon-10.jpg'
import Moon from '../assets/images/icon-moon-2.jpg'
import Monopoly from '../assets/images/Monopoly Screenshot 2024-09-03 215301.png'
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";


const NavBar = ({ isDarkMode, toggleDarkMode, user, isLoggedIn, setIsLoggedIn }) => {

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  }


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
          <Navbar.Brand href="#home">Our Daily Expenses</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                Expense Page
              </Nav.Link>
              <Nav.Link as={Link} to={"/Dashboard"}>
                Dashboard
              </Nav.Link>
            </Nav>

            <Nav className="welcome">
              <Nav.Link href="#deets">
                {
                  isDarkMode ? (

                    <img
                      src={Sun}
                      onClick={toggleDarkMode} width={36} title="Light Mode" />
                    // <FaRegMoon onClick={toggleDarkMode} fontSize={20} />
                  ) : (
                    <img
                      src={Moon}
                      onClick={toggleDarkMode} width={28} title="Dark Mode" />
                    // <FaRegMoon onClick={toggleDarkMode} fontSize={20} />
                  )
                }
              </Nav.Link>

              <Nav.Link as={Link} to={"/CreateAccount"}>
                Create Account
              </Nav.Link>
              {isLoggedIn ? <Nav.Link as={Link} to={"/Login"} onClick={handleLogout} >
                Logout
              </Nav.Link> : <Nav.Link as={Link} to={"/Login"}>
                Login
              </Nav.Link>}

              <Nav.Link>
                Welcome {user ? user.publisherName : "Guest"}
              </Nav.Link>
              <Nav.Link>
                <Image className="profilepic" src={Monopoly} roundedCircle />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar