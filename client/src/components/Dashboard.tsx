import { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Spinner, Row, Col, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  addExpenseItems,
  checkToken,
  getItemsByUserId,
  getLoggedInUserData,
  updateExpenseItems,
} from "../Services/DataService";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import ExpenseFilter from "./ExpenseFilter";
import { useLocalStorage } from "../hooks/UselocalStorage";
import { TbCopyPlus } from "react-icons/tb";


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

const Dashboard = ({ isDarkMode, onLogin }: { isDarkMode: boolean; onLogin: (userInfo: any) => void }) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<number | null>(null);
  const [userId, setUserId] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expenseItems, setExpenseItems] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const { setItem: setUserLocalStorage, getItem: getUserLocalStorage } = useLocalStorage("user");

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
    let userInfo = getUserLocalStorage() || getLoggedInUserData();
    if (!userInfo) {
      navigate("/Login");
      return;
    }
    onLogin(userInfo);
    setUserId(userInfo.userId);
    setUserData(userInfo);
    setUserLocalStorage(userInfo);
    try {
      let userExpenseItems = await getItemsByUserId(userInfo.userId);
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
        : await addExpenseItems(expenseData);

      if (result) {
        let userExpenseItems = await getItemsByUserId(userId);
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
      let userExpenseItems = await getItemsByUserId(userId);
      setExpenseItems(userExpenseItems);
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  const totalAmount = expenseItems.reduce((acc, item) => acc + item.amount, 0);

  const visibleExpenses = selectedCategory
    ? expenseItems.filter((expense) => expense.category === selectedCategory)
    : expenseItems;

  return (
    <>
      <Container className={isDarkMode ? "bg-dark text-light" : "bg-light"}>
        <Modal
          data-bs-theme={isDarkMode ? "dark" : "light"}
          show={show}
          onHide={handleClose}
        >

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
                <Form.Select {...register("category")}
                  id="category"
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Other">Other</option>
                </Form.Select>
                {errors.category && (
                  <p className="text-danger">{errors.category.message}</p>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
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
          <Container>
            <Row>
              <Col>
                <h2 className="text-center m-3">No Expense Items Found</h2>
              </Col>
            </Row>
            <Container className="AddBtn">
              <Row>
                <Col>
                  <Button variant="outline-primary" onClick={() => handleShow()} >
                    <MdFormatListBulletedAdd size={50} id="addIcon" title="Add Expense" />
                  </Button>
                </Col>
              </Row>
            </Container>
          </Container>
        ) : (
          <Card className="CardTable">
            <Card.Header className="CardTitle">
              {userData.publisherName}'s Total Expenses: ${totalAmount.toFixed(2)}
            </Card.Header>
            <Card.Body>
              <Table className="striped border hover responsive"
                data-bs-theme={isDarkMode ? "dark" : "light"}
              >
                <thead>
                  <tr>
                    <th className="tableHeadFoot">   ACTIONS
            
                      <Button variant="outline-none" size="sm" onClick={() => handleShow()}>

                        <TbCopyPlus size={27} id="addIcon" title="Add Expense" />
                        {/* <Button variant="btn outline-info" size="sm" onClick={() => handleShow()}>
                      <TiPlusOutline />
                        <IoMdAddCircle size={25} color="teal" id="addIcon" />  */}
                      </Button>
                    </th>
                    <th className="tableHeadFoot">DESCRIPTION</th>
                    <th className="tableHeadFoot">AMOUNT</th>
                    <th className="tableHeadFoot">
                      <ExpenseFilter
                        onSelectCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>
                        <Button
                          variant="outline-none"
                          onClick={() => handleDelete(expense)}
                          title="Delete"
                        >
                          <FaRegTrashCan size={25} color="red" />
                        </Button>
                        <Button
                          variant="outline-none"
                          onClick={() => handleShow(expense)}
                          title="Edit"
                        >
                          <GrEdit size={25} color="orange" />
                        </Button>
                      </td>
                      <td>{expense.description}</td>
                      <td>${expense.amount.toFixed(2)}</td>
                      <td>{expense.category}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="tableHeadFoot">
                  <tr>
                    <th className="tableHeadFoot"></th>
                    <th className="tableHeadFoot"></th>
                    <th className="tableHeadFoot">
                      $
                      {visibleExpenses
                        .filter((item) => item.isPublished)
                        .reduce((total, expense) => total + expense.amount, 0)
                        .toFixed(2)}
                    </th>
                    <th className="tableHeadFoot"></th>
                  </tr>
                </tfoot>
              </Table>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
