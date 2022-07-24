import axios from 'axios'

const login = async (email, pwd) => {
  return await axios.post(import.meta.env.VITE_BACKEND_URL+'/accounts/login/', {"login":email, "password":pwd})
}


export const authService = { login } ;
