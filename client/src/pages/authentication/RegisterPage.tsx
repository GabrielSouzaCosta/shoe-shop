import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthCard from "../../components/AuthCard"
import { authService } from '../../utils/authService'

function RegisterPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [rePassword, setRePassword] = useState<string>("")
  const [msg, setMsg] = useState<[]>([])

  const navigate = useNavigate()

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
    authService.register(email, password, rePassword)
    .then((res: any) => {
      navigate('/register-successful/');
    })
    .catch((err: any) => setMsg(Object.values<[]>(err.response.data)[0]))
    console.log(msg)
  }
  
  return (
    
    <div className="bg-register vh-100 bg-danger" >
      <div className="d-flex align-items-center ms-auto justify-content-center h-100" style={{ width: "66.2%", background: "linear-gradient(130deg, #cfb2a5 0%, rgb(255, 255, 255) 100%)" }}>
        <AuthCard 
        type="register" 
        email={email} 
        password={password} 
        rePassword={rePassword}
        msg={msg}
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
