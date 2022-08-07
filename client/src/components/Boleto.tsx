import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks'
import { clearCart } from '../redux/slices/CartSlice'
import getCookie from '../utils/getCookie'

function Boleto() {
  const items = useAppSelector(state => state.cart.items)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleBoletoPayment() {
    const csrftoken = getCookie("csrftoken")
    axios.post(import.meta.env.VITE_BACKEND_URL+'/boleto/', {name: "Gabriel Souza Costa", payment_method: 'BOLETO', items}, {
      headers: {
        'Authorization': 'Token '+sessionStorage.getItem('token'),
        'x-csrftoken': csrftoken
    }
    })
    .then(res => {
      if (res.status === 201) {
        navigate('/payment-success', {state: {boleto: res.data, method: 2} })
        dispatch(clearCart())
      }
    })
  }

  return (
    <div>
        <h3>You will be able to view or print the slip after completing the order. The expiration date is 4 calendar days after the order is completed. After this date, it will expire.</h3>
        <div className="text-center">
            <Button onClick={handleBoletoPayment} variant="warning" className='text-uppercase fs-4 rounded text-center title text-white'>
                Confirm Order
            </Button>
        </div>
    </div>
  )
}

export default Boleto