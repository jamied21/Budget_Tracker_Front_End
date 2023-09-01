import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BudgetCard.css";

const Budget = () => {
  const api = "http://localhost:8080/api/v1/budgets";
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate(); //Needed to navugate to add Budget page

  const loadBudgets = () => {
    axios
      .get(api)
      .then((response) => setBudgets(response.data))
      .catch((error) => console.log("Unable to load Academies"));
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const AddBudgetLink = () => {
    navigate("/budget/add");
  };

  return (
    <div>
      <button class="button" onClick={AddBudgetLink} type="button">
        Add Budget
      </button>
      <div className="budget-container">
        {budgets.map((budget) => (
          <div class="budget-card-body" key={budget.id}>
            <h5 class="card-title">{budget.budgetName}</h5>
            <p class="card-text">£{budget.budgetAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
