import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBudget = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const api = "http://localhost:8080/api/v1/budgets";

  const createBudget = (event) => {
    event.preventDefault();

    axios
      .post(api, { budgetName: name, budgetAmount: amount })
      .then((response) => {
        navigate("/budget");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={createBudget}>
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
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default AddBudget;
