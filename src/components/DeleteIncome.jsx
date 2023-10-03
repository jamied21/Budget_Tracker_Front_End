import axios from "axios";
import "../styles/IncomeCard.css";
const DeleteIncome = ({ incomeId, setIncomes }) => {
  //Using props we take in an income Id and income list loaded from the income component
  const api = `http://localhost:8080/api/v1/incomes/${incomeId}`;

  const deleteIncomeById = () => {
    axios
      .delete(api)
      .then(() => {
        // Directly update the state by removing the deleted income
        setIncomes((incomesList) =>
          incomesList.filter((income) => income.id !== incomeId)
        );
      })
      .catch((error) => {
        console.error("Unable to delete income", error);
      });
  };

  return (
    <div>
      <button class="delete-button" onClick={deleteIncomeById} type="button">
        Delete
      </button>
    </div>
  );
};

export default DeleteIncome;
