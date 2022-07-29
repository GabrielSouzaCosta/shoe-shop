import {  faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks'
import { removeProduct, incrementQuantity, decrementQuantity } from '../redux/slices/CartSlice'
import { useEffect, useState } from 'react'

type CartItem = {
  price: number,
  quantity: number
}

function Cart() {
  const [total, setTotal] = useState<number>(0)
  const cart = useAppSelector(state => state.cart.items)
  const dispatch = useAppDispatch()

  function getTotal() {
    let newTotal = 0
    cart.forEach((item) => {
      newTotal += item.price * item.quantity
    })
    setTotal(newTotal)
  }

  useEffect(() => {
    getTotal();
  }, [cart])

  return (
  <>
    <NavBar />
    <div className='bg-secondary min-vh-100 text-dark'>
      <Container as="section" fluid className="py-4" style={{width: "90%"}}>
        <h1 className='display-3 d-inline-block title mb-5' style={{borderBottom: "2px solid #000000"}}>
          Shopping Cart
        </h1>
        
        {(cart.length > 0)?
          cart.map((item) => {
            return (
              <div className='row justify-content-evenly h-100 mb-3'>
                <div className='col-2'>
                  <img src={import.meta.env.VITE_BACKEND_URL_BASE+item.image} className='img-fluid' />
                </div>
                <div className='col-3 align-self-center'>
                  <h2>
                    {item.name}
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
                        <Button onClick={() => dispatch(decrementQuantity(item.id))} variant="primary" className="rounded fs-3 fw-bold px-3" id="button-addon2" >
                          -
                        </Button>
                        <Form.Control
                            value={item.quantity}
                            className="text-center text-dark fs-3"
                        />
                        <Button onClick={() => dispatch(incrementQuantity(item.id))} variant="primary" className="rounded fs-3 fw-bold" id="button-addon2">
                          +
                        </Button>
                      </InputGroup>
                    </div>
                    <div className='col-lg-3'>
                      ${item.price}
                    </div>
                    <div className='col-lg-4 text-start'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className='col-1'>
                      <Button onClick={() => dispatch(removeProduct(item.id))} variant='danger'>
                        X
                      </Button>
                    </div>
                  </div>
                </div>
              </div>  
            )
          })
        :
          <div className='h-100'>
            <div className='fs-1'>No products on your Cart...</div>
            <h3 className='fs-1 mt-5 fw-bold text-center text-uppercase title'>These may be of your interest</h3>
          </div>
        }
        
        

        <div className='text-center mt-5'>
          <h2 className='fs-1 text-uppercase'>
            Total: ${total.toFixed(2)}
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
