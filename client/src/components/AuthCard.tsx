import { Button, Form, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'

type Props = {
  type: string,
  email: string,
  password: string,
  rePassword?: string,
  loading: boolean,
  success: boolean,
  msg: [], 
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onRePasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleLogin? : () => void,
  handleRegister? : () => void
}

const AuthCard = ({ 
  type, 
  email, 
  password, 
  rePassword,
  loading,
  success,
  msg,
  onEmailChange,
  onPasswordChange,
  onRePasswordChange,
  handleLogin,
  handleRegister
  }: Props) => {

    const navigate = useNavigate()
    
    useEffect(() => {
      if (success && handleRegister) navigate('/register-successful')
      else if (success && handleLogin) navigate(-1)
    }, [navigate, success])

    
    return (
      <div className="card col-11 col-md-8 col-lg-7 pb-3" style={{backgroundColor: "#ffffffee"}}>
          <h1 className="title text-center pt-4 text-dark display-2">
            {type}
          </h1>
          <div className="row justify-content-center text-dark">
            <div className="col-8">
              <Form.Label className='fs-3'>Email</Form.Label>
              <Form.Control value={email} onChange={onEmailChange} id="email" className="border border-2 border-dark text-dark" placeholder="youremail@email.com" /> 
            </div>
            <div className="col-8 mt-1">
              <Form.Label htmlFor="email" className="fs-3">
                Password
              </Form.Label>
              <Form.Control type="password" value={password} onChange={onPasswordChange} id="email" className="border border-2 border-dark text-dark" placeholder="yourpassword..."/>
            </div>
            {(type === "register") ? 
              <div className="col-8 mt-1">
                <Form.Label htmlFor="re-email" className="fs-3">
                  Repeat Password
                </Form.Label>
                <Form.Control value={rePassword} onChange={onRePasswordChange} id="re-email" type="password" className="border border-2 border-dark mb-1 text-dark" placeholder="repeatyourpassword..."/>
                <Form.Text id="passwordHelpBlock" className='fs-5'>
                  Your password must be at least 8 characters long
                </Form.Text>
              </div>
            :
              ""
            }
            <div className="text-center mt-2 fs-5">{msg}</div>
            <div className="col-6 text-center pt-3">
            {(type === "register") ?
              <Button onClick={handleRegister} variant="dark" className="rounded text-uppercase fs-2 brand px-4">
                {loading ? "Loading.." : "Sign up"}
              </Button>
            :
              <div className="d-flex flex-column align-items-center">
                <Button onClick={handleLogin} className="rounded text-uppercase fs-2 brand px-4 mb-2">
                  {loading ? <Spinner animation="border" role="status" /> : "Sign in"}
                </Button>
                <Link to="/forgot-password">
                  <Form.Text className="link-danger fs-5">
                      Forgot your password?
                  </Form.Text>
                </Link>
              </div>
            }
            </div>
            <div className="col-12 text-center fs-3">
              or
            </div>
            <div className="col-6 text-center pt-1">
            {(type === "register") ?
              <Link to="/login">
                <Button className="rounded text-uppercase fs-2 brand px-4">
                  Sign in
                </Button>
              </Link>
            :
              <Link to="/register">
                <Button variant="dark" className="rounded text-uppercase fs-2 brand px-4">
                  Sign up
                </Button>
              </Link>
            }
            </div>
          </div>
        </div>
  )
}

  
  export default AuthCard
