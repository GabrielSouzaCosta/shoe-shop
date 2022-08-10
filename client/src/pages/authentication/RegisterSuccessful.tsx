import React from 'react'
import NavBar from '../../components/NavBar'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/Footer'

function RegisterSuccessful() {
  return (
    <>
      <NavBar />
      <div className='vh-100 bg-dark text-center text-white'>
          <div className="container h-100">
            <div className='d-flex flex-column align-items-center justify-content-center w-100 h-75'>
            <h1 className='text-uppercase'>Register Success!</h1>
            <h2 className='mt-2'>An validation email was sent to your email in order to activate your account.</h2>
            <h3 className='mt-2'><u>If you already activated it </u></h3>
            <FontAwesomeIcon className='fs-1' icon={faArrowDown} />
            <Link to="/login" className='btn btn-warning text-white text-uppercase fs-3 mt-3'>Log in</Link>
            </div>
          </div>
      <Footer />
      </div>
    </>
  )
}

export default RegisterSuccessful