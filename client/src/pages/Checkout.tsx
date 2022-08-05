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

type Coupon = {
  code: string,
  amount: number,
}

type Item = {
  id: number
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
  const [zipcode, setZipcode] = useState<string>("")
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon>({code: "", amount: 0})
  const [shippingDetails, setShippingDetails] = useState<ShippingTypes[]>([])
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>({
    method: "",
    value: 0
  })
  const [paymentMethod, setPaymentMethod] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const paymentMethods = [
    <CreditCard />,
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: "BRL" }}>
      <Toaster />
      <Paypal quantity={cart.length} value={"100.00"}/>
    </PayPalScriptProvider>,
    <Boleto />
  ]

  function getTotal() {
    let total = 0;
    cart.forEach((item: Item) => {
      total += item.price * item.quantity
    })
    if (appliedCoupon.amount) {
      total *= (100 - appliedCoupon.amount) / 100
    }
    return total
  }  
  
  async function calcularFrete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (zipcode.length === 9) {
      setLoading(true)
      await axios.get<ShippingResponse>(import.meta.env.VITE_BACKEND_URL+'/shipping-details/?zipcode='+zipcode, {
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

  function handleZipcodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value.length === 5) {
      setZipcode(e.currentTarget.value+'-')
    } else {
      setZipcode(e.currentTarget.value)
    }
  }


  function applyCoupon(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const findCoupon = coupons.find(({code}) => code === appliedCoupon.code)
    if (findCoupon) {
      setAppliedCoupon(findCoupon)
    }
  }

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/coupons/').then(
      res => setCoupons(res.data)
    )
  }, [])

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
              <div className='col-md-4 px-0 col-lg-2'>
                <Form.Control
                value={appliedCoupon.code}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setAppliedCoupon({...appliedCoupon, code: e.currentTarget.value.toUpperCase()})}
                placeholder='e.g SHOES10'
                className='border rounded-0 text-dark'/>
              </div>
              <div className='col-md-4 ms-1 px-0 col-lg-2'>
                <Button type="submit" variant='warning text-white'>
                  Apply
                </Button>
              </div>
              <div className='d-block mt-3 text-uppercase title'>
                <span className='fw-bold fs-5'>Applicable coupons</span>
              {coupons?.map((coupon) => 
                <div className='mt-1 col-2'>
                  <div className=' bg-light p-2'>
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
 
            <Form onSubmit={calcularFrete} className="row align-items-center" >
              <Form.Label className='col-auto fs-5 mx-1 pe-1 mb-2'>
                Zipcode:
              </Form.Label>
              <div className='col-md-4 px-0 col-lg-2'>
                <Form.Control
                  value={zipcode}
                  onChange={handleZipcodeChange}
                  className='border-0 rounded-pill text-dark mb-2'
                  placeholder="00000-000"
                  required
                />
              </div>
              
              {loading ? 
              <Spinner animation="border" role="status" className='ms-2 mb-md-2' /> 
              : 
              <Button className='col-auto ms-2 mb-md-2 rounded title fw-bold fs-5 p-1 px-2'>
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

            {(shippingDetails[0]) ?
              <div className='mt-2 fs-5'>{shippingDetails[0].MsgErro}</div>
            :
              ""
            }
            <div className='row mt-3'>
              <hr className='col-10' style={{border: "2px solid #000000"}}></hr>
            </div>
            <div className='fs-1'>
              Total: ${getTotal().toFixed(2)} + ${shippingMethod.value.toFixed(2)}(shipping) {appliedCoupon.amount? `- %${appliedCoupon.amount}`: '' } = ${(getTotal() + shippingMethod.value).toFixed(2)}
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
