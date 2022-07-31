import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Container, Form } from 'react-bootstrap'
import axios, { AxiosResponse } from 'axios'
import { useAppSelector } from '../redux/hooks/hooks'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Paypal from '../components/Paypal'
import { Toaster } from 'react-hot-toast';

type ShippingTypes = {
  Codigo?: number
  Valor?: string
  PrazoEntrega?: number
  MsgErro?: string
}

type ShippingMethod = {
  method: string
  value: number
}

type Item = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

interface ShippingResponse extends AxiosResponse {
    sedex: {}
    pac: {}
}

function Checkout() {
  const cart = useAppSelector(state => state.cart.items)
  const [zipcode, setZipcode] = useState<string>("")
  const [shippingDetails, setShippingDetails] = useState<ShippingTypes[]>([{}])
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>({
    method: "",
    value: 0
  })
  const [errorMsg, setErrorMsg] = useState<string>("")

  function getTotal() {
    let total = 0;
    cart.forEach((item: Item) => {
      total += item.price * item.quantity
    })
    return total
  }

  function calcularFrete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    zipcode.length === 9 ?
      axios.get<ShippingResponse>(import.meta.env.VITE_BACKEND_URL+'/shipping-details/?zipcode='+zipcode, {
        headers: {
          'Authorization': 'Token '+sessionStorage.getItem('token')
        }
      }) 
      .then(res => setShippingDetails([res.data.sedex, res.data.pac]))
      .then(() => setErrorMsg(""))
    :
      setErrorMsg("Invalid Zipcode, try again")
  }

  function handleZipcodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length === 5) {
      setZipcode(e.currentTarget.value+'-')
    } else {
      setZipcode(e.currentTarget.value)
    }
  }

  return (
  <>
  <section className='bg-secondary min-vh-100 text-dark'>
      <NavBar />
      <Container as="section" fluid className="py-4" style={{width: "90%"}}>
        <h1 className='display-3 d-inline-block title mb-5' style={{borderBottom: "2px solid #000000"}}>
          Checkout
        </h1>
        <div className='d-flex flex-column'>
          <div className='row mb-3'>
            {cart?.map((item: Item) => {
              return (
                <>
                  <div key={item.name+'col-1'} className='col-5 col-lg-2 mb-2 bg-dark text-center'>
                    <img src={import.meta.env.VITE_BACKEND_URL_BASE+item.image} className='img-fluid text-center' />
                  </div>
  
                  <div key={item.name+'col-2'} className='col-7 col-lg-9 align-self-center mb-2'>
                    <h2 className='m-0'>
                      {item.name}
                    </h2>
                    <div className='fs-3'>
                        Qt: {item.quantity} x ${item.price}
                    </div>
                    <div className='fs-3'>
                        Total: ${(item.quantity * item.price).toFixed(2)}
                    </div>
                  </div>
                </>
              )
            })
            }
           
            <div className='row mt-3'>
              <hr className='col-lg-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <h2 className='title fw-bold fs-1'>
              Shipping
            </h2>
 
            <Form onSubmit={calcularFrete} className="row align-items-center me-auto" >
              <Form.Label className='col-4 col-md-auto fs-5 mx-1 pe-1 mb-2'>
                Zipcode:
              </Form.Label>
              <Form.Control
                value={zipcode}
                onChange={handleZipcodeChange}
                className='w-0 col-6 col-md-2 col-lg-1 border-0 rounded-pill text-dark mb-2'
                placeholder="00000-000"
                required
              />
              <Button type="submit" className='col-6 col-md-2 col-lg-1 ms-2 mb-md-2 rounded title fw-bold fs-5 p-1 px-2'>
                SUBMIT
              </Button>
            </Form>
              {(shippingDetails) ? 
              shippingDetails.map((shipping:ShippingTypes, i:number) => {
                const valor = Number(shipping.Valor?.split(',').join('.'))
                return (
                  <div key={'shipping-'+shipping.Codigo} className='form-check row mt-3'>
                    <div className='py-1 title fs-5 bg-light border col-6'>
                      <input 
                      className="form-check-input ms-0" 
                      required value={i === 0 ? "SEDEX":"PAC"} 
                      onChange={ (e) => setShippingMethod({method: e.currentTarget.value, value: valor}) } 
                      type="radio" 
                      name="shippingMethod" 
                      />
                      <label className='ms-2'>
                        {i === 0 ? "SEDEX":"PAC"}: ${shipping.Valor} ({shipping.PrazoEntrega} dias úteis)
                      </label>
                    </div>
                  </div>
                  )
                })
              :
                ""
              }
            <div className='fs-5 text-danger ms-2 fw-bolder'>{errorMsg}</div>

            {(shippingDetails[0].MsgErro) ?
              <div className='mt-2 fs-5'>{shippingDetails[0].MsgErro}</div>
            :
              ""
            }
            <div className='row mt-3'>
              <hr className='col-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <div className='fs-1'>
              Total: ${getTotal().toFixed(2)} + ${shippingMethod.value.toFixed(2)}(shipping) = ${(getTotal() + shippingMethod.value).toFixed(2)}
            </div>
          </div>
          <div className='fs-2 col-5 py-4 justify-content-center mx-auto' >
              <div className='card p-4 bg-light h-100 w-100 position-relative' style={{bottom: "12%"}}>
                <h2 className='title fw-bold text-center fs-1'>
                  Payment
                </h2>
              <div className='d-flex flex-column'>
                <div>
                  <input type="radio" defaultChecked={true} value="credit-card" name="payment-method" className='form-check-input' required/>
                  <label className='ms-2' htmlFor='credit-card'>
                    Credit Card
                  </label>
                </div>

                <div>
                  <input type="radio" value="paypal" name="payment-method" className='form-check-input' />
                  <label className='ms-2' htmlFor='boleto'>
                    Paypal
                  </label>
                </div>

                <div>
                  <input type="radio" value="boleto" name="payment-method" className='form-check-input ' />
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
              <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "BRL" }}>
                <Toaster />
                <Paypal quantity={cart.length} value={"100.00"}/>
              </PayPalScriptProvider>

              </div>
          </div>
        </div>
      </Container>
    </section>

  </>
  )
}

export default Checkout
