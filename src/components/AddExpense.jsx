import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectList from "./SelectList";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddExpense = () => {
  const api = "http://localhost:8080/api/v1/expenses";
  const apiBudget = "http://localhost:8080/api/v1/budgets";

  const [category, setCategory] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

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
      .post(api, { expenseName: name, amount: amount, budget: category })
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
          <select defaultValue="default" onSelect={setCategory}>
            <option value="default">Choose a Budget</option>
            {budgets.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.budgetName}
              </option>
            ))}
          </select>
        </div>

        {/* Adding form to enter expense name and amount */}

        <div class="form-group">
          <label for="formGroupExampleInput">Name</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label for="formGroupExampleInput">Amount</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
