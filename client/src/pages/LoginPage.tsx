import AuthCard from "../components/AuthCard"

function LoginPage() {
  return (
    <div className="bg-login bg-dark vh-100">
      <div className="d-flex align-items-center justify-content-center h-100 ms-auto bg-primary" style={{width: "59.5%"}}>
        <AuthCard type={"login"}/>
      </div>
    </div>
  )
}

export default LoginPage
