import React, { useState, useRef, useEffect, useContext } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { LanguageContext } from "../contexts/LanguageContext";
import { LetterSizeContext } from "../contexts/LetterSizeContext";

const LetterSizeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const letterSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', '5XL', '6XL'];
  const [selectedSizes, setSelectedSizes] = useState([]); // State to track selected sizes
  const { language } = useContext(LanguageContext);
  const { setSelectedLetterSizes } = useContext(LetterSizeContext);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSize = (size) => {
    const newSelectedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSelectedSizes);
    setSelectedLetterSizes(newSelectedSizes);
    setIsOpen(false); // Close the dropdown
  };

  const clearSelectedSizes = () => {
    setSelectedSizes([]);
    setSelectedLetterSizes([]);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div
      className="relative flex flex-col items-center w-full"
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-white p-2 w-full flex items-center justify-between
        text-l tracking-wider border border-1 border-black transition-all
        duration-300"
      >
        {language === 'ar' ? 'أحجام حرفية مختارة' : language === 'fr' ? 'Tailles typographiques sélectionnées' : 'Selected letteric sizes'}
        {!isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </button>
      {isOpen && (
        <div
          className="bg-white absolute top-[45px] flex flex-col items-start p-1 w-full z-20
            border border-1 border-black shadow-md"
        >
          <div
            key="everything"
            onClick={() => {
              clearSelectedSizes();
              setIsOpen(false);
            }}
            className="flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent"
          >
            <h3>{language === 'ar' ? 'كل شيء' : language === 'fr' ? 'Tout' : 'Everything'}</h3>
          </div>
          {letterSizes.map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent ${
                selectedSizes.includes(size) ? "bg-gray-300" : ""
              }`}
            >
              <h3>{size}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterSizeDropdown;
