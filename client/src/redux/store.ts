import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/CartSlice'
import userReducer from './slices/UserSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {products: ProductsState}
export type AppDispatch = typeof store.dispatch

export default store