import axios from "axios"
import { useEffect, useState } from "react"

function UsersAdmin () {
  const [users, setUsers] = useState([])

  console.log(users)

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL+'/users/', {
      headers: {
        "Authorization": "Token "+sessionStorage.getItem("token")
        }
    })
    .then(res => setUsers(res.data))
  }, [])

  return (
  <>
    <h1 className='text-center title pt-5'>
      Users
    </h1>
    {users.map((user: any) => {
        return (
          <div className='row mx-auto justify-content-center fs-5 mt-1'>
            <div className='col-4 bg-light border'>
              Email: {user.email}
            </div>
            <div className='col-2 bg-light border title'>
              Name: {user.name? `${user.name} ${user.last_name}` : "not defined"}
            </div>
            <div className='col-4 bg-light border'>
              Address: {user.account_adress? user.account_adress : "not defined"}
            </div>
          </div>
        )
      })
      }
  </>
  ) 
}

export default UsersAdmin
