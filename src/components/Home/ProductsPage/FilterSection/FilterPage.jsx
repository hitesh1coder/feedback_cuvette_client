import React, { useState } from "react";
import "./Filter.css";

const FilterPage = ({ techFields, onGetFilterValue }) => {
  const [selectedId, setSelectedId] = useState(0);
  const handleSelectTeck = (data, id) => {
    onGetFilterValue(data);
    setSelectedId(id);
  };
  const getSelectedClass = (id) => (selectedId === id ? "selected" : "");

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
                  handleSelectTeck(option, i);
                }}
                className={`filter ${getSelectedClass(i)}`}
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
