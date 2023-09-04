import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Income = () => {
  const api = "http://localhost:8080/api/v1/incomes";
  const [incomes, setIncomes] = useState([]);
  const navigate = useNavigate(); //Needed to navugate to add Budget page

  const loadIncomes = () => {
    axios
      .get(api)
      .then((response) => setIncomes(response.data))
      .catch((error) => console.log("Unable to load Incomes"));
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  const AddIncomeLink = () => {
    navigate("/income/add");
  };

  return (
    <div>
      <button class="button" onClick={AddIncomeLink} type="button">
        Add Income
      </button>
      {incomes.map((income) => (
        <div class="card-body" key={income.id}>
          <h5 class="card-title">{income.incomeMonth}</h5>
          <p class="card-text">Year: {income.incomeYear}</p>
          <p class="card-text">£{income.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default Income;
