import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks'
import { clearCart } from '../redux/slices/CartSlice'
import getCookie from '../utils/getCookie'

interface Shipping {
  shippingMethod: {
      method: string
      value: number
  }
}

function Boleto({shippingMethod}: Shipping) {
  const items = useAppSelector(state => state.cart.items)
  const [disabled, setDisabled] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  async function handleBoletoPayment() {
    const csrftoken = getCookie("csrftoken")
    setDisabled(true)
    if (shippingMethod.method) {
      setErrorMsg('')
      await axios.post(import.meta.env.VITE_BACKEND_URL+'/boleto/', {name: "Gabriel Souza Costa", payment_method: 'BOLETO', items}, {
        headers: {
          'Authorization': 'Token '+sessionStorage.getItem('token'),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'x-csrftoken': csrftoken
        }
      })
      .then((res) => {
        if (res.status === 201) {
          navigate('/payment-success', {state: {boleto: res.data, method: 2} })
          dispatch(clearCart())
        }
      })
      setDisabled(false)
    } else {
      setErrorMsg('You need to select a shipping method first.')
      setDisabled(false)
    }
  }

  return (
    <div>
        <h3>You will be able to view or print the slip after completing the order. The expiration date is 4 calendar days after the order is completed. After this date, it will expire.</h3>
        <div className='text-muted text-center'>
            {errorMsg}
        </div>
        <div className="text-center">
            <Button onClick={handleBoletoPayment} disabled={disabled} variant="warning" className='text-uppercase fs-4 rounded text-center title text-white'>
                {disabled? "Loading.." : "Confirm Order"}
            </Button>
        </div>
    </div>
  )
}

export default Boleto