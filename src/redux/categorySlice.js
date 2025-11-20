import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: JSON.parse(localStorage.getItem("categories")) || []
}

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.categories.push(action.payload);
            localStorage.setItem("categories", JSON.stringify(state.categories))
        }
    }
})

export const { addCategory, loadCategories } = categorySlice.actions;
export default categorySlice.reducer;