import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import getCookie from '../utils/getCookie'

function Boleto() {
  const navigate = useNavigate()

  function handleBoletoPayment() {
    axios.post(import.meta.env.VITE_BACKEND_URL+'/boleto/', {name: "Gabriel Souza Costa"}, {
      headers: {
        'Authorization': 'Token '+sessionStorage.getItem('token'),
        'x-csrftoken': getCookie("csrftoken")
    }
    })
    .then(res => {
      if (res.status === 200) {
        navigate('/payment-success', {state: {boleto: res.data, method: 2} })
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