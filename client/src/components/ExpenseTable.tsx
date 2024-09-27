import React, { useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap';



//Define the shape of a single task with this interface
interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    isPublished: boolean;
    isDeleted: boolean;
  }







const ExpenseTable = (({ isDarkMode, onLogin }: { isDarkMode: boolean; onLogin: (userInfo: any) => void }: Expense)  => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [show, setShow] = useState(false);
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: currentData?.description || '',
      amount: currentData?.amount || undefined,
      category: currentData?.category || '',
    },
  });

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


  function handleSubmit(onSubmit: any): React.FormEventHandler<HTMLFormElement> | undefined {
    throw new Error('Function not implemented.');
  }

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

  

    </Container>
    </>
  )
}

export default ExpenseTable
