import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Container, Form, ToggleButtonGroup } from 'react-bootstrap'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks/hooks'

interface Shipping {
  Valor: number
}

type ShippingTypes = {
  Valor: number
}

type ShippingMethod = {
  method: string,
  value: number
}

function Checkout() {
  const cart = useAppSelector(state => state.cart.items)
  const [zipcode, setZipcode] = useState<string>("")
  const [shippingDetails, setShippingDetails] = useState<Shipping>([])
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>({
    method: "",
    value: 0
  })
  const [errorMsg, setErrorMsg] = useState<string>("")

  console.log(typeof(shippingMethod.value))
  function getTotal() {
    var total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity
    })
    console.log(typeof(shippingMethod.value))
    return total
  }

  function calcularFrete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    zipcode.length === 9 ?
      axios.get(import.meta.env.VITE_BACKEND_URL+'/shipping-details/?zipcode='+zipcode, {
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
        <div className='d-flex'>
          <div className='row h-100 mb-3'>
            {cart?.map((item) => {
              return (
                <>
                  <div className='col-3 mb-2'>
                    <img src="/images/maksim-larin-NOpsC3nWTzY-unsplash.jpg" className='img-fluid' />
                  </div>
  
                  <div className='col-7 align-self-center mb-2'>
                    <h2>
                      {item.name}
                    </h2>
                    <div className='fs-3'>
                        Quantity: {item.quantity}
                    </div>
                    <div className='fs-3'>
                        ${item.price}
                    </div>
                  </div>
                </>
              )
            })
            }
           
            <div className='row mt-3'>
              <hr className='col-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <h2 className='title fw-bold fs-1'>
              Shipping
            </h2>
 
            <Form onSubmit={calcularFrete} className="col-6 d-flex align-items-center me-auto" >
              <Form.Label className='fs-5 mx-2 mb-0'>
                Zipcode:
              </Form.Label>
              <Form.Control
                value={zipcode}
                onChange={handleZipcodeChange}
                className='w-50 rounded-0 text-dark'
                placeholder="00000-000"
                required
              />
              <Button type="submit" className='ms-2 title fw-bold fs-5 p-1 px-2'>
                SUBMIT
              </Button>
            </Form>
              {(shippingDetails) ? 
              shippingDetails.map((shipping:ShippingTypes, i:number) => {
                let Valor = Number(shipping.Valor.split(',').join('.'))
                return (
                  <div key={'shipping-'+shipping.Codigo} className='form-check row mt-3'>
                    <div className='py-1 title fs-5 bg-light border col-6'>
                      <input 
                      className="form-check-input ms-0" 
                      required value={i === 0 ? "SEDEX":"PAC"} 
                      onChange={ (e) => setShippingMethod({method: e.currentTarget.value, value: Valor}) } 
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

            {(shippingDetails.MsgErro) ?
              <div className='mt-2 fs-5'>{shippingDetails.MsgErro}</div>
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

          <div className='col-5 fs-2' >
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

              </div>
          </div>
        </div>
      </Container>
    </section>

  </>
  )
}

export default Checkout
