import React, { useState, useEffect,useContext } from "react";
import "./styles/SizeSlider.css";
import { LetterSizeContext } from "../contexts/LetterSizeContext";
const letterSizes = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "XXXXL",
  "5XL",
  "6XL",
];

const SizeSlider = () => {
  const [minIndex, setMinIndex] = useState(0); // Corresponds to 'S'
  const [maxIndex, setMaxIndex] = useState(letterSizes.length - 1); // Corresponds to 'XL'
  const min = 0;
  const max = letterSizes.length - 1;
  const step = 1;
  const { setSelectedLetterSizes } = useContext(LetterSizeContext);
  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxIndex - step);
    setMinIndex(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minIndex + step);
    setMaxIndex(value);
  };

  useEffect(() => {
    const rangeArray = letterSizes.slice(minIndex, maxIndex + 1);
    setSelectedLetterSizes(rangeArray);
  }, [minIndex, maxIndex]);

  return (
    <div className="slider-container w-full my-4">
      <div className="slider-track">
        <div
          className="slider-range"
          style={{
            left: `${(minIndex / max) * 100}%`,
            right: `${100 - (maxIndex / max) * 100}%`,
          }}
        ></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minIndex}
          onChange={handleMinChange}
          className="slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxIndex}
          onChange={handleMaxChange}
          className="slider"
        />
        <div
          className="bubble"
          style={{
            left: `calc(${(minIndex / max) * 100}% - ${
              (minIndex / max) * 25
            }px)`,
            top: "-34px",
          }}
        >
          {letterSizes[minIndex]}
        </div>
        <div
          className="bubble"
          style={{
            left: `calc(${(maxIndex / max) * 100}% - ${
              (maxIndex / max) * 25
            }px)`,
            top: "16px",
          }}
        >
          {letterSizes[maxIndex]}
        </div>
      </div>
    </div>
  );
};

export default SizeSlider;
