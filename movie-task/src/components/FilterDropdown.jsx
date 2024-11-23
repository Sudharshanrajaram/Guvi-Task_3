import React from 'react';

const FilterDropdown = ({ selectedType, onTypeChange }) => {
  return (
    <select
    className='p-2 border rounded-md'
    onChange={(e) => onTypeChange(e.target.value)} value={selectedType}>
      <option value="">All Types</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  );
};

export default FilterDropdown;
