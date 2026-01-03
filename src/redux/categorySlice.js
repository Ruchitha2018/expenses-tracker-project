import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const API_URL = 'http://localhost:5000/api/category'
console.log(API_URL);

// Fetch all categories
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories", 
    async () => {
    const res = await axios.get(`${API_URL}/list`);
    return res.data.categories
})

// Add all category
export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async ( categoryData) => {
      const res = await axios.post(`${API_URL}/add`, categoryData);
      return res.data.category;
    }
)

// Delete All Category
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id) => {
        const res = await axios.delete(`${API_URL}/delete/${id}`);
        return id;
    }
)

// Edit Category
export const editCategory = createAsyncThunk(
    "categories/editCategory",
    async ({ id, updatedData }) => {
        const res = await axios.put(`${API_URL}/edit/${id}`, updatedData);
        return res.data.category
    }
)
const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(addCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteCategory.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(deleteCategory.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(editCategory.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(editCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(editCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default categorySlice.reducer;