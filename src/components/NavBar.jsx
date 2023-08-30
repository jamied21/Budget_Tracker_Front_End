import "../styles/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div class="topnav">
      <Link to="/" class="active">
        {" "}
        Home{" "}
      </Link>
      <Link to="/budget"> Budgets </Link>
      <Link to="/expense"> Expenses</Link>
      <Link to="/income"> Income</Link>
    </div>
  );
};

export default NavBar;
