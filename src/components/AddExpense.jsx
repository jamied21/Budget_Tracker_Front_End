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
  const [remainingBudget, setRemainingBudget] = useState(null);
  const [overBudgetWarning, setOverBudgetWarning] = useState(false);
  const [negativeAmountError, setNegativeAmountError] = useState(false); // Track negative amount error
  const [nameError, setNameError] = useState(false); // Track name error

  const loadBudgets = () => {
    axios
      .get(apiBudget)
      .then((response) => setBudgets(response.data))
      .catch((error) => console.log("Unable to load Budgets"));
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  useEffect(() => {
    // Calculate remaining budget and check for over budget
    if (selectedBudgetId) {
      const selectedBudget = budgets.find(
        (budget) => budget.id === parseInt(selectedBudgetId)
      );
      if (selectedBudget) {
        const newRemainingBudget = selectedBudget.budgetAmount - amount;
        setRemainingBudget(newRemainingBudget);

        if (newRemainingBudget < 0) {
          setOverBudgetWarning(true);
        } else {
          setOverBudgetWarning(false);
        }
      }
    }
  }, [selectedBudgetId, amount, budgets]);

  const createExpense = async (event) => {
    event.preventDefault();

    if (parseFloat(amount) < 0) {
      setNegativeAmountError(true);
      return; // Don't proceed with creating expense
    }

    const namePattern = /^[A-Za-z]+$/;
    if (!namePattern.test(name)) {
      setNameError(true);
      return; // Don't proceed with creating expense
    }

    try {
      // Create the expense without updating the budget
      await axios.post(api, {
        expenseName: name,
        amount: amount,
        budget: { id: selectedBudgetId },
      });

      navigate("/expense");
    } catch (error) {
      console.log(error);
    }
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
            type="number" // Change input type to "number" to enforce numeric input
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter amount"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setNegativeAmountError(false); // Clear the negative amount error
            }}
            required
          />
        </div>

        {/* Warning messages */}
        {negativeAmountError && (
          <div style={{ color: "red" }}>Amount cannot be negative.</div>
        )}

        {nameError && (
          <div style={{ color: "red" }}>Expense name cannot have a number.</div>
        )}

        {remainingBudget !== null && (
          <div>
            <p>
              Remaining Budget: £{remainingBudget.toFixed(2)}
              {overBudgetWarning && (
                <span style={{ color: "red" }}>
                  &nbsp;(Warning: Over budget)
                </span>
              )}
            </p>
          </div>
        )}

        {/* Button */}
        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
