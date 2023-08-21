import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import ExpensePage from './pages/ExpensePage';



function App() {
  return (
    <div className="App">
    <NavBar/>

    <Routes> 
    <Route path='/' element = { <HomePage /> }/>
    <Route path='/expense' element = { <ExpensePage /> }/>
    </Routes>
   
    </div>
  );
}

export default App;
