import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/CartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {products: ProductsState}
export type AppDispatch = typeof store.dispatch

export default store