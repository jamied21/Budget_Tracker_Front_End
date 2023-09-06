import React from "react";

const IncomeFilter = ({ incomes, selectedFilter, onFilterChange }) => {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };

  const api = "http://localhost:8080/api/v1/incomes";
  const [incomes, setIncomes] = useState([]);

  const loadIncomes = () => {
    axios
      .get(api)
      .then((response) => setIncomes(response.data))
      .catch((error) => console.log("Unable to load Incomes"));
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  return (
    <div>
      <label htmlFor="filterSelect">Filter by Income Month:</label>
      <select
        id="filterSelect"
        onChange={handleFilterChange}
        value={selectedFilter}
      >
        <option value="all">All</option>
        {incomes.map((income) => (
          <option key={income.id} value={income.id}>
            {income.incomeMonth}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IncomeFilter;
