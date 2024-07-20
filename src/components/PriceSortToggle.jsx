import { FaSortNumericDownAlt } from "react-icons/fa";
import { FaSortNumericUpAlt } from "react-icons/fa";
import { LanguageContext } from "../contexts/LanguageContext";
import { PriceSortContext } from "../contexts/PriceSortContext";
import { useContext } from "react";
const PriceSortToggle = () => {
  const { language } = useContext(LanguageContext);
  const { priceSort, setPriceSort } = useContext(PriceSortContext);
  return (
    <div className="flex bg-white border border-black p-2 h-10 items-center cursor-pointer w-[120px]"
    
    onClick={()=>setPriceSort(!priceSort)}>
      {language === "ar"
        ? "فرز الأسعار"
        : language === "fr"
        ? "Prix Trier"
        : "Price Sorting"}
      {priceSort ? <FaSortNumericUpAlt className="mx-2"/> : <FaSortNumericDownAlt className="mx-2"/>}
    </div>
  );
};

export default PriceSortToggle;
