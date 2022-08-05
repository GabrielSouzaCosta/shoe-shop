import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartState {
    items: {
        product: number,
        name: string,
        image: string,
        price: number,
        quantity: number
    }[]
}

type CartItem = {
    product: number,
    name: string,
    image: string,
    price: number,
    quantity: number
}

function getLocalStorageData() {
    const data = localStorage.getItem('cart')
    if ( data !== null) {
        return JSON.parse(data)
    } else {
        return []
    }
}


const initialState: CartState = {
    items: getLocalStorageData()
  }

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            // Check if item is already on cartSlice, if true, increment the quantity, if not add to cart normally
            const hasItem = state.items.filter((item:CartItem) => {
                if (item.product === action.payload.product) {
                    return item
                }
                return null
            })

            if (hasItem.length > 0) {
                const newData = [...state.items];
                const index = newData.findIndex(item => {
                    return item.product === action.payload.product
                });
                const item = {...newData[index]}
                item.quantity += action.payload.quantity
                newData[index] = item
                localStorage.setItem('cart', JSON.stringify(newData))
                return {items: newData}
            } else {
                const newData = [...state.items, {product: action.payload.product, name: action.payload.name, price: action.payload.price, quantity: action.payload.quantity, image: action.payload.image }]
                localStorage.setItem('cart', JSON.stringify(newData));
                return {items: newData}
            }   
        },

        incrementQuantity: (state, action: PayloadAction<number>) => {
            const newData = [...state.items];
            const index = newData.findIndex(item => {
                return item.product === action.payload
            });
            const item = {...newData[index]};
            item.quantity += 1;
            newData[index] = item;
            
            localStorage.setItem('cart', JSON.stringify(newData));
            return {items: newData};
        },

        decrementQuantity: (state, action: PayloadAction<number>) => {
            const newData = [...state.items];
            const index = newData.findIndex(item => {
                return item.product === action.payload
            });
            const item = {...newData[index]};
            item.quantity -= 1;
            newData[index] = item;
            
            localStorage.setItem('cart', JSON.stringify(newData));
            return {items: newData};
        },
        
        removeProduct: (state, action: PayloadAction<number>) => {
            const newData = [...state.items.filter((item) => {
                return item.product !== action.payload
            })];
            localStorage.setItem('cart', JSON.stringify(newData));
            return {items: newData}
        },

    }
})

export const { addToCart, incrementQuantity, decrementQuantity, removeProduct } = cartSlice.actions

export default cartSlice.reducer 