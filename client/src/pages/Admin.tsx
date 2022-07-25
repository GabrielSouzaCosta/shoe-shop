import { faEllipsisVertical, faHome, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Container, Form, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import ProductsAdmin from '../components/admin/ProductsAdmin'
import UsersAdmin from '../components/admin/UsersAdmin'
import CouponsAdmin from '../components/admin/CouponsAdmin'

const options = [
  <ProductsAdmin />,
  <CouponsAdmin />,
  <UsersAdmin />
]

function Admin() {
  const [showNav, setShowNav] = useState<boolean>(true)
  const [option, setOption] = useState<number>(0)

  return (
  <>
    <NavBar />
    <Container fluid className='vh-100 min-vh-100 bg-secondary'>
      <div className='row h-100 text-dark'>
          {(showNav)?
          <div className='col-2 bg-light'>
            <h1 className='text-center pt-2'>
              Admin Dashboard
            </h1>
            <Nav defaultActiveKey="/home" className="flex-column justify-content-center h-25 text-uppercase title">
              <Nav.Item className='btn btn-primary fs-4 mb-1' onClick={()=>setOption(0)}>Products</Nav.Item>
              <Nav.Item className='btn btn-dark fs-4 mb-1' onClick={()=>setOption(1)}>Coupons</Nav.Item>
              <Nav.Item className='btn btn-danger fs-4 mb-1' onClick={()=>setOption(2)}>Users</Nav.Item>
              <Link to="/" className='btn btn-warning text-white fs-4 my-1  align-self-end'>
                <FontAwesomeIcon icon={faHome}/>
              </Link>
            </Nav>
          </div>
          :
            ""
          }
    
        <div className={showNav? 'col-10': 'col-12'+'ms-auto'}>
          <span className='btn btn-warning position-fixed start-0' onClick={() => setShowNav(!showNav)}>
            {(showNav)?
              <FontAwesomeIcon icon={faXmark} />
            :
              <FontAwesomeIcon icon={faEllipsisVertical}  />
            }
          </span>
          {options[option]}
    
        </div>
      </div>
    </Container>
  </>
  )
}

export default Admin
