import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselHero from './CarouselHero';
import money from '../assets/images/finance-background-uqu7wvtfbn9hx8vt.jpg'

const Homepage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={4} className="mt-5 py-4">
            <h1>Welcome to Money Management</h1>
            <p className="lead">
              Track, manage, and optimize your daily expenses with ease.
            </p>
            <Link to="/CreateAccount">
              <Button variant="outline-primary" size="lg" className="m-3">
                Get Started
              </Button>
            </Link>
          </Col>

          <Col md={8} className="my-4 py-4 text-center">
            <CarouselHero isDarkMode={false} />
          </Col>


        </Row>





      </Container>

    </>
  );
};

export default Homepage;

