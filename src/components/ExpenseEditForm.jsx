import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, editExpense, getExpenseById, listExpense } from "../redux/expenseSlice";
import { fetchCategories } from "../redux/categorySlice";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";


const ExpenseEditForm = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.categories);
    const { selectedExpense } = useSelector((state) => state.expenses);
    const data = useSelector((state) => state);

    const { id } = useParams();

    console.log(id);


    const [expense, setExpense] = useState({
        expense_name: "",
        expense_amount: "",
        expense_category: "",
        expense_date: ""
    });


    console.log(selectedExpense)

    const handleInputChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async () => {
   
    }

    useEffect(() => {
        if (selectedExpense) {
            setExpense({
                expense_name: selectedExpense.expense_name,
                expense_amount: selectedExpense.expense_amount,
                expense_category: "",
                expense_date: selectedExpense.expense_date
            });
        }
    }, [selectedExpense])

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(getExpenseById(id))
    }, [dispatch, id]);

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="card shadow border-0" style={{ maxWidth: "900px", width: "100%" }}>
                <div className="card-header bg-white border-bottom py-3">
                    <h3 className="fw-bold">
                        <i className="bi bi-folder-plus me-2"></i>
                        Edit Expense
                    </h3>
                </div>

                <div className="card-body p-4">
                    <form className="row g-4" onSubmit={handleFormSubmit}>
                        {/* Expense Title */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Expense Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Grocery shopping"
                                name="expense_name"
                                value={expense.expense_name}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Amount */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Amount</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="e.g. 150"
                                name="expense_amount"
                                value={expense.expense_amount}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Category */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Category</label>
                            <select
                                className="form-select"
                                name="expense_category"
                                value={expense.expense_category}
                                onChange={handleInputChange}
                            >
                                <option value="">Select category</option>

                                {categories.length === 0 ? (
                                    <option disabled>No categories found — add a category first.</option>
                                ) : (
                                    categories.map((data) => (
                                        <option value={data._id} key={data._id}>
                                            {data.cat_name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>

                        {/* Expense Date */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Expense Date</label>
                            <div>
                                <DatePicker
                                    selected={expense.expense_date}
                                    onChange={(date) =>
                                        setExpense((prev) => ({ ...prev, expense_date: date }))
                                    }
                                    className="form-control w-100"
                                    placeholderText="Select expense date"
                                    dateFormat="yyyy-MM-dd"
                                    calendarClassName="calendar-style"

                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="col-12">
                            <button className="btn btn-primary w-100 py-2 fs-6 fw-semibold" onClick={handleFormSubmit}>
                                Edit Expense
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default ExpenseEditForm;
