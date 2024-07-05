import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { LanguageContext } from "../contexts/LanguageContext";
import ClipLoader from "react-spinners/ClipLoader";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
const Home = () => {
  const { products, loadingProducts } = useContext(ProductContext);

  const { language } = useContext(LanguageContext);

  return (
    <div className="flex flex-col items-center">
     
        <Carousel className="max-w-[900px] mt-32" autoPlay={true} infiniteLoop={true}>
          <div>
            <img src={img1} />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src={img2} />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src={img3} />
            <p className="legend">Legend 3</p>
          </div>
          <div className="h-full flex items-center">
            <img src={img4} />
          </div>
        </Carousel>
     
      <div className="flex flex-wrap justify-center max-w-[1600px] bg-red-500">
        {Array.from({ length: 10 }, (_, i) => i).map((i) => (
          <Product
            product={{ _id: i, category: "tshirt", engName: "red shirt",price:120 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
