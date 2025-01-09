import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import CarouselHero from './CarouselHero';
import { CardBody } from 'react-bootstrap';

const Homepage = () => {
  return (
    <>
      <Card className='HomePageCard'>
        <Row>
          <Col md={4} className="my-2 py-2">
            <CardBody>
              <h2 className='my-4'>Welcome to Money Management</h2>
              <p className="lead">
                Track, manage, and optimize your daily expenses with ease.
              </p>
              <Link to="/CreateAccount">
                <Button variant="outline-primary" size="lg" className="m-3">
                  Get Started
                </Button>
              </Link>
            </CardBody>
          </Col>
          <Col md={8} className="my-2 py-3 text-center">
            <CarouselHero isDarkMode={true} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Homepage;
