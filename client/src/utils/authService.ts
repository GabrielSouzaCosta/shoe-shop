import axios, { AxiosResponse }  from 'axios'

type User = {
  id: number,
  email: string,
  first_name: string
}

const login = async (email: string, password: string) => {
  return await axios.post<AxiosResponse>(import.meta.env.VITE_BACKEND_URL+'/accounts/login/', {"login":email, "password":password})
}

const register = async (email: string, password: string, rePassword: string) => {
  return await axios.post<AxiosResponse>(import.meta.env.VITE_BACKEND_URL+'/accounts/register/', {email, password, "password_confirm": rePassword})
}

function profile () {
  try {
    return axios.get(
      import.meta.env.VITE_BACKEND_URL+'/accounts/profile/',
        {
        headers: {
        "Authorization": "token "+sessionStorage.getItem("token")
          }
        }
    ).then(res => res.data)
  
  } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
  }

}

export const authService = { login, register, profile } ;
