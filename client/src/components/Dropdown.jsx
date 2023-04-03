import React from "react";
import Select from "react-select"
const Dropdown = ({placeholder, options, value, handleChange}) => {
  return (
    <Select
      className="w-full"
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
};

export default Dropdown;
