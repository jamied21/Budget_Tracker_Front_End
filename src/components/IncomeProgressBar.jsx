import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/incomeProgressBar.css";

const IncomeProgressBar = ({ percentage }) => {
  let incomeProgressBarStyle, incomeProgressBarClass;

  const api = "http://localhost:8080/api/v1/budgets";
  const apiExpense = "http://localhost:8080/api/v1/expenses";
  const [expenses, setExpenses] = useState([]);

  // Need to obtain expense and budget data

  const loadExpenses = () => {
    axios
      .get(apiExpense)
      .then((response) => setExpenses(response.data))
      .catch((error) => console.log("Unable to load Incomes"));
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  //Method for calculating the percentage = amount spent/income total
  //Where amount spent is sum of expenses for each income month

  //Conditionals for prpgress bar
  if (percentage === 100) {
    incomeProgressBarClass = "equal-income";

    incomeProgressBarStyle = {
      width: `100%`,
    };
  } else if (percentage > 100) {
    incomeProgressBarClass = "over-income";

    incomeProgressBarStyle = {
      width: `100%`,
    };
  } else {
    incomeProgressBarClass = "under-income";

    incomeProgressBarStyle = {
      width: `${percentage}%`,
    };
  }

  return (
    <div
      className={incomeProgressBarClass}
      style={incomeProgressBarStyle}
    ></div>
  );
};

export default IncomeProgressBar;
