import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Budget = () => {

    const api = 'http://localhost:8080/api/v1/budgets'
    const [budgets, setBudgets] = useState([]);
    const navigate = useNavigate();//Needed to navugate to add Budget page

    const loadBudgets = () =>{

        axios
            .get(api)
            .then(response => setBudgets(response.data))
            .catch(error => console.log('Unable to load Academies'))
    }

     useEffect(()=> {loadBudgets()}, []);


    return (
        <div >
           
           
    
       
   
          {budgets.map(budget => 
                                      

                                      
                                      
                                      
                                      <div class="card-body" key={budget.id}>
                                        <h5 class="card-title">{budget.budgetName}</h5>
                                        <p class="card-text">{budget.budgetAmount}</p>
                                      </div>
                                
                                      
                                      
                                      
                                     
                         )
          }


        </div>

    )
}

export default Budget