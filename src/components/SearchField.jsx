import React, { useState, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { LanguageContext } from "../contexts/LanguageContext";
const SearchField = () => {
  const { language } = useContext(LanguageContext);
  return (
    <div className="relative flex flex-row items-center w-full border border-1 border-black bg-white">
      <input
        className="bg-white p-2 w-full flex items-center justify-between
    text-l focus:border-transparent focus:ring-0 outline-none"
        type="text"
        placeholder={
          language === "ar" ? "بحث" : language === "fr" ? "Recherche" : "Search"
        }
      ></input>
      <CiSearch className="mx-4 text-xl " />
    </div>
  );
};

export default SearchField;
