import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: {email: string, password: string}, { rejectWithValue }) => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/accounts/login/', {"login":data.email, "password":data.password})
      sessionStorage.setItem('token', response.data.token)
      return response.data
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(Object.values<[]>(err.response.data)[0])
      } else {
        return rejectWithValue(Object.values<[]>(err.response.data)[0])
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/register', 
  async (data: any, { rejectWithValue })  => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/accounts/register/', {"email": data.email, "password": data.password, "password_confirm": data.rePassword})
      return response.data
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(Object.values<[]>(err.response.data)[0])
      } else {
        return rejectWithValue(Object.values<[]>(err.response.data)[0])
      }
    }
  }
)

export const profile = createAsyncThunk(
  'user/profile',
  async ({ getState, rejectWithValue }: any) => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL+'/accounts/profile/', {
      headers: {
      "Authorization": "token "+getState().user.token
        }}
      )
      return data
    } catch (err: any) {
      if (err.response && err.response.data) {
        return rejectWithValue(Object.values<[]>(err.response.data)[0])
      } else {
        return rejectWithValue(Object.values<[]>(err.response.data)[0])
      }
    }
  }
) 