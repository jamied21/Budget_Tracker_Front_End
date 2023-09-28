import Budget from "../components/Budget";
import Expense from "../components/Expense";
import "../styles/HomePage.css";
import "../styles/BudgetCard.css";
import "../styles/ExpenseCard.css";
import IncomeProgressBar from "../components/IncomeProgressBar";
import "../styles/IncomeProgressBar.css";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome back... </h1>

      <div className="home-container">
        <IncomeProgressBar />
        <Budget />

        <Expense />
      </div>
    </div>
  );
};

export default HomePage;
