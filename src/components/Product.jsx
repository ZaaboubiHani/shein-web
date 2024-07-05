import React, { useContext } from "react";
import { Link } from "react-router-dom/dist";
import { BsEyeFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { LanguageContext } from "../contexts/LanguageContext";
import tshirt from '../assets/tshirt.jpg';
const Product = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const {
    _id,
   category,
   engName,
    price,
    color,
  } = product;
 
  return (
    <div className="bg-white relative rounded-2xl shadow-md m-2">
      
    
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded-2xl">
        <div className="w-full h-full flex justify-center items-center">
          {/* Image */}
          <div className="w-full mx-auto flex justify-center items-center">
            <Link to={`/product/${_id}`}>
              <img
                className="max-w-[270px] m-2 group-hover:scale-110 transition duration-[2000ms] rounded-2xl"
                src={tshirt}
                alt=""
              />
            </Link>
          </div>
        </div>
        
      </div>
      {/* catergory title and price */}
      <div className="px-4 pb-4">
        
        <div
          className={`text-sm capitalize text-gray-500 ${
            language === "ar" ? "text-right" : "text-left"
          } `}
        >
          {language === "ar"
            ? category.arName
            : language === "fr"
            ? category?.frName
            : category.engName}
        </div>
        <Link to={`/product/${_id}`}>
          <h2
            className={`font-semibold mb-1 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar" ? arName : language === "fr" ? frName : engName}
          </h2>
        </Link>
        <div
          className={`font-semibold ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {language === "ar" ? "دج " : language === "fr" ? "DA " : "DZD "}
          {price}
        </div>
      </div>
    </div>
  );
};

export default Product;
