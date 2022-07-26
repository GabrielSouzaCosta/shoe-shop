import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'

function Checkout() {
  const [zipcode, setZipcode] = useState<string>("")
  const [shippingDetails, setShippingDetails] = useState<any>({})

  function calcularFrete() {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/shipping-details/?zipcode='+zipcode, {
      headers: {
        'Authorization': 'Token '+sessionStorage.getItem('token')
      }
    }) 
    .then(res => setShippingDetails(res.data))
    .then(() => console.log(shippingDetails.MsgErro))
  }

  return (
  <>
  <section className='bg-secondary min-vh-100 text-dark'>
      <NavBar />
      <Container as="section" fluid className="py-4" style={{width: "90%"}}>
        <h1 className='display-3 d-inline-block title mb-5' style={{borderBottom: "2px solid #000000"}}>
          Checkout
        </h1>
        <div className='d-flex'>
          <div className='row h-100  mb-3'>
            <div className='col-3'>
              <img src="/images/maksim-larin-NOpsC3nWTzY-unsplash.jpg" className='img-fluid' />
            </div>

            <div className='col-4 align-self-center'>
              <h2>
                Adidas Ultrawide St 500
              </h2>
              <div className='fs-3'>
                  Quantity: 2
              </div>
              <div className='fs-3'>
                  $199.99
              </div>
            </div>

            <div className='row mt-3'>
              <hr className='col-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <h2 className='title fw-bold fs-1'>
              Shipping
            </h2>
            <div className="col-6 d-flex align-items-center me-auto">
              <Form.Label className='fs-5 mx-2 mb-0'>
                Zipcode:
              </Form.Label>
              <Form.Control 
                value={zipcode} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setZipcode(e.currentTarget.value)} 
                className='w-50 rounded-0 text-dark' 
                placeholder="00000-000"
                required
              />

              <Button onClick={calcularFrete} className='ms-2 title fw-bold fs-5 p-1 px-2'>
                SUBMIT
              </Button>
            </div>
              {(shippingDetails.MsgErro) ?
                <div className='mt-2 fs-5'>{shippingDetails.MsgErro}</div>
              :
                ""
              }
            <div className='row mt-3'>
              <hr className='col-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <div className='fs-1'>
              Total: $399.99
            </div>
          </div>

          <div className='col-5 fs-2' >
              <div className='card p-4 bg-light h-100 w-100 position-relative' style={{bottom: "12%"}}>
                <h2 className='title fw-bold text-center fs-1'>
                  Payment
                </h2>
              <div className='d-flex flex-column'>
                <div>
                  <input type="radio" value="credit-card" name="payment-method" className='form-check-input' required/>
                  <label className='ms-2' htmlFor='credit-card'>
                    Credit Card
                  </label>
                </div>

                <div>
                  <input type="radio" value="credit-card" name="payment-method" className='form-check-input' />
                  <label className='ms-2' htmlFor='boleto'>
                    Paypal
                  </label>
                </div>

                <div>
                  <input type="radio" value="credit-card" name="payment-method" className='form-check-input ' />
                  <label className='ms-2' htmlFor='boleto'>
                    Boleto
                  </label>
                </div>

              </div>
              <hr></hr>
              <div className="row px-4 mb-2">
                <div className="col-12">
                  <Form.Label className='mb-0 mt-3'>
                    Name on Card
                  </Form.Label>
                  <Form.Control />
                </div>
                <div className="col-12">
                  <Form.Label className='mb-0 mt-3'>
                    Card Number
                  </Form.Label>
                  <Form.Control />
                </div>
                <div className='col-6'>
                  <Form.Label className='mb-0 mt-3'>
                    Expire Date
                  </Form.Label>
                  <Form.Control />
                </div>
                <div className="col-6">
                  <Form.Label className='mb-0 mt-3'>
                    CCV
                  </Form.Label>
                  <Form.Control />
                </div>
                <Button variant="dark" className="col-6 mt-4 text-center mx-auto text-uppercase fs-3 title rounded">
                  Confirm Order
                </Button>
              </div>

              </div>
          </div>
        </div>
      </Container>
    </section>

  </>
  )
}

export default Checkout
