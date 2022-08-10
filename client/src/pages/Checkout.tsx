import React, { ChangeEvent, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import axios, { AxiosResponse } from 'axios'
import { useAppSelector } from '../redux/hooks/hooks'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Paypal from '../components/Paypal'
import { Toaster } from 'react-hot-toast';
import CreditCard from '../components/CreditCard'
import Boleto from '../components/Boleto'
import { useNavigate } from 'react-router-dom'
import { setConstantValue } from 'typescript'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

type ShippingTypes = {
  Codigo?: number
  Valor?: string
  PrazoEntrega?: number
  MsgErro?: string
}

interface Shipping {
  email: string
  name: string
  address: string
  city: string
  phone: string
  zipcode: string
  method: string
  value: number
}

type Coupon = {
  code: string,
  amount: number,
  valid?: boolean
}

type Item = {
  name: string
  image: string
  price: number
  quantity: number
}

interface ShippingResponse extends AxiosResponse {
    sedex: Record<string, unknown>
    pac: Record<string, unknown>
}

function Checkout() {
  const cart = useAppSelector(state => state.cart.items)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon>({code: "", amount: 0})

  const [shippingDetails, setShippingDetails] = useState<ShippingTypes[]>([])
  const [shippingInfo, setShippingInfo] = useState<Shipping>({
    email: "",
    name: "",
    address: "",
    city: "",
    phone: "",
    zipcode: "",
    method: "",
    value: 0
  })

  const [paymentMethod, setPaymentMethod] = useState<number>(0)
  const [baseValue, setBaseValue] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const [errorMsg, setErrorMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const paymentMethods = [
    <CreditCard shippingInfo={shippingInfo} />,
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "BRL" }}>
      <Toaster />
      <Paypal shippingInfo={shippingInfo}/>
    </PayPalScriptProvider>,
    <Boleto shippingInfo={shippingInfo}/>
  ]  
  
  async function calcularFrete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (shippingInfo.zipcode.length === 9) {
      setLoading(true)
      await axios.get<ShippingResponse>(import.meta.env.VITE_BACKEND_URL+'/shipping-details/?zipcode='+shippingInfo.zipcode, {
        headers: {
          'Authorization': 'Token '+sessionStorage.getItem('token')
        }
      }) 
      .then(res => {
        setShippingDetails([res.data.sedex, res.data.pac]),
        setErrorMsg("")
      })
      .catch(err => console.log(err.response.data))
      setLoading(false)
    } else {
      setErrorMsg("Invalid Zipcode, try again")
    }
  }

  function applyCoupon(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const findCoupon = coupons.find(({code}) => code === appliedCoupon.code)
    if (findCoupon) {
      setAppliedCoupon({...findCoupon, valid: true})
    } else {
      setAppliedCoupon({...appliedCoupon, valid:false})
    }
  }

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/')
    }
    axios.get(import.meta.env.VITE_BACKEND_URL+'/coupons/').then(
      res => setCoupons(res.data)
    )
  }, [])

  useEffect(() => {
    let total = 0;

    cart.forEach((item: Item) => {
      total += item.price * item.quantity
    })
    setBaseValue(total)

    if (shippingInfo.value) {
      total += shippingInfo.value
    }
    if (appliedCoupon.amount) {
      total *= (100 - appliedCoupon.amount) / 100
    }

    setTotal(total)
  }, [appliedCoupon, shippingInfo])

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
              Coupons
            </h2>
            <Form onSubmit={applyCoupon} className="row align-items-center">
              <div className='col-md-4 px-0 col-lg-2 mb-1 mb-md-0'>
                <Form.Control
                value={appliedCoupon.code}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAppliedCoupon({...appliedCoupon, code: e.currentTarget.value.toUpperCase()})}
                placeholder='e.g SHOES10'
                className='border rounded-0 text-dark'
                required
                />
              </div>
              <div className='col-md-4 ms-1 px-0 col-lg-2'>
                <Button type="submit" variant='warning text-white'>
                  Apply
                </Button>
              </div>
              <Form.Text>
                  {appliedCoupon.valid === false ? 'Invalid or expired coupon': ''}
              </Form.Text>
              {(appliedCoupon.valid) ?
              <>
                <div className='fs-5 d-block mt-3 text-uppercase title fw-bold'>
                  Applied coupon
                </div>
                <span className='ms-2 rounded-pill bg-warning text-light col-auto'>
                  {appliedCoupon.code} = discount of %{appliedCoupon.amount}
                </span>
              </>
              :
              ""
              }
              <div className='mt-3 text-uppercase title'>
                <h5 className='fw-bold fs-5'>Valid coupons</h5>
              {coupons?.map((coupon) => 
                <div className='mt-1 mb-2'>
                  <div className='d-inline bg-light p-1'>
                    {coupon.code}
                  </div> 
                </div>
              )
              }
              </div>
            </Form>
            <div className='row mt-3'>
              <hr className='col-lg-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <h2 className='title fw-bold fs-1'>
              Shipping
            </h2>
 
            <Form className="row align-items-center title fw-bold" >
            <div className="row">
              <div className="col-12 mb-1">
                  <Form.Label className='mb-1'>
                    Email Address
                  </Form.Label>
                  <Form.Control
                  className='text-dark mb-1'
                  value={shippingInfo.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo({...shippingInfo, email: e.currentTarget.value})}
                  placeholder='youremail@email.com'
                  required />
              </div>
              <div className="col-12 col-md-6 mb-1">
                <Form.Label className='mb-1'>
                  Full Name
                </Form.Label>
                <Form.Control
                value={shippingInfo.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo({...shippingInfo, name: e.currentTarget.value})}
                className='mb-1 text-dark'
                placeholder='Your name..'
                />
              </div>
              <div className="col-12 col-md-6 mb-1">
                <Form.Label>
                  Address
                </Form.Label>
                <Form.Control
                value={shippingInfo.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo({...shippingInfo, address: e.currentTarget.value})}
                className='mb-1 text-dark'
                placeholder='e.g. Liberty street, 102'
                />
              </div>
              <div className="col-12 col-md-6 mb-1">
                <Form.Label>
                  City
                </Form.Label>
                <Form.Control
                value={shippingInfo.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo({...shippingInfo, city: e.currentTarget.value})}
                className='mb-1 text-dark'
                placeholder='New York..'
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <Form.Label>
                  Phone
                </Form.Label>
                <Form.Control
                className='text-dark'
                value={shippingInfo.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo({...shippingInfo, phone: e.currentTarget.value})}
                placeholder='(xx) xxxxx-xxxx'
                />
              </div>
            </div>
            </Form>
            <Form onSubmit={calcularFrete}>
              <div className='col-11 col-md-4 col-lg-2'>
                <Form.Label className='col-auto fs-5 pe-2 mb-2'>
                  Zipcode:
                </Form.Label>
                <Form.Control
                  value={shippingInfo.zipcode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo({...shippingInfo, zipcode: e.currentTarget.value})}
                  className='border-0 rounded-0 text-dark mb-2'
                  placeholder="00000-000"
                  required
                  />
              </div>
                {loading ? 
                <Spinner animation="border" role="status" className='ms-2 mb-md-2' /> 
                : 
                <Button type="submit" className='col-auto ms-2 mb-md-2 rounded title fw-bold fs-5 p-1 px-2'>
                SUBMIT
                </Button>
                }
            </Form>
              
              {(Object.keys(shippingDetails).length > 0) ? 
              shippingDetails.map((shipping:ShippingTypes, i:number) => {
                const valor = Number(shipping.Valor?.split(',').join('.'))
                return (
                  <div key={'shipping-'+shipping.Codigo} className='form-check row mt-3'>
                    <div className='py-1 title fs-5 bg-light border col-5'>
                      <input 
                      className="form-check-input ms-0" 
                      required value={i === 0 ? "SEDEX":"PAC"} 
                      onChange={ (e) => setShippingInfo({...shippingInfo, method: e.currentTarget.value, value: valor}) } 
                      type="radio" 
                      name="shipping" 
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
            {(shippingDetails[0]) ?
              <div className='mt-2 fs-5'>{shippingDetails[0].MsgErro}</div>
            :
              ""
            }
            <div className='row mt-3'>
              <hr className='col-10 mb-2' style={{border: "2px solid #000000"}}></hr>
            </div>
            <div className='fs-2'>
              Subtotal:  ${ baseValue.toFixed(2) }
            </div>  
            <div className='fs-2'>
              Shipping: ${shippingInfo.value.toFixed(2)}
            </div>
            {(appliedCoupon.amount) ?
              <div className='fs-2'>
                - %{appliedCoupon.amount} discount
              </div>
            :
              ""
            }
            <hr className='col-10 border border-2 my-1 border-dark'/>
            <div className='fs-2'>
              Total: ${total.toFixed(2)}
            </div>

          </div>
          <div className='fs-2 col-12 col-md-10 col-lg-5 py-4 justify-content-center mx-auto' style={{minHeight: "700px"}} >
              <div className='card p-4 bg-light'>
                <h2 className='title fw-bold text-center fs-1'>
                  Payment
                </h2>
              <div className='d-flex flex-column' onChange={(e: ChangeEvent<HTMLInputElement>) => setPaymentMethod(Number(e.target.value))}>
                <div>
                  <input type="radio" defaultChecked value={0} name="payment-method" className='form-check-input' required/>
                  <label className='ms-2' htmlFor='credit-card'>
                    Credit Card
                  </label>
                </div>

                <div>
                  <input type="radio" value={1} name="payment-method" className='form-check-input' />
                  <label className='ms-2' htmlFor='paypal'>
                    Paypal
                  </label>
                </div>

                <div>
                  <input type="radio" value={2} name="payment-method" className='form-check-input ' />
                  <label className='ms-2' htmlFor='boleto'>
                    Boleto
                  </label>
                </div>

              </div>
              <hr></hr>
              {paymentMethods[paymentMethod]}
              </div>
          </div>
        </div>
      </Container>
    </section>

  </>
  )
}

export default Checkout
