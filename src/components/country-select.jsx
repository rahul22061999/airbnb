import useCountries from "@/hooks/useCountries";
import React from "react";
import Select from "react-select";

function CountrySelect({ value, onChange }) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Choose a location"
        isClearable
        options={getAll()}
        value={value} // 👈 pass selected value
        onChange={onChange} // 👈 pass change event to parent
      />
    </div>
  );
}

export default CountrySelect;
