import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async (params) => {
        const { category, sortBy, order, search, currentPage, } = params
        const { data } = await axios
            .get(`https://62bb5eda7bdbe01d529caaad.mockapi.io/items?${category}sortBy=${sortBy}&${order}&page=${currentPage}&limit=4${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: '',
}
const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        // setItems(state, action) {
        //     state.items = action.payload
        // }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error'
            state.items = []
        }
    }
})
export const { } = pizzaSlice.actions
export default pizzaSlice.reducer