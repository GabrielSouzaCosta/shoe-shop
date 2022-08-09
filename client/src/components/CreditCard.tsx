import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import getCookie from '../utils/getCookie'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks'
import { clearCart } from '../redux/slices/CartSlice'

interface Shipping {
    shippingMethod: {
        method: string
        value: number
    }
}

interface Card {
    name: string
    number: string
    month: string
    year: string
    ccv: string
}

function range(start:number, end:number) {
  return Array.from({ length: end - start + 1 }, (_, i) => i+1)
}

function CreditCard(
    {shippingMethod}: Shipping
) {
  const items = useAppSelector(state => state.cart.items)
  const [disabled, setDisabled] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [card, setCard] = useState<Card>({
      name: "",
      number: "",
      month: "1",
      year: "2022",
      ccv: ""
  })
  const months = range(1,12);
  const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handlePurchase(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDisabled(true)

    if (shippingMethod.method) {
        setErrorMsg('')
        await axios.post(import.meta.env.VITE_BACKEND_URL+'/credit-card/', {...card, items, payment_method: 'CREDIT_CARD'}, {
            headers: {
                'Authorization': 'Token '+sessionStorage.getItem('token'),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                'x-csrftoken': getCookie("csrftoken")
            }
        })
        .then(res => {
            dispatch(clearCart())
            navigate('/payment-success', {state: {creditCard: res.data, method: 0}})
        })
        .catch(err => console.log(err))
        setDisabled(false)
    } else {
        setErrorMsg('You need to select a shipping method first.')
        setDisabled(false)
    }
  }
  
  return (
    <Form onSubmit={handlePurchase} className="row px-4 mb-2">
        <div className="col-12">
            <Form.Label className='mb-0 mt-3'>
            Name on Card
            </Form.Label>
            <Form.Control 
            className='text-dark' 
            value={card.name} 
            onChange={(e) => setCard({...card, name: e.currentTarget.value})} 
            required
            />
        </div>
        
        <div className="col-12 mb-3">
            <Form.Label className='mb-0 mt-3'>
            Card Number
            </Form.Label>
            <Form.Control 
            className='text-dark' 
            value={card.number} 
            onChange={(e) => setCard({...card, number: e.currentTarget.value})} 
            required
            />
        </div>

        
        <div className='col-7'>
            <div className="row w-100">
                <Form.Label className='mb-0'>
                    Expiration Date
                </Form.Label>
                <Form.Select 
                aria-label="month" 
                className='w-25 ms-2 me-2 text-dark' 
                value={card.month} 
                onChange={(e) => setCard({...card, month: e.currentTarget.value})} 
                required
                >
                    {months.map((i:number) =>
                    (
                    <option className='text-dark' value={i}>{i}</option>
                    )
                    )}
                </Form.Select>
                <Form.Select 
                aria-label="year" 
                className='w-50 text-dark' 
                value={card.year} 
                onChange={(e) => setCard({...card, year: e.currentTarget.value})}
                required 
                >
                    {years.map((i:number) =>
                    (
                    <option className='text-dark' value={i}>{i}</option>
                    )
                    )}
                </Form.Select>
            </div>
        </div>

        <div className="col-5">
            <Form.Label className='mb-0' >
            CCV
            </Form.Label>
            <Form.Control 
            className='text-dark' 
            value={card.ccv} 
            onChange={(e) => setCard({...card, ccv: e.currentTarget.value})}
            required
            />
        </div>
        <div className='text-muted text-center'>
            {errorMsg}
        </div>
        <Button type="submit" disabled={disabled} variant="dark" className="col-6 mt-4 text-center mx-auto text-uppercase fs-3 title rounded">
            {disabled ? 'Loading..' : 'Confirm Order'}
        </Button>
    </Form>
  )
}

export default CreditCard