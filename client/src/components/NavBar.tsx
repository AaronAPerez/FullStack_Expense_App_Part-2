import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoSunnyOutline } from 'react-icons/io5';
import { FaRegMoon } from 'react-icons/fa';
import Monopoly from '../assets/images/Monopoly- 2024-09-07 210940.png'
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";



const NavBar = ({ isDarkMode, toggleDarkMode, user, isLoggedIn, setIsLoggedIn }) => {

  const handleLogout = () => 
  {
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
      
       <Navbar.Brand href="#home"> 
         Our Daily Expenses
         
        </Navbar.Brand>


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
                {isDarkMode ? (<IoSunnyOutline onClick={toggleDarkMode} fontSize={25} />

                  
                ) : (
                  <FaRegMoon onClick={toggleDarkMode} fontSize={20} />
                )}
              </Nav.Link>

              <Nav.Link as={Link} to={"/CreateAccount"}>
                Create Account
              </Nav.Link>
              {isLoggedIn ? <Nav.Link as={Link} to={"/Login"} onClick={handleLogout} >
                Logout
               </Nav.Link> : <Nav.Link as={Link} to={"/Login"}>
                Login
              </Nav.Link>  }
              
              <Nav.Link>Welcome {user ? user.publisherName : "Guest"}</Nav.Link>
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

export default NavBar;

