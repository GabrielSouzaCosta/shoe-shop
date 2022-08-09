import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import NavBar from '../components/NavBar'
import { Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

interface Payment {
  method: number
}

interface CreditCardInterface {
  creditCard: {
    id: string
    amount: {
      value: number
    }
  }
}

interface PaypalInterface {
  paypal: Record<string, unknown>
}

interface BoletoInterface {
  boleto: {
    payment_method: {
      boleto: {
        id: string
        due_date: string
        barcode: string
      }
    }
  }
}

function CreditCardMessage() {
  const location = useLocation()
  const state = location.state as CreditCardInterface


  return (
  <>
    <h2>Credit card purchase approved in the value of ${state.creditCard.amount.value.toFixed(2)}</h2>
    <h2 className='title my-2'>Order number: {state.creditCard.id}</h2>
  </>
  )
}


function PaypalMessage() {
  const location = useLocation()
  const state = location.state as PaypalInterface

  console.log(state.paypal)

  return (
  <>
    <h2 className='title my-2'>Order number:</h2>
  </>
  )
}

function BoletoMessage() {
  const location = useLocation()
  const state = location.state as BoletoInterface


  return (
  <>
    <h2 className='title my-2'>Order number: {state.boleto.payment_method.boleto.id}</h2>
    <h3 className='fw-normal mb-4'>Okay, now you just need to pay your ticket.            
    </h3>
    <h4>
      Code in order to pay the ticket:
    </h4>
    <div>
    {state.boleto.payment_method.boleto.barcode}
    </div>
    <p className='text-start'>
      Due date: {state.boleto.payment_method.boleto.due_date}
    </p>
  </>
  )
}

const messages = [
  <CreditCardMessage />,
  <PaypalMessage />,
  <BoletoMessage />
]

function PaymentSuccess() {
  const location = useLocation()
  const state = location.state as Payment

  return (
    <>
        <div className='vh-100 bg-light'>
        <NavBar />
          <div className='text-dark d-flex flex-column align-items-center justify-content-center h-75'>
            <FontAwesomeIcon className='fs-1 text-success' icon={faCircleCheck} />
            <h1 className='text-uppercase my-3' style={{borderBottom: '1px solid #000000'}}>Payment Success</h1>
            {messages[state.method]}
            <Link to='/profile' className='d-inline'>
              <Button variant='success' className='title fw-bold rounded fs-3 text-uppercase'>
                  My orders
              </Button>
            </Link>
          </div>
        </div>
    </>
  )
}

export default PaymentSuccess