import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetValidation from "./BudgetValidation";

const AddBudget = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null); // Track selected Income ID
  const api = "http://localhost:8080/api/v1/budgets";
  const apiIncome = "http://localhost:8080/api/v1/incomes";
  const [negativeAmountError, setNegativeAmountError] = useState(false); // Track negative amount error
  const [nameError, setNameError] = useState(false); // Track name error

  const loadIncomes = () => {
    axios
      .get(apiIncome)
      .then((response) => setIncomes(response.data))
      .catch((error) => console.log("Unable to load Incomes"));
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  const createBudget = async (event) => {
    event.preventDefault();
    if (parseFloat(amount) < 0) {
      setNegativeAmountError(true);
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
      setNameError(true);
      return; // Don't proceed with creating expense
    }

    await axios
      .post(api, {
        budgetName: name,
        budgetAmount: amount,
        income: { id: selectedIncomeId },
      })
      .then((response) => {
        navigate("/budget");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={createBudget}>
        {/* Adding dropdown for month selection */}

        <div>
          <select
            defaultValue="default"
            onChange={(event) => setSelectedIncomeId(event.target.value)}
          >
            <option value="default">Choose a Month</option>
            {incomes.map((income) => (
              <option key={income.id} value={income.id}>
                {income.incomeMonth}
              </option>
            ))}
          </select>
        </div>

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
        {negativeAmountError && (
          <div style={{ color: "red" }}>Amount cannot be negative.</div>
        )}

        {nameError && (
          <div style={{ color: "red" }}>Budget name cannot have a number.</div>
        )}

        <button type="submit" class="btn btn-primary">
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default AddBudget;
