import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Expense } from "../App";
import axios from "axios";
import { BASE_URL } from "../constant";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { getPublishedExpenseItems } from "../Services/DataService";


// interface ExpensePageProps {
//   expenses: Expense[];
//   onDelete: (id: number) => void;
//   fetchData: () => void;
//   category: string;
// }


const ExpensePage = () => {


     const [expenseItems, setExpenseItems] = useState([]);

    useEffect(() => {
        getThePubllishedItems();
    }, []);

    const getThePubllishedItems = async () =>
    {
        let publishedItems = await getPublishedExpenseItems();
        setExpenseItems(publishedItems)
    }
    
    // const formatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString('en-US'); // This will format the date as M/D/YYYY
    // };

  {/*}
// ExpenseList component for displaying the list of expenses
const ExpensePage = ({
//   expenses,
//   onDelete,
//   fetchData,
// }: ExpensePageProps) => {
//   const [editId, setEditId] = useState<number | null>(null);
//   const [currentExpense, setCurrentExpense] = useState<Expense>({
//     id: 0,
//     title: "",
//     description: "",
//     amount: 0,
//     category: "",
//   });

  

//   const startEdit = (id: number) => {
//     setEditId(id);
//     const foundExpense = expenses.find((expense) => expense.id === id);
//     if (foundExpense) {
//       setCurrentExpense({ ...foundExpense });
//     }
//   };

//   const stopEdit = () => {
//     setEditId(null);
//     setCurrentExpense({
//       id: 0,
//       title: "",
//       description: "",
//       amount: 0,
//       category: "",
//     });
//   };

//   const saveExpense = (id: number) => {
//     if (currentExpense) {
//       axios
//         .put(`${BASE_URL}UpdateExpenseItem${id}`, currentExpense)
//         .then(() => {
//           fetchData();
//         })
//         .catch((error) => console.log(error.message));
//     }
//     stopEdit();
//   };

0 



  // Render loading state if no expenses
  // if (expenses.length === 0) {
  //   return (
  //     <div className="text-center">
  //       <p>No expenses found.</p>
  //     </div>
  //   );
  // } */}



  return (
    <>
      <h1 className="text-center">View Post Page</h1>
      <Container className="p-5">
        <Row>
          <Col>
            {expenseItems.map((item, index) => (
              <Container key={index}>
                {
                  index % 2 == 0 ? (
                    <Row key={index}>
                      <Col md={6}>
                        <Row style={{ border: "solid" }}>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={12}
                          >
                            Title
                          </Col>
                          <Col md={12}>
                            <Row>
                              <Col
                                className="d-flex justify-content-center"
                                md={6}
                              >
                                Publisher Name
                              </Col>
                              <Col
                                className="text-center"
                                style={{ border: "solid" }}
                                md={6}
                              >
                                Date
                              </Col>
                            </Row>
                          </Col>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={12}
                          >
                            Image
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={6}
                      >
                        Des
                      </Col>
                    </Row>
                  ) : (
                    <Row key={index}>
                      <Col
                        style={{ border: "solid" }}
                        className="d-flex justify-content-center"
                        md={6}
                      >
                        Des
                      </Col>
                      <Col md={6}>
                        <Row style={{ border: "solid" }}>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={12}
                          >
                            Title
                          </Col>
                          <Col md={12}>
                            <Row>
                              <Col
                                className="d-flex justify-content-center"
                                md={6}
                              >
                                Publisher Name
                              </Col>
                              <Col
                                className="text-center"
                                style={{ border: "solid" }}
                                md={6}
                              >
                                Date
                              </Col>
                            </Row>
                          </Col>
                          <Col
                            style={{ border: "solid" }}
                            className="d-flex justify-content-center"
                            md={12}
                          >
                            Image
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
              </Container>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ExpensePage;
