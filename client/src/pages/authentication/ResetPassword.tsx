import React, { useState } from 'react'
import getCookie from '../../utils/getCookie';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar';

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [pwdchanged, setPwdChanged] = useState(false);
    const [errors, setErrors] = useState<any>("");

    const csrftoken = getCookie('csrftoken');
    let [searchParams, setSearchParams] = useSearchParams();

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/accounts/reset-password/`, 
        {
            "password": password,
            "user_id": searchParams.get('user_id'),
            "timestamp": searchParams.get('timestamp'),
            "signature": searchParams.get('signature')
        },
      
        {headers: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            "x-csrftoken": csrftoken
        }}
        )
        .then(res => setPwdChanged(true))
        .catch(err =>  setErrors(Object.values(err.response.data)[0]))
    }

  return (
    <div className='bg-danger text-center text-white vh-100'>
      <NavBar />
      <div className='d-flex flex-column align-items-center justify-content-center w-100 h-75'>
        <header className='h-25'>
            <h1 className='display-2 text-light text-uppercase' style={{borderBottom: '1px solid #ffffff'}}>Reset your password</h1>
        </header>
        {(pwdchanged) ?
            <Link to="/login" className='btn btn-primary text-uppercase fs-4'>Log in with new password</Link>
        :
            <section>
                <label className='form-label fs-4'>New password: </label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className='text-dark form-control mb-2 w-100 pb-0' placeholder='*****************' />
                <span>{errors}</span>
                <button onClick={handleSubmit} className='btn btn-dark d-block rounded text-uppercase mx-auto mt-2 fs-4'>Change password</button>
            </section>
        }
      </div>
    </div>
  )
}