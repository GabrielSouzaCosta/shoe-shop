import axios, { AxiosResponse, HeadersDefaults } from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import getCookie from '../../utils/getCookie';
import SendEmailForm from '../../components/SendEmailForm';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const csrftoken = getCookie('csrftoken');

  function handleSubmit(email: string) {
    setIsLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/accounts/send-reset-password-link/`, {login: email}, {
      headers: {
        "x-csrftoken": csrftoken
      }
    })
    .then(() => {
      setErrors("");
      setEmailSent(true);
    }
    )
    .catch(err => {
      setErrors(Object.values(err.response.data)[0]);
      setIsLoading(false);
    } 
    )
  }

  return (
    <div className='bg-light vh-100'>
      <NavBar />
      <div className='container text-dark h-75'>
        <div className='d-flex flex-column align-items-center justify-content-center text-center h-100'>
          {(!emailSent) ? 
            <SendEmailForm handleSubmit={handleSubmit} isLoading={isLoading} />
          :
          <>
            <h2>
              An link was sent to your email in order to reset your password.
            </h2>
            <Link to="/" className='btn btn-primary rounded-pill text-uppercase fs-4'>Go to homepage</Link>
          </>
          }
          <span className='mt-2'>{errors}</span>
        </div>
      </div>
    </div>
  )
}