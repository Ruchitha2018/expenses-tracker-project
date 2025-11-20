import { Link, Route, Router, Routes } from "react-router-dom"
import Category from "./components/Category"
import Expenses from "./components/Expenses"
import ExpensesChart from "./components/ExpensesChart"
import ExpensesList from "./components/ExpensesList"


function App() {

  return (
    <>
        <nav className="navbar navbar-dark bg-dark p-3">
        <div className="container">
          <Link to="/add-category" className="navbar-brand">Categories</Link>
          <Link to="/add-expense" className="navbar-brand">Expenses</Link>
          <Link to="/expenses-list" className="navbar-brand">Expenses List</Link>
          <Link to="/expenses-chart" className="navbar-brand">Expenses Chart</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/add-category" element={<Category />} />
        <Route path="/add-expense" element={<Expenses />} />
        <Route path="/expenses-list" element={<ExpensesList />} />
        <Route path="/expenses-chart" element={<ExpensesChart />} />
      </Routes>
    </>
  )
}

export default App
