import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

function getLocalStorageData() {
    let data = localStorage.getItem('cart')
    if ( data !== null) {
        return JSON.parse(data)
    } else {
        return []
    }
}

interface CartState {
    items: {
        id: number,
        name: string,
        image: string,
        price: number,
        quantity: number
    }
}

const initialState: CartState = {
    items: getLocalStorageData()
  }

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartState['items']>) => {
            // Check if item is already on cartSlice, if true, increment the quantity, if not add to cart normally
            let hasItem = state.items.filter((item:CartState['items']) => {
                if (item.id === action.payload.id) {
                    return item
                }
                return null
            })

            if (hasItem.length > 0) {
                let newData = [...state.items];
                let index = newData.findIndex(item => {
                    return item.id === action.payload.id
                });
                let item = {...newData[index]}
                item.quantity += action.payload.quantity
                newData[index] = item
                localStorage.setItem('cart', JSON.stringify(newData))
                return {items: newData}
            } else {
                let newData = [...state.items, {id: action.payload.id, name: action.payload.name, price: action.payload.price, quantity: action.payload.quantity, image: action.payload.image }]
                localStorage.setItem('cart', JSON.stringify(newData));
                return {items: newData}
            }   
        },

        incrementQuantity: (state, action: PayloadAction<number>) => {
            let newData = [...state.items];
            let index = newData.findIndex(item => {
                return item.id === action.payload
            });
            let item = {...newData[index]};
            item.quantity += 1;
            newData[index] = item;
            
            localStorage.setItem('cart', JSON.stringify(newData));
            return {items: newData};
        },

        decrementQuantity: (state, action: PayloadAction<number>) => {
            let newData = [...state.items];
            let index = newData.findIndex(item => {
                return item.id === action.payload
            });
            let item = {...newData[index]};
            item.quantity -= 1;
            newData[index] = item;
            
            localStorage.setItem('cart', JSON.stringify(newData));
            return {items: newData};
        },
        
        removeProduct: (state, action: PayloadAction<number>) => {
            let newData = [...state.items.filter((item) => {
                return item.id !== action.payload
            })];
            localStorage.setItem('cart', JSON.stringify(newData));
            return {items: newData}
        },

    }
})

export const { addToCart, incrementQuantity, decrementQuantity, removeProduct } = cartSlice.actions

export default cartSlice.reducer 