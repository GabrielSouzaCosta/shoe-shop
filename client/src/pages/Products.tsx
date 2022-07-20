import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Container } from 'react-bootstrap'

function Products() {
  return (
  <>
    <NavBar />
    <div className='bg-secondary vh-100 min-vh-100'>
      <Container className='h-100' fluid>
        <div className='row justify-content-evenly'>
          <div className='category-card-2'>

          </div>
          <div className='category-card-2'>

          </div>
        </div>
      </Container>
    </div>
    <Footer />
  </>
  )
}

export default Products
