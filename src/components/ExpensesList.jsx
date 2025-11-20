import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadCategories } from "../redux/categorySlice";
import { loadexpenses } from "../redux/expenseSlice";

const ExpensesList = () => {
    const dispatch = useDispatch();

    const expensesList = useSelector((store) => store.expenses.expenses);
    const categoriesList = useSelector((store) => store.categories.categories);
    
    const getCategoryName = (id) => {
        const found = categoriesList.find(cat => cat.cat_id === +id);
        console.log(found);
         return found?.cat_name || ""
    }
    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header"><h2>Expenses List</h2></div>
                <div className="card-body">
                    <table class="table table-bordered table-striped table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expensesList.map((data, index) => (
                                <tr key={data.expense_id}>
                                    <td>{index+1}</td>
                                    <td>{data.expense_title}</td>
                                    <td>{getCategoryName(data.expense_category)}</td>
                                    <td>Rs. {data.expense_amount}</td>
                                    <td>{data.expense_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default ExpensesList