import React from "react";

const BudgetValidation = ({ selectedIncome, budgets, budgetAmount }) => {
  const calculateRemainingIncome = () => {
    if (!selectedIncome || selectedIncome.salary === undefined) {
      return null; // No selected month or selectedIncome salary is undefined
    }

    const totalExpenses = budgets.reduce(
      (total, budget) => total + (budget.budgetAmount || 0),
      0
    );

    const remainingIncome = selectedIncome.salary - totalExpenses;

    return remainingIncome;
  };

  const remainingIncome = calculateRemainingIncome();

  // Check if the budget amount exceeds the remaining income
  const isBudgetAmountValid = () => {
    if (remainingIncome === null || parseFloat(budgetAmount) < 0) {
      return true; // Skip validation if remainingIncome is null or budgetAmount is negative
    }

    return parseFloat(budgetAmount) <= remainingIncome;
  };

  return (
    <div>
      {remainingIncome !== null && (
        <div>
          <p>Remaining Income: £{remainingIncome}</p>
          {!isBudgetAmountValid() && (
            <div style={{ color: "red" }}>
              Budget amount exceeds the remaining income.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetValidation;
