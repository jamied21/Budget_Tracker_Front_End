import '../styles/NavBar.css';
import {Link} from 'react-router-dom';

const NavBar = () => {
return (

<div class="topnav">

<Link to='/' class="active"> Home </Link>
<Link to='/Budgets'> Budgets </Link>
<Link to='/Expenses'> Expenses</Link>


</div>

)


}

export default NavBar;