import { useState, useEffect } from "react";
import { authService } from './authService'

interface User {
  email: string
  first_name: string
  id?: string
  is_active?: boolean
  is_staff?: boolean
  is_superuser?: boolean
}

export const useAuth = () => {
  const [user, setUser] = useState<User>({
    email: "",
    first_name: "Anonymous User",
    id: undefined,
    is_active: undefined,
    is_staff: undefined,
    is_superuser: undefined
  });

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const getData = async () => {
        setUser(await authService.profile()) 
      }
      getData()
    }
  }, [])

  return user;
};
