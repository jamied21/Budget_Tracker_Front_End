import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BudgetCard.css";
import ProgressBar from "./ProgressBar";

const Budget = () => {
  const api = "http://localhost:8080/api/v1/budgets";
  const apiExpense = "http://localhost:8080/api/v1/expenses";
  const [selectedMonth, setSelectedMonth] = useState("Select Month"); // Default to "Select Month" to show all budgets initially

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

  //Filter for income month
  const getUniqueMonths = () => {
    const months = data.budgets.map((budget) => budget.income.incomeMonth);
    return ["Select Month", ...new Set(months)];
  };

  const uniqueMonths = getUniqueMonths();

  // Handle dropdown change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter budgets based on the selected month
  const filteredBudgets =
    selectedMonth === "Select Month"
      ? data.budgets
      : data.budgets.filter(
          (budget) => budget.income.incomeMonth === selectedMonth
        );

  //Method used for the progress bar
  const calculateExpensePercentage = (budget) => {
    const totalExpenses = budgetsWithTotalExpenses[budget.id] || 0;
    const budgetAmount = budget.budgetAmount;
    return (totalExpenses / budgetAmount) * 100;
  };
  return (
    <div>
      {/* Filter for month */}

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
      {/* Button for add budget */}
      <button className="button" onClick={AddBudgetLink} type="button">
        Add Budget
      </button>

      {/* Budget Cards */}
      <div className="overflow-container">
        <div className="budget-container">
          {filteredBudgets.map((budget) => (
            <div className="flip-card" key={budget.id}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="budget-card-body">
                    <ProgressBar
                      percentage={calculateExpensePercentage(budget)}
                    />
                    <p>
                      Total Spent: £{budgetsWithTotalExpenses[budget.id] || 0}
                    </p>
                    <h5 className="card-title">{budget.budgetName}</h5>
                    <p className="card-text">£{budget.budgetAmount}</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="budget-card-body-back">
                    {/* Displays list of each expense for the relevant budget for reverse side of the card
                     */}
                    {data.expenses
                      .filter((expense) => expense.budget.id === budget.id)
                      .map((expense) => (
                        <div key={expense.id}>
                          <p>Expense: {expense.expenseName}</p>
                          <p>Amount: £{expense.amount}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;
