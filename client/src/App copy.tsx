import { useState, useEffect, SetStateAction } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import NavBar from "./components/NavBar";
import CarouselHero from "./components/CarouselHero";
import Dashboard from "./components/Dashboard";
import ExpensePage from "./components/ExpensePage";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

          {/* <CarouselHero isDarkMode={isDarkMode} />  */}
          <Row className="">
            <Col>
              <h1 className="text-center">Our Expenses</h1>
            </Col>

            {/* Area for our routes to go to different pages */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/ExpensePage" element={<ExpensePage />} />
              <Route path="/Login" element={<Login onLogin={handleLogin}/>} />
              <Route path="/CreateAccount" element={<CreateAccount />} /> 
              <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin}/>} />
              
            </Routes>

          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
};

// export default App;


  {/* const visibleExpenses = selectedCategory

            ? expenses.filter((expense) => expense.category === selectedCategory)
            : expenses;

          const fetchData = () => {
            axios
              .get<Expense[]>(`${BASE_URL}GetExpenseItems`)
              .then(response =>
                setExpenses(response.data)) // Update the Expenses state with the fetched data
              .catch((error) => setError(error.message)); // Set the error message if an error occurs
          
          */}




          // // const handleDelete = (id: number) => {
          // //   axios
          // //     .delete(`${BASE_URL}${id}`)
          // //     .then(() => {
          // //       setExpenses(expenses.filter((expense) => expense.id !== id));
          // //       fetchData();
          // //     })
          // //     .catch(error => {
          // //       console.log(error);
          // //       setError('Error deleting expense');
          // //     });
          // // };

          // // useEffect(() => {
          // //   fetchData();
          // // }, []); /*}


//   return (
//     <>
//       <BrowserRouter>

//           <Container className="p-0" fluid>
//             <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//           </Container>

//           <Container
//           fluid
//           className={`${isDarkMode ? "bg-dark text-light" : "bg-light"}`}
//           style={{ minHeight: "100vh", padding: "0px" }}
//         >

//           <CarouselHero isDarkMode={isDarkMode} />
//           <Row className="text-center">
//             <Col>
//               <h1>Our Expenses</h1>
//             </Col>

//             {/* Area for our routes to go to different pages */}
//             <Routes>

//               <Route path="/" element={<BlogPage />} />
//               {/* <Route path="/Login" element={<Login />} />*/}
//               <Route path="/CreateAccount" element={<CreateAccount />} /> 
//               <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode}/>} />
//               {/* <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin} />} /> */}
//             </Routes>

//           </Row>
//         </Container>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;

////////////////////////////

{/*<div className="container">

          <header className="py-2 border-bottom">
            <h1 className="text-center">
              EXPENSE TR
              <FaPiggyBank size={52} color="pink" />
              CKER
            </h1>
          </header>
          <div className="main">
            <div className="row">
              <div className="col-md-4">
                <ExpenseForm fetchData={fetchData} currentData={setExpenses} />
              </div>
              <div className="col-md-8 pt-2">
                <ExpenseFilter
                  onSelectCategory={(category) => setSelectedCategory(category)}
                />
                <ExpenseList
                  expenses={visibleExpenses}
                  fetchData={fetchData}
                  onDelete={handleDelete}
                  category={selectedCategory}

                />
              </div>
            </div>
          </div>
        </div> */}

//       </BrowserRouter>
//     </>
//   );
// };

// export default App;