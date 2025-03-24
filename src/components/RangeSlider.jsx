import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css"; // Required CSS for rc-slider

const RangeSlider = ({ value, setSearchTerms }) => {
  const handleChange = (newValue) => {
    setSearchTerms((prev) => ({
      ...prev,
      ageMin: newValue[0],
      ageMax: newValue[1],
    }));
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "transparent",
        borderRadius: "8px",
      }}
    >
      <Slider
        range
        min={0}
        max={20}
        step={1}
        value={value}
        onChange={handleChange}
        marks={{
          0: "0 yrs",
          5: "5 yrs",
          10: "10 yrs",
          15: "15 yrs",
          20: "20 yrs",
        }}
        tipFormatter={(val) => `${val} year(s) old`}
      />
    </div>
  );
};

export default RangeSlider;
