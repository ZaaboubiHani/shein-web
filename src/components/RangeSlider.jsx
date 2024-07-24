import React, { useState, useEffect,useContext } from "react";
import "./styles/RangeSlider.css";
import { NumberSizeContext } from "../contexts/NumberSizeContext";
const RangeSlider = () => {
  const [minValue, setMinValue] = useState(30);
  const [maxValue, setMaxValue] = useState(52);
  const min = 30;
  const max = 52;
  const step = 2;
  const { setSelectedNumberSizes } = useContext(NumberSizeContext);
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + step);
    setMaxValue(value);
  };

  const generateRangeArray = (start, end, step) => {
    let array = [];
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
    return array;
  };

  useEffect(() => {
    const rangeArray = generateRangeArray(minValue, maxValue, step);
    setSelectedNumberSizes(rangeArray)
  }, [minValue, maxValue]);
  return (
    <div className="slider-container w-full my-4">
      <div className="slider-track">
        <div
          className="slider-range"
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
          }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="slider"
        />
        <div
          className="bubble"
          style={{
            left: `calc(${((minValue - min) / (max - min)) * 100}% - ${
              ((minValue - min) / (max - min)) * 25
            }px)`,
            top: "-34px",
          }}
        >
          {minValue}
        </div>
        <div
          className="bubble"
          style={{
            left: `calc(${((maxValue - min) / (max - min)) * 100}% - ${
              ((maxValue - min) / (max - min)) * 25
            }px)`,
            top: "16px",
          }}
        >
          {maxValue}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
