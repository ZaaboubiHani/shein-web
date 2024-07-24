import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MenuContext } from "../contexts/MenuContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiLoincloth } from "react-icons/gi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { CategoryContext } from "../contexts/CategoryContext";
import { IoIosArrowForward } from "react-icons/io";
const Menu = () => {
  const navigate = useNavigate();
  const { menuIsOpen, handleCloseMenu } = useContext(MenuContext);
  const { language } = useContext(LanguageContext);
  const { categories, toggleCategory } = useContext(CategoryContext);

  return (
    <div
      className={`${
        menuIsOpen ? "left-0" : "-left-full"
      } flex flex-col w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-30 px-4 lg:px-[35px]
 
  `}
    >
      <div
        onClick={handleCloseMenu}
        className="cursor-pointer w-8 h-16 flex justify-center items-center"
      >
        <IoMdArrowBack className="text-2xl" />
      </div>

      <Link
        to="/"
        onClick={() => handleCloseMenu()}
        className="hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6 flex items-center"
      >
        <FaHome className="text-2xl mr-4" />
        {language === "ar" ? "إستقبال" : language === "fr" ? "ACCUEIL" : "HOME"}
      </Link>

      <Link
        to="/products"
        onClick={() => handleCloseMenu()}
        className="hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6 flex items-center"
      >
        <GiLoincloth className="text-2xl mr-4" />
        {language === "ar"
          ? "منتجات"
          : language === "fr"
          ? "PRODUITS"
          : "PRODUCTS"}
      </Link>
      <div className="">
        {categories.map((category, index) => (
          <div key={index}>
            <Link
              to="/products"
              className={`text-center flex items-center px-4 py-2 ml-8 justify-between
              ${index % 2 == 0 ? 'bg-white' : 'bg-green-50'} hover:bg-slate-100 transition-all duration-300`}
              onClick={() => {
                handleCloseMenu();
                toggleCategory(category);
              }}
            >
              <div className="flex items-center">
                <img
                  className="w-[50px] h-[50px] object-cover border border-black rounded-full cursor-pointer mr-4"
                  key={category.id}
                  src={category.imageUrl}
                  alt=""
                />
                {category.name}
              </div>
              <IoIosArrowForward />
            </Link>
            {index < categories.length - 1 && (
              <div className="border border-black border-b-1 opacity-50 ml-10 " />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
