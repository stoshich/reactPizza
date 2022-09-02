import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: { name: 'популярности', sortProperty: 'rating' },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilter(state, action) {
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
            state.currentPage = Number(action.payload.currentPage)
        }
    }
})

export const { setCategoryId, setSortType, setCurrentPage, setFilter, setSearchValue } = filterSlice.actions
export default filterSlice.reducer