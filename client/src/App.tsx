import { useState, useEffect, useCallback } from "react";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { FaPiggyBank } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "./constant";


export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState('');
  const [editExpense, setEditExpense] = useState<Expense | undefined>(undefined);




  const visibleExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  const fetchData = () => {
    axios
      .get<Expense[]>(`${BASE_URL}`)
      .then(response => 
        setExpenses(response.data)) // Update the Expenses state with the fetched data
        .catch((error) => setError(error.message)); // Set the error message if an error occurs
    };




  const handleDelete = (id: number) => {
    axios
      .delete(`${BASE_URL}${id}`)
      .then(() => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
        fetchData();
      })
      .catch(error => {
        console.log(error);
        setError('Error deleting expense');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


    return (
      <>
        <div className="container">
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
                <ExpenseForm fetchData={fetchData} currentData={editExpense} />
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



        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td col-span="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>






              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default App;