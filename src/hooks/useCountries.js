import React from "react";
import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common, // FIXED: correct property
  flag: country.flag,
  region: country.region,
  latlng: country.latlng, // FIXED: typo corrected
}));

function useCountries() {
  const getAll = () => formattedCountries;

  const getByValue = (value) =>
    formattedCountries.find((item) => item.value === value); // FIXED: now it's a function

  return {
    getAll,
    getByValue,
  };
}

export default useCountries;
