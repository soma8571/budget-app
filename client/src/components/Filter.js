import React from 'react';

function Filter({handleChange, catFilters}) {
  
  function renderFilters() {
    const filters = catFilters.map((cat, index) => 
      <div key={index}>
        <input 
          key={`$(index)-input`}
          type='checkbox' 
          id={index}
          checked={cat.visible} 
          onChange={e => handleChange(cat.name, e.target.checked)} 
        />
        <label key={`${index}-label`} htmlFor={index}>{cat.name}</label>
      </div>
    );
    return filters;
  }

  return (
    
    <div>
      <h1>Szűrők</h1>
      {renderFilters()}
    </div>
   
  );
};

export default Filter;
