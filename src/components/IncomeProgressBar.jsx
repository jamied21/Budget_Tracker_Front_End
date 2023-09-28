import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/IncomeProgressBar.css";
import ProgressBar from "./ProgressBar";

const IncomeProgressBar = () => {
  const apiExpense = "http://localhost:8080/api/v1/expenses";
  const [expenses, setExpenses] = useState([]);
  const [incomeMonths, setIncomeMonths] = useState([]);

  useEffect(() => {
    axios
      .get(apiExpense)
      .then((response) => {
        setExpenses(response.data);

        // Get unique income months from expenses
        const uniqueMonths = [
          ...new Set(
            response.data.map((expense) => expense.budget.income.incomeMonth)
          ),
        ];
        setIncomeMonths(uniqueMonths);
      })
      .catch((error) => console.log("Unable to load Expenses"));
  }, []);

  // Calculate percentage for a given income month
  const calculatePercentage = (incomeMonth) => {
    const expensesForMonth = expenses.filter(
      (expense) => expense.budget.income.incomeMonth === incomeMonth
    );
    const totalExpenses = expensesForMonth.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const salaryForMonth = expensesForMonth[0]?.budget.income.salary || 0; // Assuming salary is the same for the month

    // Calculate the percentage (make sure it doesn't exceed 100%)
    const percentage = (totalExpenses / salaryForMonth) * 100;

    return percentage;
  };

  const totalSpent = (incomeMonth) => {
    const expensesForMonth = expenses.filter(
      (expense) => expense.budget.income.incomeMonth === incomeMonth
    );
    const totalExpenses = expensesForMonth.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );

    // Calculate the percentage (make sure it doesn't exceed 100%)

    return totalExpenses;
  };

  return (
    <div>
      {incomeMonths.map((incomeMonth) => (
        <div key={incomeMonth}>
          <h3>{incomeMonth}</h3>
          <p>Total Spent: {totalSpent(incomeMonth)}</p>
          <ProgressBar percentage={calculatePercentage(incomeMonth)} />
        </div>
      ))}
    </div>
  );
};

export default IncomeProgressBar;
