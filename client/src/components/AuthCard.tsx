import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useNavigate } from 'react-router-dom'

type Props = {
  type: string,
  email: string,
  password: string,
  re_password?: string,
  msg: [], 
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleLogin? : () => void
}

const AuthCard = ({ type, email, password, re_password, msg, onEmailChange, onPasswordChange, handleLogin }: Props) =>
  (
    <div className="card w-75 pb-3">
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
                <Form.Control id="re-email" type="password" className="border border-2 border-dark mb-1" placeholder="repeatyourpassword..."/>
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
              <Button variant="dark" className="rounded text-uppercase fs-2 brand px-4">
                Sign up
              </Button>
            :
              <div className="d-flex flex-column align-items-center">
                <Button onClick={handleLogin} className="rounded text-uppercase fs-2 brand px-4 mb-2">
                  Sign in
                </Button>
                <Link to="forgot-password">
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


export default AuthCard
