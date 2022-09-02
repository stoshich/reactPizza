import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    totalPrice: 0,
    items: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
            state.totalPrice += Number(action.payload.price)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem.count > 1) {
                findItem.count--
            } else {
                state.items = state.items.filter(obj => obj.id !== action.payload.id)
            }
            state.totalPrice -= Number(action.payload.price)
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
            state.totalPrice -= Number(action.payload.price * action.payload.count)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        },
    }
})
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer