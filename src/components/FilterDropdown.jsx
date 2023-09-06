import React from "react";

const FilterDropdown = ({ incomes, selectedFilter, onFilterChange }) => {
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    onFilterChange(selectedValue);
  };

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

export default FilterDropdown;
