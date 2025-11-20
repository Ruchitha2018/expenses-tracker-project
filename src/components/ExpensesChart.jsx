import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../redux/categorySlice";
import { loadexpenses } from "../redux/expenseSlice";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ExpensesChart = () => {
    const dispatch = useDispatch();

    const categoriesList = useSelector((state) => state.categories.categories);
    const expensesList = useSelector((state) => state.expenses.expenses);

    const getCategoryName = (id) => {
        const found = categoriesList.find(cat => cat.cat_id === id);
        return found ? found.cat_name : "Unknown";
    }
    const categoryTotals = expensesList.reduce((acc, item) => {
        const catName = getCategoryName(Number(item.expense_category));
        acc[catName] = (acc[catName] || 0) + Number(item.expense_amount)
        return acc;
    }, {})

    console.log(categoryTotals);

    const categoryLabels = Object.keys(categoryTotals);
    const categoryAmounts = Object.values(categoryTotals);
    const data = {
        labels: categoryLabels,
        datasets: [
            {
                label: "Expenses By Category",
                data: categoryAmounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
        },
    };
    return (
        <div className="container py-5">
            <div className="card p-4">
                <h3 className="text-center">Expenses Chart</h3>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default ExpensesChart;
