import React from 'react'
import { Carousel } from 'react-bootstrap'

import Laptop from '../assets/images/finance-background-uqu7wvtfbn9hx8vt.jpg'
import Coffee from '../assets/images/chic-illustration-of-investment-eb57a6v6acsk497s.jpg'
import Table from '../assets/images/gorgeous-depiction-of-capital-investment-x5slc0l5eqodfdxm.jpg'




const CarouselHero = ({ isDarkMode }) => {

  


  return (
    <>
    <Carousel data-bs-theme={isDarkMode ? "light" : "dark"}>
      <Carousel.Item className='CItem'>
        <img
          className="carouselImage d-block w-100"
          src={Laptop}
          alt="First slide"
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImage d-block w-100"
          src={Coffee}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carouselImage d-block w-100"
          src={Table}
          alt="Third slide"
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    </>
  )
}
;
export default CarouselHero