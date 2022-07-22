import AuthCard from "../components/AuthCard"

function RegisterPage() {
  return (
    
    <div className="bg-register vh-100 bg-danger" >
      <div className="d-flex align-items-center ms-auto justify-content-center h-100" style={{ width: "66.2%", background: "linear-gradient(130deg, #cfb2a5 0%, rgb(255, 255, 255) 100%)" }}>
        <AuthCard type={"register"}/>
      </div>
    </div>
  )
}

export default RegisterPage
