import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import CategoryDropdown from "../components/CategoryDropdown";
import { LanguageContext } from "../contexts/LanguageContext";
import ClipLoader from "react-spinners/ClipLoader";
import { TbMoodEmpty } from "react-icons/tb";
import PriceSortToggle from "../components/PriceSortToggle";
import RangeSlider from "../components/RangeSlider";
import SizeSlider from "../components/SizeSlider";
const Products = () => {
  const { products, loadingProducts, limitReached, fetchMoreProducts } =
    useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  const loadingRef = useRef(null);
  const [showRangeSlider, setShowRangeSlider] = useState(true);

  const toggleSlider = () => {
    setShowRangeSlider((prevState) => !prevState);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        loadingRef.current &&
        loadingRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let [loadingMoreProducts, setLoadingMoreProducts] = useState(false);
  const loadMore = async () => {
    if (!loadingMoreProducts) {
      setLoadingMoreProducts(true);
      loadingMoreProducts = true;
      await fetchMoreProducts();
      loadingMoreProducts = false;
      setLoadingMoreProducts(false);
    }
  };

  return (
    <div>
      <section className="py-16 bg-gray-100 ">
        <div className="p-4 sm:p-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-auto max-w-none md:mx-0 border bg-slate-50 p-4">
            <CategoryDropdown />
            <div className="flex items-center">
              <button
                onClick={toggleSlider}
                className={`px-2 py-1 my-1 rounded ${
                  showRangeSlider
                    ? "bg-[#4CAF50] text-white"
                    : "bg-white text-[#4CAF50] border border-[#4CAF50]"
                }`}
              >
                {showRangeSlider ? language === "ar"
                ? "الأحجام الرقمية"
                : language === "fr"
                ? "Tailles numériques"
                : "Numeric sizes" : 
                language === "ar"
                ? "الأحجام الأبجدية"
                : language === "fr"
                ? "Tailles alphabétiques"
                : "Alphabetic  sizes"}
              </button>
            </div>
            <div className="flex items-center">
              {showRangeSlider ? <RangeSlider /> : <SizeSlider />}
            </div>
            <PriceSortToggle />
          </div>
          {loadingProducts ? (
            <section className="h-screen flex justify-center items-center ">
              <ClipLoader />
            </section>
          ) : products.length === 0 ? (
            <section className="h-screen flex justify-center items-center text-2xl">
              {language === "ar"
                ? "دون نتائج"
                : language === "fr"
                ? "Aucun résultat"
                : "No results"}
              <TbMoodEmpty className="text-2xl mx-2" />
            </section>
          ) : (
            <div>
              <div
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-y-0 sm:gap-y-10 gap-x-1 sm:gap-x-5
      max-auto max-w-none md:mx-0 p-x-4 py-16 sm:px-4"
              >
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className={`relative ${
                      index % 2 === 0
                        ? "h-[220px] sm:h-[300px]"
                        : "h-[290px] sm:h-[370px]"
                    } flex items-center justify-center`}
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {!limitReached ? (
                <div ref={loadingRef} className="text-center mt-4">
                  <ClipLoader />
                </div>
              ) : (
                <div className="text-center mt-4"></div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
