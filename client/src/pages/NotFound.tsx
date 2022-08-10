import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

function NotFound() {
  return (
    <div className='min-vh-100 bg-dark text-light text-center'>
        <NavBar />
        <h1 className='display-1'>
            404 Not Found
        </h1>
        <div className='fs-2 text-uppercase title'>
            Sorry, there's nothing to see here
        </div>
        <div className='mt-1'>
            <Link to='/shoes'>
                <Button variant='warning' className='fw-bold text-uppercase'>
                    Back to Safety
                </Button>
            </Link>
        </div>
        <img src='/icons/sad.svg' className='img-fluid' style={{maxHeight: '700px'}}/>
        <Footer />
    </div>
  )
}

export default NotFound