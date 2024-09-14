import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Accordion, Spinner, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  AddExpenseItems,
  checkToken,
  GetItemsByUserId,
  LoggedInData,
  updateExpenseItems,
} from "../Services/DataService";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { MdEditDocument, MdFormatListBulletedAdd } from "react-icons/md";

const schema = z.object({
  description: z.string().min(1, { message: "Required field" }),
  amount: z.number({ invalid_type_error: "Required Field - Amount must be a number" })
    .positive({ message: "Amount must be positive" }),
  category: z.string().min(1, { message: "Required Field - Select a Category" }),
});

type FormData = z.infer<typeof schema>;

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  isPublished: boolean;
  isDeleted: boolean;
}

const Dashboard: React.FC<{ isDarkMode: boolean; onLogin: (userInfo: any) => void }> = ({ isDarkMode, onLogin }) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<number | null>(null);
  const [userId, setUserId] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expenseItems, setExpenseItems] = useState<Expense[]>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const loadUserData = async () => {
    let userInfo = LoggedInData();
    onLogin(userInfo);
    setUserId(userInfo.userId);
    setUserData(userInfo);
    try {
      let userExpenseItems = await GetItemsByUserId(userInfo.userId);
      setExpenseItems(userExpenseItems);
    } catch (error) {
      console.error("Error fetching expense items:", error);
      toast.error("Failed to load expense items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!checkToken()) {
      navigate("/Login");
    } else {
      loadUserData();
    }
  }, [navigate]);

  const onSubmit = async (data: FormData) => {
    const expenseData = {
      Id: edit || 0,
      UserId: userId,
      PublisherName: userData.publisherName,
      Description: data.description,
      Amount: data.amount,
      Date: new Date(),
      Category: data.category,
      IsPublished: true,
      IsDeleted: false,
    };

    try {
      const result = edit
        ? await updateExpenseItems(expenseData)
        : await AddExpenseItems(expenseData);

      if (result) {
        let userExpenseItems = await GetItemsByUserId(userId);
        setExpenseItems(userExpenseItems);
        toast.success(edit ? "Expense updated successfully" : "Expense added successfully");
        handleClose();
      } else {
        throw new Error("Operation failed");
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      toast.error(`Failed to ${edit ? "update" : "add"} expense`);
    }
  };

  const handleClose = () => {
    setShow(false);
    setEdit(null);
    reset();
  };

  const handleShow = (expense?: Expense) => {
    setShow(true);
    if (expense) {
      setEdit(expense.id);
      setValue("description", expense.description);
      setValue("amount", expense.amount);
      setValue("category", expense.category);
    } else {
      setEdit(null);
      reset();
    }
  };

  const handleDelete = async (item: Expense) => {
    try {
      const updatedItem = { ...item, isDeleted: true };
      await updateExpenseItems(updatedItem);
      let userExpenseItems = await GetItemsByUserId(userId);
      setExpenseItems(userExpenseItems);
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  const totalAmount = expenseItems.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Container className={isDarkMode ? "bg-dark text-light p-5" : "bg-light"} fluid>
      {userData && (
        <Container>
          <Row className="mb-3">
            <Col>
              <Button variant="success" onClick={() => handleShow()}>
                Add Expense
                <MdFormatListBulletedAdd size={25} id="addIcon" />
              </Button>
            </Col>
            <Col className="text-end">
              <h5>{userData.publisherName}'s Total Expenses: ${totalAmount.toFixed(2)}</h5>
            </Col>
          </Row>
        </Container>
      )}

      <Modal show={show} onHide={handleClose} data-bs-theme={isDarkMode ? "dark" : "light"}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? "Edit" : "Add"} Expense Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter Amount"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
            </Form.Group>

            <Form.Group controlId="Category">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register("category")}>
                <option value="">Select Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
              </Form.Select>
              {errors.category && (
                <p className="text-danger">{errors.category.message}</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <h2>Loading...</h2>
        </div>
      ) : expenseItems.length === 0 ? (
        <h2 className="text-center m-3">No Expense Items Found</h2>
      ) : (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Expenses</Accordion.Header>
            <Accordion.Body>
              <Table striped hover responsive="sm">
                <thead>
                  <tr>  
                    <th >
                    ACTIONS
                    </th>
                    <th>DESCRIPTION</th>
                    <th>AMOUNT</th>
                    <th>CATEGORY</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseItems.map((expense) => (
                    <tr key={expense.id}>
                         <td>
                      <Button
                          variant="outline-none"
                          onClick={() => handleShow(expense)}
                          title="Edit"
                          className="ms-2"
                        >
                          <GrEdit size={25} color="orange" />
                        </Button>
                        <Button
                          variant="outline-none"
                          onClick={() => handleDelete(expense)}
                          title="Delete"
                          className="p-0"
                        >
                          <FaRegTrashCan size={25} color="red"/>
                        </Button>
                   
                      </td>
                      <td>{expense.description}</td>
                      <td>${expense.amount.toFixed(2)}</td>
                      <td>{expense.category}</td>
                      {/* <td>
                      <Button
                          variant="outline-none"
                          onClick={() => handleShow(expense)}
                          title="Edit"
                          className="ms-2"
                        >
                          <GrEdit size={25} color="orange" />
                        </Button>
                        <Button
                          variant="outline-none"
                          onClick={() => handleDelete(expense)}
                          title="Delete"
                          className="p-0"
                        >
                          <FaRegTrashCan size={25} color="red"/>
                        </Button>
                   
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </Container>
  );
};

export default Dashboard;

// import { useState, useEffect } from "react";
// import { Container, Button, Modal, Form, Accordion, ListGroup, Spinner, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { z } from "zod";
// import {
//   AddExpenseItems,
//   checkToken,
//   GetItemsByUserId,
//   LoggedInData,
//   updateExpenseItems,
// } from "../Services/DataService";
// import { FaRegTrashCan } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { MdFormatListBulletedAdd } from "react-icons/md";

// // Define the Expense interface
// interface Expense {
//   id: number;
//   description: string;
//   amount: number;
//   category: string;
//   isPublished: boolean;
//   isDeleted: boolean;
// }

// // Define the validation schema for Expense
// const expenseSchema = z
//   .object({
//     description: z
//       .string()
//       .min(2, { message: "Description is required" }),
//     amount: z
//       .preprocess(
//         (value) => (typeof value === "string" ? parseFloat(value) : value),
//         z.number({ invalid_type_error: "Amount is required, must be a number" })
//           .positive({ message: "Amount must be positive" })
//       ),
//     category: z
//       .string()
//       .refine((val) => val !== "", { message: "Required Field - Select a Category" }),
//     isPublished: z.boolean(),
//     isDeleted: z.boolean(),
//   });

// type FormData = z.infer<typeof expenseSchema>;

// const Dashboard = ({ isDarkMode, onLogin }: { isDarkMode: boolean; onLogin: (userInfo: any) => void }) => {
//   const [show, setShow] = useState(false);
//   const [expenseDescription, setExpenseDescription] = useState("");
//   const [expenseCategory, setExpenseCategory] = useState("");
//   const [edit, setEdit] = useState<number | null>(null);
//   const [userId, setUserId] = useState(0);
//   const [publisherName, setPublisherName] = useState("");
//   const [userData, setUserData] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [expenseId, setExpenseId] = useState(0);
//   const [isDeleted, setIsDeleted] = useState(false);
//   const [isPublished, setIsPublished] = useState(false);
//   const [expenseItems, setExpenseItems] = useState<Expense[]>([]);
//   const [expenseAmount, setExpenseAmount] = useState(0);

//   const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setExpenseAmount(parseFloat(e.target.value));
//   };

//   let navigate = useNavigate();

//   //load data
//   const loadUserData = async () => {
//     let userInfo = LoggedInData();
//     onLogin(userInfo);
//     setUserId(userInfo.userId);
//     setPublisherName(userInfo.publisherName);
//     setUserData(userInfo);
//     console.log("User info:", userInfo);
//     setTimeout(async () => {
//       let userExpenseItems = await GetItemsByUserId(userInfo.userId);
//       setExpenseItems(userExpenseItems);
//       setIsLoading(false);
//       console.log("Loaded expenseitems: ", userExpenseItems);
//     }, 1000);
//   };

//   /

//   //useEffect is the first thing that fires onload.
//   useEffect(() => {
//     if (!checkToken()) {
//       navigate("/Login");
//     } else {
//       loadUserData();
//     }
//   }, [navigate]);

//   const handleSave = async ({ target: { textContent } }) => {
//     let { publisherName, userId } = LoggedInData();
//     const published = {
//       Id: edit ? expenseId : 0,
//       UserId: userId,
//       PublisherName: publisherName,
//       // Tag: expenseTags,
//       // Title: expenseTitle,
//       //  Image: expenseImage,
//       Description: expenseDescription,
//       Amount: expenseAmount,
//       Date: new Date(),
//       Category: expenseCategory,
//       IsPublished:
//         textContent === "Save" || textContent == "Save Changes" ? false : true,
//       IsDeleted: false,
//     };
//     console.log(published);
//     handleClose();
//     let result = false;
//     if (edit) {
//       result = await updateExpenseItems(published);
//     } else {
//       result = await AddExpenseItems(published);
//     }

//     if (result) {
//       let userExpenseItems = await GetItemsByUserId(userId);
//       setExpenseItems(userExpenseItems);
//       console.log(userExpenseItems, "This is frou our userExpenseItems");
//     } else {
//       alert(`Expense items not ${edit ? "Update" : "Added"}`);
//     }
//   };


//   // }

//   const handleClose = () => setShow(false);

//   const handleShow = (
//     e,
//     {
//       id,
//       publishername,
//       userId,
//       // title,
//       description,
//       // amount,
//       category,

//       isDeleted,
//       isPublished,
//     }
//   ) => {
//     setShow(true);
//     if (e.target.textContent === "Add Expense Item") {
//       setEdit(false);

//       console.log(e.target.textContent, edit);
//     } else {
//       setEdit(true);
//     }
//     setExpenseId(id);

//     setUserId(userId);
//     setPublisherName(publishername);
//     setExpenseDescription(description);
//     setExpenseAmount(amount);


//     setIsDeleted(isDeleted);
//     setIsPublished(isPublished);
//     console.log(e.target.textContent, edit);
//   };


//   const handleDescription = (e) => {
//     setExpenseDescription(e.target.value);
//   };

//   const handleCategory = (e) => {
//     setExpenseCategory(e.target.value);
//   };






//   const handlePublish = async (item) => {
//     const { userId } = JSON.parse(localStorage.getItem("UserData"));
//     item.isPublished = !item.isPublished;

//     let result = await updateExpenseItems(item);
//     if (result) {
//       let userExpenseItems = await GetItemsByUserId(userId);
//       setExpenseItems(userExpenseItems);
//     } else {
//       alert(`Expense item not ${edit ? "updated" : "Added"}`);
//     }
//   };

//   //Delete function
//   const handleDelete = async (item) => {
//     item.isDeleted = !item.isDeleted;
//     let result = await updateExpenseItems(item);
//     if (result) {
//       let userExpenseItems = await GetItemsByUserId(item.userId);
//       setExpenseItems(userExpenseItems);
//     } else {
//       alert(`Blog item not ${edit ? "Updated" : "Added"}`);
//     }
//   };

//   // Calculate the total amount of expense items
//   const totalAmount = expenseItems.reduce((acc, item) => acc + item.amount, 0);


//   return (
//     <>
//       <Container
//         className={isDarkMode ? "bg-dark text-light p-5" : "bg-light"}
//         fluid
//       >
//         {userData && (
//           <Container>
//           <Row>
//             <Col>

//         <Button
//           variant="btn btn-success"
//           onClick={(e) =>
//             handleShow(e, {
//               id: 0,
//               userId: userId,
//               // title: "",
//               description: "",
//               category: "",
//               // tag: "",
//               // image: "",
//               isDeleted: false,
//               isPublished: false,
//               publishername: publisherName
//             })
//           }
//         >
//           Add Expense Item
//           <MdFormatListBulletedAdd size={25} id="addIcon" />
//         </Button>


//             <div className="icon">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 268.832 268.832"
//               >
//                 <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
//               </svg>

//         </div>
//             </Col>
//             <Col>

//             <h5>{userData.publisherName}'s Total Expenses: ${totalAmount}</h5>
//             </Col>
//           </Row>
//           </Container>
//         )}





//         <Container>
//           <Row>
//             <Col>

//         <Modal
//           data-bs-theme={isDarkMode ? "dark" : "light"}
//           show={show}
//           onHide={handleClose}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>{edit ? "Edit" : "Add"} Expense Item</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>

//             <Form>

//               <Form.Group className="mb-3" controlId="Description">
//                 <Form.Label>Description</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   placeholder="Enter Description"
//                   value={expenseDescription}
//                   onChange={handleDescription}
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="Amount">
//                 <Form.Label>Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   step="any"
//                   placeholder="Enter Amount"
//                   value={expenseAmount}
//                   onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
//                 />
//               </Form.Group>


//               <Form.Group controlId="Category">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Select value={expenseCategory} onChange={handleCategory}>
//                   <option>Select Category</option>
//                   <option value="Groceries">Groceries</option>
//                   <option value="Utilities">Utilities</option>
//                   <option value="Entertainment">Entertainment</option>
//                   <option value="Shopping">Shopping</option>
//                 </Form.Select>
//               </Form.Group>


//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="outline-secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="outline-primary" onClick={handleSave}>
//               {edit ? "Save Changes" : "Save"}
//             </Button>
//             <Button variant="outline-primary" onClick={handleSave}>
//               {edit ? "Save Changes" : "Save"} and Publish
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         </Col>
//        </Row>

//     </Container>

//         <Container>
//           <Row>
//             <Col>

//         {/* Acordian Below */}
//         {/* Check to see if expenseitems has info in it */}
//         {isLoading ? (
//           <>
//             <Spinner animation="grow" variant="info" />
//             <h2>...Loading</h2>
//           </>
//         ) : expenseItems.length === 0 ? (
//           <>
//             <h2 className="text-center m-3">No Expense Items Found</h2>
//             <Spinner animation="grow" variant="info" />
//           </>

//         ) : (

//           <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
//             <Accordion.Item eventKey="0">
//               <Accordion.Header>
//                 Completed Transactions


//         </Accordion.Header>
//         <Accordion.Body>
//                 <div className="container">

//                   <div className="table-responsive">
//                     <table className="table table-bordered border-success">
//                       <thead>
//                         <tr>
//                           <th scope="col" className="tableHeadFoot">Description</th>
//                           <th scope="col" className="tableHeadFoot">Amount</th>
//                           <th scope="col" className="tableHeadFoot">Category</th>
//                           <th scope="col" className="tableHeadFoot">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {expenseItems
//                           .filter((item) => item.isPublished)
//                           .map((expense) => (
//                             <tr key={expense.id}>
//                               <td>{expense.description}</td>
//                               <td>${expense.amount.toFixed(2)}</td>
//                               <td>{expense.category}</td>
//                               <td>
//                                 <button
//                                   className="btn btn-outline-danger"
//                                   id="button"
//                                   onClick={() => handleDelete(expense)}
//                                   title="Delete Expense">
//                                   <FaRegTrashCan color="red" size={25} />

//                                 </button>
//                                 <button
//                                   className="btn btn-outline-success"
//                                   id="button"
//                                   onClick={(e) => handleShow(e, expense)}
//                                   title="Edit Expense"
//                                 >
//                                   <FaEdit size={25} />
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                       </tbody>
//                       <tfoot>
//                         <tr>
//                           <td className="tableHeadFoot">Total Expenses</td>
//                           <td className="tableHeadFoot">
//                             $
//                             {expenseItems
//                               .filter((item) => item.isPublished)
//                               .reduce((total, expense) => total + expense.amount, 0)
//                               .toFixed(2)}
//                           </td>
//                           <td className="tableHeadFoot"></td>
//                           <td className="tableHeadFoot"></td>
//                         </tr>
//                       </tfoot>
//                     </table>
//                   </div>
//                 </div>
//               </Accordion.Body>
//             </Accordion.Item>


//             <Accordion.Item eventKey="1">
//               <Accordion.Header>Pending Transactions</Accordion.Header>
//               <Accordion.Body>
//                 {expenseItems.map(
//                   (item, i) =>
{/*/ !item.isPublished && (^&*/ }
//                       <ListGroup as="ul" className="mb-2" key={item.id}>

//                         <ListGroup.Item as={"li"} md={2}><h3>Title:</h3>{item.title}</ListGroup.Item>
//                         <ListGroup.Item as={"li"} md={3}><h3>Description:</h3>{item.description}</ListGroup.Item>
//                         <ListGroup.Item as={"li"} md={2}> <h3>Category:</h3> {item.category}</ListGroup.Item>

//                         <ListGroup.Item as={"li"} md={2}><h3>Amount:</h3>{item.amount}</ListGroup.Item>
//                         {/* <ListGroup.Item as={"li"} md={3}>
//                               Image: {item.image ? item.image.slice(5, 14) : 'No image'}
//                         </ListGroup.Item>  */}
//                         <ListGroup.Item as={"li"} className="d-flex justify-content-end">
//                           <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
//                             Delete
//                           </Button>
//                           <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>
//                             Edit
//                           </Button>
//                           <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
//                             Publish
//                           </Button>
//                         </ListGroup.Item>
//                       </ListGroup>
//                     )
//                 )}
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         )}
//              </Col>
//           </Row>

//         </Container>
//       </Container>
//     </>
//   );
// };

// export default Dashboard;


