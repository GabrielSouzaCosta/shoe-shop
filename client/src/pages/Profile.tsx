import { faArrowRight, faArrowRightArrowLeft, faArrowRightLong, faCat, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAppSelector } from '../redux/hooks/hooks'

function Profile() {
  const { userInfo, token } = useAppSelector(state => state.user)
  const [orders, setOrders] = useState([])
  console.log(orders)

  useEffect(() => {
      axios.get(import.meta.env.VITE_BACKEND_URL+'/orders/', {
          headers: {
              'Authorization': 'Token '+token
          }
      })
      .then(res => setOrders(res.data))
  }, [])

  return (
    <div className='min-vh-100 bg-light text-dark'>
        <NavBar />
        <header className='d-flex justify-content-center align-items-center text-center mt-3 position-relative'>
            <FontAwesomeIcon icon={faPerson} className='fs-1 me-2 rounded-circle border border-dark p-2'/>
            <h1 className='title mb-0'>MY PROFILE</h1>
            <h2>

            </h2>
            {userInfo.is_superuser ? 
                <Link to='/administration' className='position-absolute end-0 pe-1'>
                    <Button variant='dark' className=' text-uppercase'>
                        Admin Dashboard
                    </Button>
                </Link>
            :
            ""
            }
        </header>
        <section className='container bg-secondary px-4 pt-3 pb-4 mt-3'>
        <h2 className='text-center title pb-3' style={{borderBottom: '1px solid #000000'}}>
            My Orders
        </h2>
        {orders?.map((order, i) => {
            return (
                <div key={i}>
                    {order.items.map((item) => {
                        return (
                        <>
                            <div className='title fs-3'>
                                Order Nº: {order.payment_id} - Ordered in: {order.ordered_date.substring(0,10)}
                            </div>
                            <div className='fs-4 my-3'>
                                {item.product.name}:
                                ${item.product.price} x {item.quantity > 1? item.quantity + ' units' : item.quantity + ' unit'} 
                                <FontAwesomeIcon className='text-danger mx-2' icon={faArrowRightLong} />
                                Total: ${item.get_final_price}
                            </div>
                            <Link to={'/orders/'+order.id}>
                                <Button variant='dark' className='text-uppercase fw-bold text-white'>
                                    More Details
                                </Button>
                            </Link>
                            <hr></hr>
                        </>
                        )
                        })
                    }
                </div>
            )
        }
        )}
        </section>
    </div>
  )
}

export default Profile