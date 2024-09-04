import { useState } from 'react'
import { Container, Row, Col, Button, Modal} from 'react-bootstrap'


const Dashboard = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <>
    <Container className="d-flex align-items-center justify-content-center p-5" fluid>
    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        {/* <Row>
            <Col>
            <Button>Add Expense Item</Button>
            </Col>
        </Row> */}
    </Container>
    
    </>
  )
}

export default Dashboard