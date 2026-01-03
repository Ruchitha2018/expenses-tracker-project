import { Link, Route, Router, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";


import Category from "./components/Category"
import Expenses from "./components/Expenses"
import ExpensesList from "./components/ExpensesList"
import ExpensesChart from "./components/ExpensesChart";
import ExpenseEditForm from "./components/ExpenseEditForm";



function App() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
          <a class="navbar-brand fw-bold" href="#">ExpenseTracker</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><Link class="nav-link" to="/add-category">Categories</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/add-expense">Expenses</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/list-expenses">Expenses List</Link></li>
              <li class="nav-item"><Link class="nav-link" to="/expenses-chart">Expenses Chart</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/add-category" element={<Category />} />
        <Route path="/add-expense" element={<Expenses />} />
        <Route path="/list-expenses" element={<ExpensesList />} />
        <Route path="/edit-expense/:id" element={<ExpenseEditForm />} />
        <Route path="/expenses-chart" element={<ExpensesChart />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover
        theme="colored"
      />
    </>

  )
}

export default App
