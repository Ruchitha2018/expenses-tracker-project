import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { listExpense } from "../redux/expenseSlice";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpensesChart = () => {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(listExpense());
  }, [dispatch]);

  const grouped = expenses.reduce((acc, expense) => {
    const category = expense.expense_category;

    if (!category) return acc;

    const name = category.cat_name;
    const color = category.cat_color;

    if (!acc[name]) {
      acc[name] = {
        total: 0,
        color,
      };
    }

    acc[name].total += Number(expense.expense_amount);
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const dataValues = labels.map((label) => grouped[label].total);
  const colors = labels.map((label) => grouped[label].color);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: dataValues,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="container py-5">
      <div className="card p-4">
        <h3 className="text-center mb-4">Expenses by Category</h3>

        {expenses.length === 0 ? (
          <p className="text-center text-muted">No expenses to display</p>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default ExpensesChart;
