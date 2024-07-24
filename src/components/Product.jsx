import React, { useContext } from "react";
import { Link } from "react-router-dom/dist";
import { LanguageContext } from "../contexts/LanguageContext";
const Product = ({ product }) => {
  const { language } = useContext(LanguageContext);

  const {
    _id,
    category,
    name,
    buyPrice,
    imageUrl,
    size,
    isSale,
    salePrice,
    new: isNew,
    createdAt,
  } = product;

  return (
    <Link to={`/product/${_id}`}>
      <div className="bg-white relative shadow-md w-[180px] sm:w-[240px] rounded-lg">
        <div className="border border-[#e4e4e4] h-[200px] sm:h-[300px] mb-4 relative overflow-hidden group transition ">
          <div className="w-full h-full flex justify-center items-center">
            {/* Image */}
            <div className="w-full mx-auto flex justify-center items-center">
              <Link to={`/product/${_id}`}>
                <img
                  className=" group-hover:scale-110 transition duration-[2000ms]"
                  src={imageUrl}
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
        {/* catergory title and buyPrice */}
        <div className="px-4 pb-4">
          <div
            className={`text-sm capitalize text-gray-500 ${
              language === "ar" ? "text-right" : "text-left"
            } `}
          >
            {language === "ar"
              ? category.name
              : language === "fr"
              ? category?.name
              : category.name}
          </div>
          <Link to={`/product/${_id}`}>
            <h2
              className={`font-semibold mb-1 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {language === "ar"
                ? category.name
                : language === "fr"
                ? category?.name
                : category.name}
              {" (" + size + ") "}
            </h2>
          </Link>
          <div
            className={`flex ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            } `}
          >
            <div
              className={`font-semibold  ${
                language === "ar" ? "text-right ml-4" : "text-left mr-4"
              } 
            ${isSale ? "line-through text-gray-400" : ""}`}
            >
              {language === "ar" ? "دج " : language === "fr" ? "DA " : "DZD "}
              {buyPrice}
            </div>
            {isSale ? (
              <div
                className={`font-semibold ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {language === "ar" ? "دج " : language === "fr" ? "DA " : "DZD "}
                {salePrice}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
