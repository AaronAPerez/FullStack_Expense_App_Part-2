import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselHero from './CarouselHero';

const Homepage: React.FC = () => {
  return (
    <Container fluid className="p-0">
      <CarouselHero isDarkMode={false} />
      <Container className="mt-5">
        <Row>
          <Col md={8} className="mx-auto text-center">
            <h1>Welcome to Our Daily Expenses</h1>
            <p className="lead">
              Track, manage, and optimize your daily expenses with ease.
            </p>
            <Link to="/CreateAccount">
              <Button variant="primary" size="lg" className="mt-3">
                Get Started
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Homepage;

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