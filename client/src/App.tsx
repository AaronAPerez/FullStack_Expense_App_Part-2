import { useState, useEffect, useCallback } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { FaPiggyBank } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "./constant";
import { BrowserRouter } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import NavBar from "./components/NavBar";
import CarouselHero from "./components/CarouselHero";
import Dashboard from "./components/Dashboard";


// export interface Expense {
//   id: number;
//   title: string;
//   description: string;
//   amount: number;
//   category: string;
// }

const App = () => {
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [expenses, setExpenses] = useState<Expense[]>([]);



    ///////////////////////////
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    useEffect(() => {
      const currentTheme = localStorage.getItem('theme');
      if(currentTheme) {
        setIsDarkMode(currentTheme === 'dark');
      }
    }, []);

    const toggleDarkMode = () => {
      setIsDarkMode(prevMode => !prevMode);
    }

    useEffect(() => {
    document.body.className = isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    /////////////////////////////


          // {/* const visibleExpenses = selectedCategory

          //   ? expenses.filter((expense) => expense.category === selectedCategory)
          //   : expenses;

          // const fetchData = () => {
          //   axios
          //     .get<Expense[]>(`${BASE_URL}GetExpenseItems`)
          //     .then(response =>
          //       setExpenses(response.data)) // Update the Expenses state with the fetched data
          //     .catch((error) => setError(error.message)); // Set the error message if an error occurs
          // // };




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


  return (
    <>
    <BrowserRouter> 
    <Container fluid
      className={`${ isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}
      style={{ minHeight: "100vh", padding: '0px' }}
    >
    <Container className="p-0" fluid>
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
    </Container>

    <CarouselHero isDarkMode={isDarkMode} />
    <Dashboard />

       
    </Container> 
     
     </BrowserRouter>
     </>
   );
 };
 
 export default App;

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