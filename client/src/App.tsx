import { useState, useEffect, SetStateAction } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "./components/NavBar";
import CarouselHero from "./components/CarouselHero";
import Dashboard from "./components/Dashboard";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/HomePage";
// import ExpenseFilter from "./components/ExpenseFilter";
// import ExpenseForm from "./components/ExpenseForm";
// import ExpenseList from "./components/ExpenseList";
// import { FaPiggyBank } from "react-icons/fa";
// import axios from "axios";
// import { BASE_URL } from "./constant";



export interface Expense {
  id: number;
  // title: string;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  // const [currentData, setCurrentData] = useState<Expense | undefined>(undefined);
  // const [currentData, setCurrentData] = useState<Expense | undefined>(undefined);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [username, setUsername] = useState<string>('');


  const handleLogin = (userData: SetStateAction<null>) => {
    setUser(userData);
    setIsLoggedIn(true);//Trigger re-render
  }



  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setIsDarkMode(currentTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode
      ? "bg-dark text-white"
      : "bg-light text-dark";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };


  return (
    <>
      <BrowserRouter>
        <Container className="p-0" fluid>
          <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Container>

        <Container
          fluid
          className={`${isDarkMode ? "bg-dark text-light" : "bg-light"}`}
          style={{ minHeight: "100vh", padding: "0px" }}
          data-bs-theme={isDarkMode ? "dark" : "light"}
        >
          <Row>
            <Col>
              {/* Area for our routes to go to different pages */}
              <Routes>
                <Route path="/" element={<Homepage />} />

                <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                <Route path="/CreateAccount" element={<CreateAccount />} />
                <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin} />} />

              </Routes>
            </Col>

          </Row>
        </Container>
        <ToastContainer position="top-right" autoClose={2500} />
      </BrowserRouter>
    </>
  );
};

export default App;

