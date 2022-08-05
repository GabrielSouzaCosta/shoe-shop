import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import NavBar from '../components/NavBar'
import { Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'


function CreditCardMessage() {
  const {state} = useLocation()
  console.log(state.creditCard)

  return (
  <>
    <h2>Credit card purchase approved in the value of ${state.creditCard.amount.value.toFixed(2)}</h2>
    <h2 className='title my-2'>Order number: {state.creditCard.id}</h2>
  </>
  )
}


function PaypalMessage() {
  const {state} = useLocation()
  console.log(state.paypal)

  return (
  <>
    <h2 className='title my-2'>Order number:</h2>
  </>
  )
}

function BoletoMessage() {
  const {state} = useLocation()
  console.log(state.boleto)

  return (
  <>
    <h2 className='title my-2'>Order number: {state.boleto.payment_method.boleto.id}</h2>
    <h3 className='fw-normal mb-4'>Pronto, agora falta apenas pagar o seu boleto.             
    </h3>
    <h4>
      Código para pagamento do boleto:
    </h4>
    <div>
    {state.boleto.payment_method.boleto.barcode}
    </div>
    <p className='text-start'>
      Vencimento em: {state.boleto.payment_method.boleto.due_date}
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
  const {state} = useLocation()

  return (
    <>
        <div className='vh-100 bg-light'>
        <NavBar />
          <div className='text-dark d-flex flex-column align-items-center justify-content-center h-75'>
            <FontAwesomeIcon className='fs-1 text-success' icon={faCircleCheck} />
            <h1 className='text-uppercase my-3' style={{borderBottom: '1px solid #000000'}}>Payment Success</h1>
            {messages[state.method]}
            <Link to='/' className='d-inline'>
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