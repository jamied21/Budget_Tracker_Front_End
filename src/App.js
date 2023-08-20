import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
    <NavBar/>

    <Routes> <Route path='/' element = { <HomePage /> }/>
    
    </Routes>
   
    </div>
  );
}

export default App;
