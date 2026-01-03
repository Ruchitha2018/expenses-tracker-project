import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    expenses: [],
    selectedExpense: {},
    loading: false,
    error: null
}

const API_URL = "http://localhost:5000/api/expense"

//Add Expense
export const addExpense = createAsyncThunk("expenses/addExpense", async (expenseData) => {
    try {
        console.log(expenseData)
        const res = await axios.post(`${API_URL}/add`, expenseData);
        console.log(res)
        return res.data.expenses;
    } catch (err) {
        console.log(err)
    }
})

//List Expense
export const listExpense = createAsyncThunk("expenses/listExpense", async () => {
    try {
        const res = await axios.get(`${API_URL}/list`);
        console.log(res.data.expenses);
        return res.data.expenses;
    } catch (err) {
        console.log(err)
    }
})

//Delete Expense
export const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/delete/${id}`);
        return id;
    } catch (err) {
        console.log(err);
    }
})

//Get Expense By Id
export const getExpenseById = createAsyncThunk("expenses/getExpenseById", async (id) => {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        console.log(res.data)
        return res.data.expense;
    } catch (err) {
        console.log(err);
    }
})

//Edit Expense
export const editExpense = createAsyncThunk("expenses/editExpense", async ({ id, expenseData }) => {
    try {
        console.log(expenseData)
        const res = await axios.post(`${API_URL}/edit/${id}`, expenseData);
        console.log(res)
        return res.data.expenses;
    } catch (err) {
        console.log(err)
    }
})

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addExpense.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(listExpense.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(listExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload
            })
            .addCase(listExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(getExpenseById.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getExpenseById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedExpense = action.payload
            })
            .addCase(getExpenseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(deleteExpense.pending, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editExpense.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(editExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(editExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default expenseSlice.reducer;