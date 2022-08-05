import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser, profile } from "../../utils/authService"

const token = sessionStorage.getItem('token')
  ? sessionStorage.getItem('token')
  : null

interface UserState {
    loading: boolean
    userInfo: Record<string, unknown>
    token: string | null
    error: any
    success: boolean 
}

const initialState: UserState = {
    loading: false,
    userInfo: {}, // for user object
    token,
    error: null,
    success: false, // for monitoring the registration and login process.
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            sessionStorage.removeItem('token')
            state.token = null
            state.loading = false
            state.userInfo = {}
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true
        })
        .addCase(profile.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
        })
        .addCase(profile.rejected,  (state) => {
            state.loading = false
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.token = payload.token
            state.success = true
        })
        .addCase(loginUser.rejected,  (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        .addCase(registerUser.rejected,  (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
    },      
})

export const { logout } = userSlice.actions

export default userSlice.reducer 