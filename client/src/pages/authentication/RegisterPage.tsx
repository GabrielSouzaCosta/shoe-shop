import { useState } from 'react'
import AuthCard from "../../components/AuthCard"
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks'
import { registerUser } from '../../utils/authService'

function RegisterPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rePassword, setRePassword] = useState<string>("")

  const { loading, error, success } = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
}
  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  
  function onRePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRePassword(e.target.value);
  }

  async function handleRegister() {
    dispatch(registerUser({email, password, rePassword}))
  }
  
  return (
    
    <div className="bg-register vh-100 bg-dark" >
      <div className="d-flex align-items-center ms-auto justify-content-center h-100 register-container">
        <AuthCard 
        type="register" 
        email={email} 
        password={password} 
        rePassword={rePassword}
        loading={loading}
        success={success}
        msg={error}
        onEmailChange={onEmailChange} 
        onPasswordChange={onPasswordChange} 
        onRePasswordChange={onRePasswordChange}
        handleRegister={handleRegister}
        />
      </div>
    </div>
  )
}

export default RegisterPage
