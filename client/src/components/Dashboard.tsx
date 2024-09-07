import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { Container, FormGroup, FormLabel, ListGroup } from "react-bootstrap";
import { Col, Row, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import {
  AddExpenseItems,
  checkToken,
  GetItemsByUserId,
  LoggedInData,
  updateExpenseItems,
} from "../Services/DataService";
import Spinner from "react-bootstrap/Spinner";


    // import { useState, useEffect } from "react";
    // import {
    //   Container,
    //   Row,
    //   Col,
    //   Button,
    //   Modal,
    //   Form,
    //   FormLabel,
    //   Accordion,
    //   ListGroup,
    // } from "react-bootstrap";
    // import Spinner from "react-bootstrap/Spinner";


    // import { useNavigate } from "react-router-dom";
    // import {
    //   AddExpenseItems,
    //   checkToken,
    //   GetItemsByUserId,
    //   LoggedInData,
    // } from "../Services/DataService";






const Dashboard = ({ isDarkMode, onLogin }) => {

  const [show, setShow] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseImage, setExpenseImage] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseTags, setExpenseTags] = useState("");

  const [edit, setEdit] = useState(false);

  const [userId, setUserId] = useState(0);
  const [publisherName, setPublisherName] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [expenseId, setExpenseId] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);


 //Dummy data useState
 const [expenseItems, setExpenseItems] = useState([]);
 let navigate = useNavigate();

 //load data
 const loadUserData = async () => {
   let userInfo = LoggedInData();
   onLogin(userInfo);
   setUserId(userInfo.userId);
   setPublisherName(userInfo.publisherName);
   console.log("User info:", userInfo);
   setTimeout(async () => {
     let userExpenseItems = await GetItemsByUserId(userInfo.userId);
     setExpenseItems(userExpenseItems);
     setUserId(userId);

     setIsLoading(false);
     console.log("Loaded expenseitems: ", userExpenseItems);
   }, 1000);
 };

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
     Tag: expenseTags,
     Title: expenseTitle,
     Image: expenseImage,
     Description: expenseDescription,
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
      // const handleSaveWithUnpublish = async () =>
      // {
      //   let {publisherName, userId}  = LoggedInData();
      //   const notPublished = {
      //     Id:0,
      //     UserId: userId,
      //     PublisherName:publisherName,
      //     Tag: expenseTags,
      //     Title:expenseTitle,
      //     Image:expenseImage,
      //     Description:expenseDescription,
      //     Date: new Date(),
      //     Category: expenseCategory,
      //     IsPublished: false,
      //     IsDeleted: false,
      //   }
      //   console.log(notPublished)
      //   handleClose();
      //   let result = await AddExpenseItems(notPublished)
      //   if(result)
      //   {
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
     title,
     description,
     category,
     tag,
     image,
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
   setExpenseTitle(title);
   setUserId(userId);
   setPublisherName(publishername);
   setExpenseDescription(description);
   setExpenseCategory(category);
   setExpenseTags(tag);
   setExpenseImage(image);
   setIsDeleted(isDeleted);
   setIsPublished(isPublished);
   console.log(e.target.textContent, edit);
 };

 const handleTitle = (e) => {
   setExpenseTitle(e.target.value);
 };

 const handleDescription = (e) => {
   setExpenseDescription(e.target.value);
 };
 const handleTags = (e) => {
   setExpenseTags(e.target.value);
 };
 const handleCategory = (e) => {
   setExpenseCategory(e.target.value);
 };
 const handleImage = (e) => {
     setExpenseImage(e.target.value)
 }

 const handleImage = async (e) => {
   let file = e.target.files[0];
   const reader = new FileReader();
   reader.onloadend = () => {
     console.log(reader.result);
     setExpenseImage(reader.result);
   };
   reader.readAsDataURL(file);
 };
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



  return (
    <>
      <Container
        className={isDarkMode ? "bg-dark text-light p-5" : "bg-light"}
        fluid
      >
        <Button
          variant="outline-primary m-2"
          onClick={(e) =>
            handleShow(e, {
              id: 0,
              userId: userId,
              title: "",
              description: "",
              category: "",
              tag: "",
              image: "",
              IsDeleted: false,
              isPublished: false,
              publishername: publisherName
            })
          }
        >
          Add Blog Item
        </Button>



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
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={expenseTitle}
                  onChange={handleTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Description"
                  value={expenseDescription}
                  onChange={handleDescription}
                />
              </Form.Group>

              <Form.Group controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select value={expenseCategory} onChange={handleCategory}>
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tag"
                  value={expenseTags}
                  onChange={handleTags}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Image">
                <FormLabel>Pick an Image</FormLabel>
                <Form.Control
                  type="file"
                  placeholder="Select an Image from file"
                  accept="image/png, image/jpg"
                  onChange={handleImage}
                />
              </Form.Group>
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
              <Accordion.Header>Published</Accordion.Header>
              <Accordion.Body>
                {expenseItems.map(
                  (item, i) =>
                    item.isPublished && (
                      <ListGroup as="ul" className="mb-2" key={item.id}>

                        <ListGroup.Item as={"li"} md={2}><h3>Title:</h3>{item.title}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}><h3>Description:</h3>{item.description}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}> <h3>Category:</h3> {item.category}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={2}><h3>Tags:</h3>{item.tag}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
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
            </Accordion.Item>
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
                        <ListGroup.Item as={"li"} md={2}><h3>Tags:</h3>{item.tag}</ListGroup.Item>
                        <ListGroup.Item as={"li"} md={3}>
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


