import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ExpenseCard.css";

const Expense = () => {
  const api = "http://localhost:8080/api/v1/expenses";
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Select Month"); // Default to "Select Month" to show all expenses initially
  const navigate = useNavigate();

  const loadExpenses = () => {
    axios
      .get(api)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log("Unable to load expenses"));
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const AddExpenseLink = () => {
    navigate("/expense/add");
  };

  // Helper function to get unique incomeMonths from expenses
  const getUniqueMonths = () => {
    const months = expenses.map((expense) => expense.budget.income.incomeMonth);
    return ["Select Month", ...new Set(months)];
  };

  const uniqueMonths = getUniqueMonths();

  // Handle dropdown change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter expenses based on the selected month
  const filteredExpenses =
    selectedMonth === "Select Month"
      ? expenses
      : expenses.filter(
          (expense) => expense.budget.income.incomeMonth === selectedMonth
        );

  return (
    <div>
      <select
        id="monthDropdown"
        onChange={handleMonthChange}
        value={selectedMonth}
      >
        {uniqueMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <div className="expense-container">
        <button className="button" onClick={AddExpenseLink} type="button">
          Add Expense
        </button>
        {filteredExpenses.map((expense) => {
          return (
            <div className="expense-card-body" key={expense.id}>
              <h5 className="expense-card-title">
                Budget Category: {expense.budget.budgetName}
              </h5>
              <h5 className="expense-card-title">
                Expense: {expense.expenseName}
              </h5>
              <p className="expense-card-text">£{expense.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Expense;
