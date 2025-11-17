import { useEffect, useState } from "react"

const Expenses = () => {

    const [expense, setExpense] = useState({
        expense_id: "",
        expense_title: "",
        expense_amount: "",
        expense_category: "",
        expense_date: ""
    })

    const [expensesList, setExpensesList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])

    const handleInputChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newExpense = { ...expense, expense_id: Date.now() }
        const updatedList = [...expensesList, newExpense];
        setExpensesList(updatedList);

        localStorage.setItem("expenses", JSON.stringify(updatedList));
        setExpense({
            expense_title: "",
            expense_amount: "",
            expense_category: "",
            expense_date: ""
        })
    }

    const loadData = () => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategoriesList(storedCategories);
        const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        setExpensesList(storedExpenses);
    }

    useEffect(() => {
        loadData()
    }, [])
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

                                {categoriesList.map((data) => (
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