import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BudgetCard.css";

const Budget = () => {
  const api = "http://localhost:8080/api/v1/budgets";
  const apiExpense = "http://localhost:8080/api/v1/expenses";
  const [data, setData] = useState({
    budgets: [],
    expenses: [],
  });
  const [budgetsWithTotalExpenses, setBudgetsWithTotalExpenses] = useState({});
  const navigate = useNavigate();

  const loadBudgets = () => {
    axios
      .get(api)
      .then((response) => {
        setData((prevData) => ({ ...prevData, budgets: response.data }));
      })
      .catch((error) => console.log("Unable to load budgets"));
  };

  const loadExpenses = () => {
    axios
      .get(apiExpense)
      .then((response) => {
        const expenseData = response.data;
        const budgetTotalExpenses = {};

        expenseData.forEach((expense) => {
          const { budget } = expense;
          const budgetId = budget.id;

          if (!budgetTotalExpenses[budgetId]) {
            budgetTotalExpenses[budgetId] = 0;
          }

          budgetTotalExpenses[budgetId] += expense.amount;
        });

        setData((prevData) => ({
          ...prevData,
          expenses: expenseData,
        }));

        setBudgetsWithTotalExpenses(budgetTotalExpenses);
      })
      .catch((error) => console.log("Unable to load expenses"));
  };

  useEffect(() => {
    loadBudgets();
    loadExpenses();
  }, []);

  const AddBudgetLink = () => {
    navigate("/budget/add");
  };

  return (
    <div>
      <button className="button" onClick={AddBudgetLink} type="button">
        Add Budget
      </button>
      <div className="budget-container">
        {data.budgets.map((budget) => (
          <div className="budget-card-body" key={budget.id}>
            <h5 className="card-title">{budget.budgetName}</h5>
            <p className="card-text">£{budget.budgetAmount}</p>

            <p>Total Spent: £{budgetsWithTotalExpenses[budget.id] || 0}</p>
            {/* Displays list of each expense for the relevant budget
             */}

            {/* {data.expenses
              .filter((expense) => expense.budget.id === budget.id)
              .map((expense) => (
                <div key={expense.id}>
                  <p>Expense: {expense.expenseName}</p>
                  <p>Amount: £{expense.amount}</p>
                </div>
              ))} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
