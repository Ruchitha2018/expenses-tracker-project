import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import expenseReducer from "./expenseSlice";


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        expenses: expenseReducer
    }
});