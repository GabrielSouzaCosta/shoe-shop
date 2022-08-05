import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    userInfo: {}, // for user object
    error: null,
    success: false, // for monitoring the registration process.
  }

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    }
})



export default userSlice.reducer 