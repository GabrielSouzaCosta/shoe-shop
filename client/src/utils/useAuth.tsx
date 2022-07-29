import { useState, useEffect } from "react";
import { authService } from './authService'

export const useAuth = () => {
  const [user, setUser] = useState({});

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
