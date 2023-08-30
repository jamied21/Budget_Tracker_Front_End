import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import ExpensePage from './pages/ExpensePage';
import AddExpensePage from './pages/AddExpensePage';
import BudgetPage from './pages/BudgetPage';
import AddBudgetPage from './pages/AddBudgetPage';
import IncomePage from './pages/IncomePage';
import AddIncomePage from './pages/AddIncomePage';



function App() {
  return (
    <div className="App">
    <NavBar/>

    <Routes> 
    <Route path='/' element = { <HomePage /> }/>
    <Route path='/expense' element = { <ExpensePage /> }/>
    <Route path='/expense/add' element = { <AddExpensePage /> }/>
    <Route path='/budget' element = { <BudgetPage /> }/>
    <Route path='/budget/add' element = { <AddBudgetPage/>}/>
    <Route path='/income' element = { <IncomePage/>}/>
    <Route path='/income/add' element = { <AddIncomePage/>}/>

    </Routes>
   
    </div>
  );
}

export default App;
