import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: JSON.parse(localStorage.getItem("expenses")) || []
}

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
            localStorage.setItem("expenses", JSON.stringify(state.expenses))
        },
    }
})

export const { addExpense, loadexpenses } = expenseSlice.actions;
export default expenseSlice.reducer;