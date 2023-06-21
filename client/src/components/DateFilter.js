import React from 'react';

function DateFilter({ dates, handleDateChange }) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="start_date">Dátumtól:</label>
            <input 
                type="date" 
                name="start_date"
                id="start_date" 
                value={dates[0]} 
                onChange={e => handleDateChange("start", e.target.value)} 
            />
            <label htmlFor="end_date">Dátumig:</label>
            <input type="date" 
                name="end_date" 
                id="end_date"
                value={dates[1]} 
                onChange={e => handleDateChange("end", e.target.value)} 
            />
        </div>
    )
}

export default DateFilter;
