import { useState, useEffect } from "react";
import { authService } from './authService'

type User = {
  id: number,
  email: string,
  first_name: string
  is_superuser: boolean
}

export const useAuth = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      setUser(await authService.profile()) 
    }
    getData()
  }, [])

  return user;
};
