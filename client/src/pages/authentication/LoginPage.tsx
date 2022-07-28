import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthCard from "../../components/AuthCard"
import { authService }from '../../utils/authService'
import { useAuth } from "../../utils/useAuth"

function LoginPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [msg, setMsg] = useState<[]>([])

  const navigate = useNavigate()

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
}
  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    authService.login(email, password)
    .then((res: any) => {
      sessionStorage.setItem('token', res.data.token);
      navigate('/');
    })
    .catch((err: any) => setMsg(Object.values<[]>(err.response.data)[0]))
    console.log(msg)
  }

  return (
    <div className="bg-login bg-dark vh-100">
      <div className="d-flex align-items-center justify-content-center h-100 ms-auto login-container">
        <AuthCard type={"login"} 
        email={email} 
        password={password} 
        onEmailChange={onEmailChange} 
        onPasswordChange={onPasswordChange} 
        handleLogin={handleLogin} 
        msg={msg} 
        />
      </div>
    </div>
  )

}

export default LoginPage
