import {  faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks'
import { removeProduct, incrementQuantity, decrementQuantity } from '../redux/slices/CartSlice'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'

type ShoesType = {
  id: number
  slug: string,
  images: {
    get_image: string,
    get_thumbnail: string
  }[]
}

function Cart() {
  const { token } = useAppSelector(state => state.user)
  const [total, setTotal] = useState<number>(0)
  const cart = useAppSelector(state => state.cart.items)
  const [suggestedShoes, setSuggestedShoes] = useState<ShoesType[]>([])

  const dispatch = useAppDispatch()

  function handleSetQuantity(product:number, value:number, quantity:number) {
    if (value === 1) {
      dispatch(incrementQuantity(product))
    } else if (quantity > 1) {
      dispatch(decrementQuantity(product))
    }
  }

  function getTotal() {
    let newTotal = 0
    cart.forEach((item) => {
      newTotal += item.price * item.quantity
    })
    setTotal(newTotal)
  }

  useEffect(() => {
    if (cart.length === 0) {
      axios.get(import.meta.env.VITE_BACKEND_URL+'/shoes/')
      .then(res => setSuggestedShoes(res.data) )
    }
  }, [])

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
                <div className='col-9 mx-auto col-lg-2 text-center'>
                  <img src={import.meta.env.VITE_BACKEND_URL_BASE+item.image} className='img-fluid' />
                </div>
                <div className='col-6 mx-auto text-center pt-3 pt-lg-0 col-lg-3 align-self-center'>
                  <h2>
                    {item.name}
                  </h2>
                </div>
                <div className='col-12 col-lg-6 fs-2 mb-4 mb-lg-0'>
                  <div className='d-none d-md-flex row w-100 justify-content-center text-center text-uppercase border-danger' style={{borderBottom: "3px solid"}}>
                    <div className='col-5 col-lg-4'>
                      Quantity
                    </div>
                    <div className='col-3 col-lg-3'>
                      Price
                    </div>
                    <div className='col-3 col-lg-5 text-start'>
                      Total
                    </div>
                  </div>
                  <div className='row w-100 justify-content-center text-center  pt-3 text-uppercase border-danger'>
                    <div className='col-8 col-lg-4'>
                      <InputGroup className="rounded">
                        <Button onClick={() => handleSetQuantity(item.product, -1, item.quantity)} variant="danger" className="rounded fs-3 fw-bold px-3" id="button-addon2" >
                          -
                        </Button>
                        <Form.Control
                            value={item.quantity}
                            className="text-center text-dark fs-3"
                            style={{pointerEvents: "none"}} 
                        />
                        <Button onClick={() => handleSetQuantity(item.product, 1, item.quantity)} variant="danger" className="rounded fs-3 fw-bold" id="button-addon2">
                          +
                        </Button>
                      </InputGroup>
                    </div>
                    <div className='col-4 col-lg-3 align-self-center'>
                      ${item.price}
                    </div>
                    <hr className='d-block d-md-none mt-3 mb-1 col-12'/>
                    <div className='col-10 mt-2 mt-md-0 col-lg-4 text-start'>
                      <span className='d-inline d-md-none'>Total: </span>${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className='col-2 col-lg-1 align-self-center align-self-lg-start'>
                      <Button onClick={() => dispatch(removeProduct(item.product))} variant='danger'>
                        X
                      </Button>
                    </div>
                    <hr className='d-block d-md-none mt-2 mb-1 col-12'/>
                  </div>
                </div>
              </div>  
            )
          })
        :
          <div className='h-100'>
            <div className='fs-1'>No products on your Cart...</div>
            <h3 className='fs-1 mt-5 fw-bold text-center text-uppercase title'>These may be of your interest</h3>
            <div className="row justify-content-center align-items-center">
              <div className="col-6 col-md-4 col-lg-3 mb-2">
                <Link to={'/shoes/'+suggestedShoes[0]?.slug}>
                  <img className='w-100' style={{maxHeight: '500px'}} src={import.meta.env.VITE_BACKEND_URL_BASE+suggestedShoes[0]?.images[0].get_image} />
                </Link>
              </div>
              <div className="col-6 col-md-4 col-lg-3 mb-2">
                <Link to={'/shoes/'+suggestedShoes[1]?.slug}>
                  <img className='w-100' style={{maxHeight: '500px'}} src={import.meta.env.VITE_BACKEND_URL_BASE+suggestedShoes[1]?.images[0].get_image} />
                </Link>
              </div>
              <div className="col-6 col-md-4 col-lg-3">
                <Link to={'/shoes/'+suggestedShoes[0]?.slug}>
                  <img className='w-100' style={{maxHeight: '500px'}} src={import.meta.env.VITE_BACKEND_URL_BASE+suggestedShoes[0]?.images[1]?.get_image} />
                </Link>
              </div>
            </div>  
          </div>
        }
        
        

        <div className='text-center mt-5'>
          <h2 className='fs-1 text-uppercase'>
            Total: ${total.toFixed(2)}
          </h2> 
          {cart.length > 0?
            <Link to={token ? "/checkout": "/login"}>
              <Button variant="outline-danger" className='fs-1 fw-bold text-dark border border-4 border-dark mt-3 text-uppercase title'>
                Checkout
                <FontAwesomeIcon className='ms-3' icon={faCircleArrowRight} />
              </Button>
            </Link>
          :
            ""
          }
        </div>

      </Container>
    </div>
    <Footer />
  </>
  )
}

export default Cart
