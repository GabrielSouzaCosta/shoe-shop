import React, { useState } from 'react'

type Props = {
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void,
    isLoading: boolean
}

function SendEmailForm({
    handleSubmit,
    isLoading,
}: Props) 

{
    const [email, setEmail] = useState<string>("");
  
    return (
    <>
      <header>
        <h1>
          Forgot your Password?
        </h1>
      </header>
      <section>
        <p className='fs-5' >Enter your email adress and we'll be send you a link to reset your password</p>
        <div className='d-flex justify-content-center'>
          <label htmlFor='email' className='fs-3 me-2'>Email:</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className='form-control w-50 text-dark' placeholder='e.g., bestbakeryinworld@gmail.com...'/>
        </div>
        {(isLoading === false) ?
          <button onClick={(e) => handleSubmit(email)} className="btn btn-secondary mt-2 text-uppercase fs-4" style={{borderRadius: "30px"}}>Submit</button>
        :
          <button className="btn btn-secondary mt-2 text-uppercase fs-4" style={{borderRadius: "30px"}}>Sending email...</button>
        }
      </section>
    </>
    )
}

export default SendEmailForm