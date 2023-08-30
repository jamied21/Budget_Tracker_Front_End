import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AddIncome = () => {
  const api = "http://localhost:8080/api/v1/incomes";
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate(); //Needed to navugate to add Budget page

  const createIncome = (event) => {
    event.preventDefault();

    axios
      .post(api, { incomeYear: year, incomeMonth: month, salary: salary })
      .then((response) => {
        navigate("/income");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={createIncome}>
        <div class="form-group">
          <label for="formGroupExampleInput">Year</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter Year"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
          <label for="formGroupExampleInput">Month</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter Month"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            required
          />
          <label for="formGroupExampleInput">Income</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter salary"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncome;
