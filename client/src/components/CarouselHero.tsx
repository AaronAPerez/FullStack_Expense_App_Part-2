import Carousel from 'react-bootstrap/Carousel';
import Laptop from '../assets/images/finance-background-uqu7wvtfbn9hx8vt.jpg'
import Coffee from '../assets/images/chic-illustration-of-investment-eb57a6v6acsk497s.jpg'
import Table from '../assets/images/gorgeous-depiction-of-capital-investment-x5slc0l5eqodfdxm.jpg'


const CarouselHero = ({ isDarkMode }) => {


  return (
    <>
      <Carousel data-bs-theme={isDarkMode ? 'dark' : 'light'}>
        <Carousel.Item className='CItem'>
          <img
            className="carouselImage d-block w-100"
            src={Laptop}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselImage d-block w-100"
            src={Coffee}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselImage d-block w-100"
            src={Table}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default CarouselHero;