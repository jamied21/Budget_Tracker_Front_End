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
        <div className="left-side">
          <div className="income-bar">
            <IncomeProgressBar />
          </div>
          <div>
            <Budget />
          </div>
        </div>
        <div className="right-side">
          <div class="parent-container">
            <Expense />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
