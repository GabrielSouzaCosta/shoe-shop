import { useState } from "react"
import AuthCard from "../../components/AuthCard"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import { loginUser }from '../../utils/authService'

function LoginPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const { loading, success, error } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
}
  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    dispatch(loginUser({email, password}))
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
        loading={loading}
        success={success}
        msg={error} 
        />
      </div>
    </div>
  )

}

export default LoginPage
