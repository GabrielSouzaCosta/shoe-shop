import {  faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'

function Cart() {
  return (
  <>
    <NavBar />
    <div className='bg-secondary min-vh-100 text-dark'>
      <Container as="section" fluid className="py-4" style={{width: "90%"}}>
        <h1 className='display-3 d-inline-block title mb-5' style={{borderBottom: "2px solid #000000"}}>
          Shopping Cart
        </h1>

        <div className='row justify-content-evenly h-100 mb-3'>

          <div className='col-2'>
            <img src="/images/maksim-larin-NOpsC3nWTzY-unsplash.jpg" className='img-fluid' />
          </div>

          <div className='col-3 align-self-center'>
            <h2>
              Adidas Ultrawide St 500
            </h2>
          </div>

          <div className='col-6 fs-2'>

            <div className='row w-100 justify-content-center text-center text-uppercase border-danger' style={{borderBottom: "3px solid"}}>
              <div className='col-lg-4'>
                Quantity
              </div>
              <div className='col-lg-3'>
                Price
              </div>
              <div className='col-lg-5 text-start'>
                Total
              </div>
            </div>

            <div className='row w-100 justify-content-center text-center  pt-3 text-uppercase border-danger'>
              <div className='col-lg-4'>
                <InputGroup className="rounded">
                  <Button variant="primary" className="rounded fs-3 fw-bold px-3" id="button-addon2" >
                    -
                  </Button>
                  <Form.Control
                      defaultValue="1"
                      className="text-center text-dark fs-3"
                  />
                  <Button variant="primary" className="rounded fs-3 fw-bold" id="button-addon2">
                    +
                  </Button>
                </InputGroup>
              </div>
              <div className='col-lg-3'>
                $199.99
              </div>
              <div className='col-lg-4 text-start'>
                $199.99
              </div>
              <div className='col-1'>
                <div className="btn btn-danger m-0">X</div>
              </div>
            </div>
          </div>
        </div>

        <div className='row justify-content-evenly align-items-center h-100 mb-3'>

          <div className='col-2'>
            <img src="/images/maksim-larin-NOpsC3nWTzY-unsplash.jpg" className='img-fluid' />
          </div>

          <div className='col-3 align-self-center'>
            <h2>
              Adidas Ultrawide St 500
            </h2>
          </div>

          <div className='col-6 fs-2'>


            <div className='row w-100 justify-content-center text-center  text-uppercase border-danger'>
              <div className='col-lg-4'>
                <InputGroup className="rounded">
                  <Button variant="primary" className="rounded fs-3 fw-bold px-3" id="button-addon2" >
                    -
                  </Button>
                  <Form.Control
                      defaultValue="1"
                      className="text-center text-dark fs-3"
                  />
                  <Button variant="primary" className="rounded fs-3 fw-bold" id="button-addon2">
                    +
                  </Button>
                </InputGroup>
              </div>
              <div className='col-lg-3'>
                $199.99
              </div>
              <div className='col-lg-4 text-start'>
                $199.99
              </div>
              <div className='col-1'>
                <div className="btn btn-danger m-0">X</div>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center mt-5'>
          <h2 className='fs-1 text-uppercase'>
            Total: $999.99  
          </h2> 
          <Link to="/checkout">
            <Button variant="outline-danger" className='fs-1 fw-bold text-dark border border-4 border-dark mt-3 text-uppercase title'>
              Checkout
              <FontAwesomeIcon className='ms-3' icon={faCircleArrowRight} />
            </Button>
          </Link>
        </div>

      </Container>
    </div>
  </>
  )
}

export default Cart
