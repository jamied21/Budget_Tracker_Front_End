import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ExpenseCard.css";
const Expense = () => {
  const api = "http://localhost:8080/api/v1/expenses";
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const loadExpenses = () => {
    axios
      .get(api)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log("Unable to load Academies"));
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const AddExpenseLink = () => {
    navigate("/expense/add");
  };

  return (
    <div>
      <div className="expense-container">
        <button class="button" onClick={AddExpenseLink} type="button">
          Add Expense
        </button>
        {expenses.map((expense) => {
          return (
            <div class="expense-card-body" key={expense.id}>
              <h5 class="card-title">
                Budget Category: {expense.budget.budgetName}
              </h5>

              <h5 class="card-title">Expense: {expense.expenseName}</h5>
              <p class="card-text">£{expense.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Expense;
