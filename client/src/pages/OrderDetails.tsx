import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAppSelector } from '../redux/hooks/hooks'
import { Link } from 'react-router-dom'

interface Order {
    id: number | undefined
    payment_id: string
    payment_method: string
    ordered_date: string
    received: boolean | undefined
    being_delivered: boolean | undefined
    paid: boolean | undefined
    items: any
    amount: number
}

function OrderDetails() {
  const [order, setOrder] = useState<Order>({
      id: undefined,
      payment_id: '',
      payment_method: '',
      ordered_date: '',
      received: undefined,
      being_delivered: undefined,
      paid: undefined,
      items: [],
      amount: 0
  })
  const { token } = useAppSelector(state => state.user)
  const { id } = useParams()

  console.log(order)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/${id}/`, {
        headers: {
            'Authorization': 'Token '+token
        }
    })
    .then(res => setOrder(res.data))
  }, [])


  return (
    <div className='min-vh-100 bg-secondary text-dark'>
     <NavBar />
     <div className='container'>
        <header>
            <h1 className='text-uppercase text-center pt-3'>
                Order Nº {order.payment_id}
            </h1>
            <h2>
                Ordered in: {order.ordered_date.substring(0,10)}
            </h2>
            <h3>
                Status: {order.received? 'Received' : ''} {order.being_delivered? 'On the way' : ''} {order.paid? '': 'To be paid'}
            </h3>
            <h4 className='pb-2' style={{borderBottom: '1px solid #000000'}}>
                Payment Method: {order.payment_method.split('_').join(' ')}
            </h4>
        </header>
            {order.items?.map((item: any) => {
                return (
                <div className='row align-items-center pb-2'>
                    <div className='col-4 col-md-3'>
                        <Link to={'/shoes/'+item.product.slug}>
                            <img className='w-100' src={import.meta.env.VITE_BACKEND_URL_BASE+item.product.images[0]?.get_thumbnail} />
                        </Link>
                    </div>
                    <div className='col-8 col-md-9'>
                        <h2>
                            {item.product.name}
                        </h2>
                        <h3>
                            {item.quantity} x ${item.product.price}
                        </h3>
                        <h3>
                            Total: ${item.get_final_price}
                        </h3>
                    </div> 
                    <hr className='mt-3'></hr>
                </div>
                )
            })}
            <div className='fs-1 pb-4'>TOTAL: ${order.amount.toFixed(2)}</div>
     </div>
    </div>
  )
}

export default OrderDetails