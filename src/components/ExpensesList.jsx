import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, listExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ExpensesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { expenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(listExpense());
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteExpense(id));
    toast.error("Expense deleted") 
    dispatch(listExpense());
  };

  return (
    <div className="container py-5">
      <div className="card shadow border-0">
         <div className="card-header bg-white border-0 pt-4 pb-0">
          <h3 className="fw-bold"><i className="bi bi-card-list me-2"></i>Expenses List</h3>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="bg-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  expenses.map((data, index) => (
                    <tr key={data._id}>
                      <td>{index + 1}</td>

                      <td className="fw-semibold">{data.expense_name}</td>

                      <td>
                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                          {data.expense_category?.cat_name}
                        </span>
                      </td>

                      <td className="text-success fw-bold">
                        Rs. {data.expense_amount}
                      </td>

                      <td>{new Date(data.expense_date).toLocaleDateString()}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => navigate(`/edit-expense/${data._id}`)}
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(data._id)}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;
