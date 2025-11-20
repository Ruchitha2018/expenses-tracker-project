import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addExpense } from "../redux/expenseSlice";
import { loadCategories } from "../redux/categorySlice";

const Expenses = () => {

    const dispatch = useDispatch();
    const categoriesList = useSelector((state) => state.categories.categories)

    const [expense, setExpense] = useState({
        expense_id: "",
        expense_title: "",
        expense_amount: "",
        expense_category: "",
        expense_date: ""
    })

    const handleInputChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newExpense = { ...expense, expense_id: Date.now() }
       dispatch(addExpense(newExpense));
        setExpense({
            expense_title: "",
            expense_amount: "",
            expense_category: "",
            expense_date: ""
        })
    }
    return (
        <div className="container py-5">
            <div className="card">
                <div className="card-header"><h2>Add Expenses</h2></div>
                <div className="card-body">
                    <form className="row" onSubmit={handleFormSubmit}>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Expense Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="expense_title"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Amount</label>
                            <input
                                type="text"
                                className="form-control"
                                name="expense_amount"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                name="expense_category"
                                value={expense.expense_category}
                                onChange={(e) => handleInputChange(e)}
                            >
                                <option value="">Select Category</option>

                                {categoriesList?.map((data) => (
                                    <option value={data.cat_id} key={data.cat_id}>
                                        {data.cat_name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Expense Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="expense_date"
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <button className="btn btn-primary w-100">Add Expenses</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Expenses