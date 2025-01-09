import { useState, useEffect, SetStateAction } from "react";
import NavBar from "./components/NavBar";
import Container from 'react-bootstrap/Container';
import Dashboard from "./components/Dashboard";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./components/HomePage";




export interface Expense {
  id: number;
  // title: string;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);



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

      <Container fluid className={`${isDarkMode ? "bg-dark text-light" : "bg-light"}`}
        style={{ minHeight: "100vh", padding: "0px" }}
        data-bs-theme={isDarkMode ? "dark" : "light"}>


        <NavBar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          user={user} 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn} 
        />

        {/* Area for our routes to go to different pages */}
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/Login" element={<Login onLogin={handleLogin} />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin} />} />

            <Route path="/HomePage" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin} />} />

          </Routes>

        </Container>
        <ToastContainer position="top-right" autoClose={2500}
          theme="dark"

        />
      </Container>


    </>
  );
};

export default App;
