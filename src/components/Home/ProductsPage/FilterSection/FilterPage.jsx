import React from "react";
import "./Filter.css";

const FilterPage = ({ techFields, onGetFilterValue }) => {
  const handleSelectTeck = (data) => {
    onGetFilterValue(data);
  };

  return (
    <div className="filter_main_wrapper">
      <div className="heading">
        <h2>Feedback</h2>
        <p>Apply Filter</p>
      </div>
      <div className="filteroptions_container">
        <div className="fiter_option">
          {techFields.map((option, i) => {
            return (
              <p
                key={i}
                onClick={() => {
                  handleSelectTeck(option);
                }}
                className="filter"
              >
                {option}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
