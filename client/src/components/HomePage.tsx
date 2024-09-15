import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarouselHero from './CarouselHero';

const Homepage= () => {
  return (
    <>
      <CarouselHero isDarkMode={false} /> 
   
        <Row my-2>
          <Col md={8} className="mx-auto text-center">
            <h1>Welcome to Daily Expenses</h1>
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
     
    </>
  );
};

export default Homepage;

