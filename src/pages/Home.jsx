import React, { useContext, useEffect, useState } from "react";
import Product from "../components/Product";
import { LanguageContext } from "../contexts/LanguageContext";
import { PosterContext } from "../contexts/PostersContext";
import { ProductContext } from "../contexts/ProductContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ClipLoader from "react-spinners/ClipLoader";
import { CategoryContext } from "../contexts/CategoryContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { posters, getPosters } = useContext(PosterContext);
  useEffect(() => {
    getPosters();
  }, []);
  // const [recommends ,setRecommends] = useState([])
  const { language } = useContext(LanguageContext);
  const { randomProducts, loadingProducts } = useContext(ProductContext);
  const { categories, toggleCategory } = useContext(CategoryContext);

  return (
    <div className="flex flex-col items-center">
      <Carousel
        className="max-w-[900px]  mt-32 mb-4"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {posters?.map((img) => (
          <div key={img._id}>
            <img src={img.url} />
          </div>
        ))}
      </Carousel>

      <div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-10 
      max-auto max-w-none md:mx-0 p-x-4 py-16 px-4 "
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            to="/products"
            className="text-center"
            onClick={() => toggleCategory(category)}
          >
            <img
              className="w-[100px] h-[100px] object-cover border border-black rounded-full cursor-pointer"
              key={category.id}
              src={category.imageUrl}
              alt=""
            />
            {category.name}
          </Link>
        ))}
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-y-0 sm:gap-y-10 gap-x-1
      max-auto max-w-none md:mx-0 p-x-4 py-16 px-4 bg-gray-200"
      >
        {loadingProducts ? (
          <section className="h-full w-full flex justify-center items-center">
            <ClipLoader />
          </section>
        ) : (
          randomProducts.map((product, index) => (
            <div
              key={product.id}
              className={`relative ${
                index % 2 === 0
                  ? "h-[220px] sm:h-[300px]"
                  : "h-[310px] sm:h-[370px]"
              } flex items-center justify-center`}
            >
              <Product product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
