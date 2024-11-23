import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <input className='p-2 border rounded-md'
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search for a movie..."
    />
  );
};

export default SearchBar;
