import { configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import expenseReducer from "./expenseSlice";


// const rtkErrorLogger = (store) => (next) => (action) => {
//     if(isRejectedWithValue(action)) {
//         console.error("RTK THUNK ERROR:", action.payload || action.error);
//     }
//     return next(action)
// }


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        expenses: expenseReducer
    }
});