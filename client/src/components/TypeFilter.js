import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function TypeFilter({ itemType, handleTypeChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" style={{ color: "white" }}>Típus</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={itemType}
        onChange={e => handleTypeChange(e.target.value)}
        name="radio-buttons-group"
      >
        <FormControlLabel value="both" control={<Radio />} label="Mindegyik" />
        <FormControlLabel value="income" control={<Radio />} label="Csak bevételek" />
        <FormControlLabel value="outcome" control={<Radio />} label="Csak kiadások" />
      </RadioGroup>
    </FormControl>
  );
}

export default TypeFilter;
