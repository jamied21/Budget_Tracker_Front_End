import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const api = "http://localhost:8080/api/v1/expenses";
  const apiBudget = "http://localhost:8080/api/v1/budgets";

  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedBudgetId, setSelectedBudgetId] = useState(null); // Track selected budget ID

  const loadBudgets = () => {
    axios
      .get(apiBudget)
      .then((response) => setBudgets(response.data))
      .catch((error) => console.log("Unable to load Budgets"));
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const createExpense = (event) => {
    event.preventDefault();
    axios
      .post(api, {
        expenseName: name,
        amount: amount,
        budget: { id: selectedBudgetId }, // Associate selected budget
      })
      .then((response) => {
        navigate("/expense");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Please enter expense details</h1>

      {/* Adding dropdown for budget selection */}
      <form onSubmit={createExpense}>
        <div>
          <select
            defaultValue="default"
            onChange={(event) => setSelectedBudgetId(event.target.value)}
          >
            <option value="default">Choose a Budget</option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.budgetName}
              </option>
            ))}
          </select>
        </div>

        {/* Adding form to enter expense name and amount */}
        <div className="form-group">
          <label htmlFor="formGroupExampleInput">Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="formGroupExampleInput">Amount</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
