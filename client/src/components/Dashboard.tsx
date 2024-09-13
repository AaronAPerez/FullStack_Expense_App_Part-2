import { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Accordion, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  AddExpenseItems,
  checkToken,
  GetItemsByUserId,
  LoggedInData,
  updateExpenseItems,
} from "../Services/DataService";

// Define the Expense interface
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  isPublished: boolean;
  isDeleted: boolean;
}

// Define the validation schema for Expense
const expenseSchema = z
.object({
  description: z
  .string()
  .min(2, {message: "Description is required"}),
  amount: z
  .preprocess(
    (value) => (typeof value === "string" ? parseFloat(value) : value),
    z.number({ invalid_type_error: "Amount is required, must be a number" })
      .positive({ message: "Amount must be positive" })
  ),
  category: z
  .string()
  .refine((val) => val !== "", { message: "Required Field - Select a Category" }),
  isPublished: z.boolean(),
  isDeleted: z.boolean(),
});

type FormData = z.infer<typeof expenseSchema>;

const Dashboard = ({ isDarkMode, onLogin }: { isDarkMode: boolean; onLogin: (userInfo: any) => void }) => {
  const [show, setShow] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [edit, setEdit] = useState<number | null>(null);
  const [userId, setUserId] = useState(0);
  const [publisherName, setPublisherName] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expenseId, setExpenseId] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [expenseItems, setExpenseItems] = useState<Expense[]>([]);
  const [expenseAmount, setExpenseAmount] = useState(0);

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseAmount(parseFloat(e.target.value));
  };

  let navigate = useNavigate();

  //load data
  const loadUserData = async () => {
    let userInfo = LoggedInData();
    onLogin(userInfo);
    setUserId(userInfo.userId);
    setPublisherName(userInfo.publisherName);
    setUserData(userInfo);
    console.log("User info:", userInfo);
    setTimeout(async () => {
      let userExpenseItems = await GetItemsByUserId(userInfo.userId);
      setExpenseItems(userExpenseItems);
      setIsLoading(false);
      console.log("Loaded expenseitems: ", userExpenseItems);
    }, 1000);
  };
  // const loadUserData = async () => {
  //   let userInfo = LoggedInData();
  //   onLogin(userInfo);
  //   setUserId(userInfo.userId);
  //   setPublisherName(userInfo.publisherName);
  //   console.log("User info:", userInfo);
  //   setTimeout(async () => {
  //     let userExpenseItems = await GetItemsByUserId(userInfo.userId);
  //     setExpenseItems(userExpenseItems);
  //     setUserId(userId);

  //     setIsLoading(false);
  //     console.log("Loaded expenseitems: ", userExpenseItems);
  //   }, 1000);
  // };


  //useEffect is the first thing that fires onload.
  useEffect(() => {
    if (!checkToken()) {
      navigate("/Login");
    } else {
      loadUserData();
    }
  }, [navigate]);

  const handleSave = async ({ target: { textContent } }) => {
    let { publisherName, userId } = LoggedInData();
    const published = {
      Id: edit ? expenseId : 0,
      UserId: userId,
      PublisherName: publisherName,
      // Tag: expenseTags,
      // Title: expenseTitle,
      //  Image: expenseImage,
      Description: expenseDescription,
      Amount: expenseAmount,
      Date: new Date(),
      Category: expenseCategory,
      IsPublished:
        textContent === "Save" || textContent == "Save Changes" ? false : true,
      IsDeleted: false,
    };
    console.log(published);
    handleClose();
    let result = false;
    if (edit) {
      result = await updateExpenseItems(published);
    } else {
      result = await AddExpenseItems(published);
    }

    if (result) {
      let userExpenseItems = await GetItemsByUserId(userId);
      setExpenseItems(userExpenseItems);
      console.log(userExpenseItems, "This is frou our userExpenseItems");
    } else {
      alert(`Expense items not ${edit ? "Update" : "Added"}`);
    }
  };

  // const handleSaveWithUnpublish = async () => {
  //   let { publisherName, userId } = LoggedInData();
  //   const notPublished = {
  //     Id: 0,
  //     UserId: userId,
  //     PublisherName: publisherName,
  //     Tag: expenseTags,
  //     Title: expenseTitle,
  //     // Image:expenseImage,
  //     Description: expenseDescription,
  //     Date: new Date(),
  //     Category: expenseCategory,
  //     IsPublished: false,
  //     IsDeleted: false,
  //   }
  //   console.log(notPublished)
  //   handleClose();
  //   let result = await AddExpenseItems(notPublished)
  //   if (result) {
  //     let userExpenseItems = await GetItemsByUserId(userId);
  //     setExpenseItems(userExpenseItems);

  //   }
  // }

  const handleClose = () => setShow(false);

  const handleShow = (
    e,
    {
      id,
      publishername,
      userId,
      // title,
      description,
      // amount,
      category,
      // tag,
      //  image,
      isDeleted,
      isPublished,
    }
  ) => {
    setShow(true);
    if (e.target.textContent === "Add Expense Item") {
      setEdit(false);

      console.log(e.target.textContent, edit);
    } else {
      setEdit(true);
    }
    setExpenseId(id);
    // setExpenseTitle(title);
    setUserId(userId);
    setPublisherName(publishername);
    setExpenseDescription(description);
    setExpenseAmount(amount);
    // setExpenseTags(tag);
    //  setExpenseImage(image);
    setIsDeleted(isDeleted);
    setIsPublished(isPublished);
    console.log(e.target.textContent, edit);
  };

  // const handleTitle = (e) => {
  //   setExpenseTitle(e.target.value);
  // };

  const handleDescription = (e) => {
    setExpenseDescription(e.target.value);
  };
  // const handleAmount = (e) => {
  //   setExpenseAmount(e.target.value);
  // };
  const handleCategory = (e) => {
    setExpenseCategory(e.target.value);
  };
  //  const handleImage = (e) => {
  //      setExpenseImage(e.target.value)
  //  }

  //  const handleImage = async (e) => {
  //    let file = e.target.files[0];
  //    const reader = new FileReader();
  //    reader.onloadend = () => {
  //      console.log(reader.result);
  //      setExpenseImage(reader.result);
  //    };
  //    reader.readAsDataURL(file);
  //  };
  //function to help us handle pulish and unpublish





  const handlePublish = async (item) => {
    const { userId } = JSON.parse(localStorage.getItem("UserData"));
    item.isPublished = !item.isPublished;

    let result = await updateExpenseItems(item);
    if (result) {
      let userExpenseItems = await GetItemsByUserId(userId);
      setExpenseItems(userExpenseItems);
    } else {
      alert(`Expense item not ${edit ? "updated" : "Added"}`);
    }
  };

  //Delete function
  const handleDelete = async (item) => {
    item.isDeleted = !item.isDeleted;
    let result = await updateExpenseItems(item);
    if (result) {
      let userExpenseItems = await GetItemsByUserId(item.userId);
      setExpenseItems(userExpenseItems);
    } else {
      alert(`Blog item not ${edit ? "Updated" : "Added"}`);
    }
  };

  // Calculate the total amount of expense items
  const totalAmount = expenseItems.reduce((acc, item) => acc + item.amount, 0);


  return (
    <>
    <Container
        className={isDarkMode ? "bg-dark text-light p-5" : "bg-light"}
        fluid
      >
        {userData && (
          <div className="mb-4">
            <h5>{userData.publisherName}'s Total Expenses: ${totalAmount}</h5>
          </div>
        )}
        <Button
          variant="outline-success m-2"
          onClick={(e) =>
            handleShow(e, {
              id: 0,
              userId: userId,
              // title: "",
              description: "",
              category: "",
              // tag: "",
              // image: "",
              isDeleted: false,
              isPublished: false,
              publishername: publisherName
            })
          }
        >
          Add Expense Item
        </Button>

        {/* <h2>Total Amount: {totalAmount}</h2> */}

        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{edit ? "Edit" : "Add"} Expense Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  value={expenseDescription}
                  onChange={handleDescription}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Amount">
      <Form.Label>Amount</Form.Label>
      <Form.Control
        type="number"
        step="any"
        placeholder="Enter Amount"
        value={expenseAmount}
        onChange={(e) => setExpenseAmount(parseFloat(e.target.value))}
      />
    </Form.Group>
{/* 
              <Form.Group className="mb-3" controlId="Amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Amount"
                  value={expenseAmount}
                  onChange={handleAmount}
                />
              </Form.Group> */}

              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select value={expenseCategory} onChange={handleCategory}>
                  <option>Select Category</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                </Form.Select>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tag"
                  value={expenseTags}
                  onChange={handleTags}
                />
              </Form.Group> */}

              {/* <Form.Group className="mb-3" controlId="Image">
                <FormLabel>Pick an Image</FormLabel>
                <Form.Control
                  type="file"
                  placeholder="Select an Image from file"
                  accept="image/png, image/jpg"
                  onChange={handleImage}
                />
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Acordian Below */}
        {/* Check to see if expenseitems has info in it */}
        {isLoading ? (
          <>
            <Spinner animation="grow" variant="info" />
            <h2>...Loading</h2>
          </>
        ) : expenseItems.length === 0 ? (
          <>
            <h2 className="text-center m-3">No Expense Items Found</h2>
            <Spinner animation="grow" variant="info" />
          </>
        ) : (
          <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="justify-content-right">    
          {userData.publisherName}'s Total Expenses: ${totalAmount}
         </Accordion.Header>
              <Accordion.Body>
              <div className="container">
  <div className="table-responsive">
    <table className="table table-bordered border-success">
      <thead>
        <tr>
          <th scope="col" className="tableHeadFoot">Description</th>
          <th scope="col" className="tableHeadFoot">Amount</th>
          <th scope="col" className="tableHeadFoot">Category</th>
          <th scope="col" className="tableHeadFoot">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenseItems
          .filter((item) => item.isPublished)
          .map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline"
                  id="button"
                  onClick={() => handleDelete(expense)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline"
                  id="button"
                  onClick={(e) => handleShow(e, expense)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="tableHeadFoot">Total Expenses</td>
          <td className="tableHeadFoot">
            $
            {expenseItems
              .filter((item) => item.isPublished)
              .reduce((total, expense) => total + expense.amount, 0)
              .toFixed(2)}
          </td>
          <td className="tableHeadFoot"></td>
          <td className="tableHeadFoot"></td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
              </Accordion.Body>
            </Accordion.Item>
          {/* <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Published</Accordion.Header>
              <Accordion.Body>
                {expenseItems.map(
                  (item, i) =>
                    item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>

                        {/* <ListGroup.Item as={"li"} md={2}><h3>Title:</h3>{item.title}</ListGroup.Item> 
                        <ListGroup.Item as={"li"} md={3}><h3>Description:</h3>{item.description}</ListGroup.Item>

                        <ListGroup.Item as={"li"} md={2}> <h3>Amount:</h3> {item.amount}</ListGroup.Item>

                        <ListGroup.Item as={"li"} md={2}> <h3>Category:</h3> {item.category}</ListGroup.Item>

                        <ListGroup.Item as={"li"} md={2}><h3>Tags:</h3>{item.tag}</ListGroup.Item> 
                       <ListGroup.Item  as={"li"}  md={3}>
                               Image: {item.image ? item.image.slice(5, 14) : 'No image'}
                              </ListGroup.Item>
                        <ListGroup.Item as={"li"} className="d-flex justify-content-end">
                          <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                            Delete
                          </Button>
                          <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>
                            Edit
                          </Button>
                          <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                            Unpublish
                          </Button>
                        </ListGroup.Item>



                      </ListGroup>
                    )
                )}
              </Accordion.Body>
            </Accordion.Item> */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Unpublished</Accordion.Header>
              <Accordion.Body>
                {expenseItems.map(
                  (item, i) =>
                    !item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>

                        <ListGroup.Item as={"li"} md={2}><h3>Title:</h3>{item.title}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}><h3>Description:</h3>{item.description}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}> <h3>Category:</h3> {item.category}</ListGroup.Item>

                        <ListGroup.Item as={"li"} md={2}><h3>Amount:</h3>{item.amount}</ListGroup.Item>
                          {/* <ListGroup.Item as={"li"} md={3}>
                              Image: {item.image ? item.image.slice(5, 14) : 'No image'} 
                        </ListGroup.Item>  */}
                        <ListGroup.Item as={"li"} className="d-flex justify-content-end">
                          <Button variant="outline-danger mx-2" onClick={() => handleDelete(item)}>
                            Delete
                          </Button>
                          <Button variant="outline-info mx-2" onClick={(e) => handleShow(e, item)}>
                            Edit
                          </Button>
                          <Button variant="outline-primary mx-2" onClick={() => handlePublish(item)}>
                            Publish
                          </Button>
                        </ListGroup.Item>
                      </ListGroup>
                    )
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </>
  );
};

export default Dashboard;


