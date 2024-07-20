import React, { useContext, useEffect, useState } from "react";
import Product from "../components/Product";
import { LanguageContext } from "../contexts/LanguageContext";
import { PosterContext } from "../contexts/PostersContext";
import { ProductContext } from "../contexts/ProductContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Recommendations from "../components/Recommendations";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const { posters, getPosters } = useContext(PosterContext);
  useEffect(() => {
    getPosters();
  }, []);
  // const [recommends ,setRecommends] = useState([])
  const { language } = useContext(LanguageContext);
  const { randomProducts,loadingProducts } = useContext(ProductContext);

  return (
    <div className="flex flex-col items-center">
      <Carousel
        className="max-w-[900px] w-full mt-32 mb-4"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        {posters?.map((img) => (
          <div key={img._id}>
            <img src={img.url} />
           
          </div>
        ))}
      </Carousel>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[16px] max-auto max-w-none md:mx-0 p-4 bg-gray-200 ">
        {loadingProducts ? (
            <section className="h-full w-full flex justify-center items-center ">
              <ClipLoader />
            </section>
          ) : randomProducts.map((product) => (
          <Product
            product={product}
          />
        ))}
      </div>
      {/* <Recommendations recommends={recommends}/> */}

    </div>
  );
};

export default Home;
