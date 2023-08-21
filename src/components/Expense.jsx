import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Expense = () => {

const api = "http://localhost:8080/api/v1/expenses"
const [expenses, setExpenses] = useState([])

const loadExpenses = () => {



    axios
    .get(api)
    .then(response => setExpenses(response.data))
    .catch(error => console.log('Unable to load Academies'))
}

useEffect(()=> {loadExpenses()}, []);

    return (
<div>


{expenses.map(expense => { return (
                                        <div class="card-body" key={expense.id}>
                                        <h5 class="card-title">Budget Category: {expense.budget.budgetName}</h5>
                                        <p class="card-text">Budget Amount: {expense.budget.budgetAmount}</p>
                                        
                                        <h5 class="card-title">{expense.expenseName}</h5>
                                        <p class="card-text">{expense.amount}</p>


                                        
                                        </div>
                                     
                                     
                                     ) 
                            }
                                                                            
                                      



                 )
}

</div>

)

}

export default Expense;