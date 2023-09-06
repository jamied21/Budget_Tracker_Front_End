import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseWarning = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const apiUrlExpenses = "http://localhost:8080/api/v1/expenses";
    const apiUrlBudgets = "http://localhost:8080/api/v1/budgets";

    // Fetch expenses
    axios
      .get(apiUrlExpenses)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error("Unable to load expenses"));

    // Fetch budgets
    axios
      .get(apiUrlBudgets)
      .then((response) => setBudgets(response.data))
      .catch((error) => console.error("Unable to load budgets"));
  }, []);

  // Calculate total expenses per budget ID
  const budgetExpenses = {};
  expenses.forEach((expense) => {
    const { amount, budget } = expense;
    const budgetId = budget.id;

    if (budgetExpenses[budgetId] === undefined) {
      budgetExpenses[budgetId] = amount;
    } else {
      budgetExpenses[budgetId] += amount;
    }
  });

  return (
    <div>
      <h2>Total Expenses per Budget:</h2>
      <ul>
        {Object.keys(budgetExpenses).map((budgetId) => {
          const totalExpense = budgetExpenses[budgetId];
          const budget = budgets.find((b) => b.id === parseInt(budgetId));
          const budgetAmount = budget ? budget.budgetAmount : 0;

          const isOverBudget = totalExpense > budgetAmount;

          return (
            <li key={budgetId}>
              Budget ID {budgetId}: £{totalExpense.toFixed(2)}
              {isOverBudget && (
                <span style={{ color: "red" }}> (Warning: Over budget)</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseWarning;
