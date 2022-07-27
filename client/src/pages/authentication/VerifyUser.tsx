import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import getCookie from '../../utils/getCookie';

function VerifyUser() {
    const [msg, setMsg] = useState("");
    const csrftoken = getCookie('csrftoken');
    let [searchParams, setSearchParams] = useSearchParams();
  
    useEffect(() => {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/accounts/verify-registration/`, 
        {
        "user_id": searchParams.get('user_id'),
        "timestamp": searchParams.get('timestamp'),
        "signature": searchParams.get('signature')
        },
        {headers: {
        "x-csrftoken": csrftoken
        }}
      )
      .then(res => { 
        if (res.status === 200) {
        setMsg("Your account was successfully verified! ")
        } else {
        setMsg("Your link is invalid or your account was already verified.")
          }
        }
      )
      .catch(err => setMsg("Your link is invalid or your account was already verified."))
    }, [])  
  
    return (
      <div className='bg-dark text-center text-white'>
        <div className='d-flex flex-column align-items-center justify-content-center w-100 vh-100'>
          <h1>{msg}</h1>
          <Link className='btn btn-outline-primary fs-2 text-uppercase title mt-4' to="/">
            Go to Breathe Shoes
          </Link>
        </div>
      </div>
    )
}

export default VerifyUser