import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  faCameraAlt,
  faFire,
  faHeadphones,
  faLaptop,
  faMobilePhone,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import InforSection from "./child/InforSection";
import { Carousel, Divider } from "antd";
import image from "../../assets/images/headphone.jpg";
import image2 from "../../assets/images/watch.jpg";
import image3 from "../../assets/images/camera.jpg";
import ProductCard from "./child/ProductCard";
import Slider from "react-slick";
import TrackingCard from "./child/TrackingCard";
import { da, faker } from "@faker-js/faker";
import human1 from "../../assets/images/human1.jpg";
import human2 from "../../assets/images/human2.jpg";
import human3 from "../../assets/images/human3.jpg";
import ClientSayCard from "./child/ClientSayCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../API/newApi";
import { easeInOut, motion } from "framer-motion";
import ProductSlideCard from "./child/ProductSlideCard";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1286,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 978,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
var setting2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Home = () => {
  const [isActive, setIsActive] = useState(1);
  const [result, setResult] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => setResult(res.products));
  }, [isActive]);
  // useEffect(() => {
  //   let filteredArray = data?.products || [];

  //   if (isActive === 1) {
  //     filteredArray = filteredArray.filter((item) => {
  //       if (item.category.includes("laptops")) console.log("Tìm đc laptop");
  //       return item.category.includes("laptops");
  //     });
  //     console.log("vào đây", { filteredArray });
  //   }
  //   if (isActive === 1) {
  //     filteredArray = filteredArray.filter((item) => {
  //       return item.category.includes("smartphones");
  //     });
  //   }
  //   setResult(filteredArray);
  // }, [isActive]);
  return (
    <div className="">
      {/* infor-section */}
      <section className="mt-36 infor">
        <Carousel autoplay>
          {result.splice(0, 5).map((item) => (
            <InforSection item={item} key={item.title} />
          ))}
        </Carousel>
      </section>
      {/* product-section */}
      <section className="product-section bg-white my-5 py-1 px-5">
        <motion.h1
          initial={{
            y: -10,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          className="font-sans my-10 text-5xl"
        >
          Best-seller <FontAwesomeIcon icon={faFire} />
        </motion.h1>
        <Slider {...settings} className="my-10">
          {result?.map((product) => (
            <ProductSlideCard product={product} />
          ))}
        </Slider>
        <Divider className="bg-white" />
      </section>
      {/* tracking-section */}
      <section className="my-10 py-10">
        <TrackingCard />
      </section>
      {/* category section */}
      <section className="my-10 py-1 px-5">
        <Divider className="bg-white" />
        <motion.h1
          initial={{
            x: -50,
            opacity: 0.2,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="font-sans my-10 text-5xl text-white"
        >
          Store <FontAwesomeIcon icon={faStore} />
        </motion.h1>
        <motion.div
          initial={{
            x: 50,
            opacity: 0.2,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="flex flex-col justify-center items-center lg:my-10 "
        >
          <ul className="grid grid-cols-1 gap-4  w-[50%] justify-between text-white md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            <li
              className={`${
                isActive == 1 ? "active" : ""
              } flex flex-row justify-center items-center gap-2 p-2 rounded-2xl cursor-pointer hover:shadow-xl hover:border hover:border-blue-200 transition-all duration-500`}
              onClick={() => setIsActive(1)}
            >
              <FontAwesomeIcon icon={faLaptop} />
              <h1>Laptop</h1>
            </li>
            <li
              className={`${
                isActive == 2 ? "active" : ""
              } flex flex-row justify-center items-center gap-2 p-2 rounded-2xl cursor-pointer hover:shadow-xl hover:border hover:border-blue-200 transition-all duration-500`}
              onClick={() => setIsActive(2)}
            >
              <FontAwesomeIcon icon={faMobilePhone} />
              <h1>Smart Phone</h1>
            </li>
            <li
              className={`${
                isActive == 3 ? "active" : ""
              } flex flex-row justify-center items-center gap-2 p-2 rounded-2xl cursor-pointer hover:shadow-xl hover:border hover:border-blue-200 transition-all duration-500`}
              onClick={() => setIsActive(3)}
            >
              <FontAwesomeIcon icon={faHeadphones} />
              <h1>Headphone</h1>
            </li>
            <li
              className={`${
                isActive == 4 ? "active" : ""
              } flex flex-row justify-center items-center gap-2 p-2 rounded-2xl cursor-pointer hover:shadow-xl hover:border hover:border-blue-200 transition-all duration-500`}
              onClick={() => setIsActive(4)}
            >
              <FontAwesomeIcon icon={faCameraAlt} />
              <h1>Camera</h1>
            </li>
          </ul>
          <div className="w-full bg-white  rounded-2xl flex  my-10 p-5">
            {isActive == 1 ? (
              <motion.div
                initial={{
                  opacity: 0,
                  x: -500,
                  scale: 0.7,
                }}
                whileInView={{
                  opacity: 1,
                  x: [100, 50, 20, 0],
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: easeInOut,
                  damping: 1000,
                }}
                className="grid grid-cols-1 gap-2 transition-all animate-appear1 md:grid-cols-2 lg:grid lg:grid-cols-4"
              >
                {result?.splice(0, 8).map((product) => (
                  <ProductCard product={product} />
                ))}
              </motion.div>
            ) : isActive == 2 ? (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear2 md:grid-cols-2  lg:grid lg:grid-cols-4">
                {result?.splice(0, 8).map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            ) : isActive == 3 ? (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear1 md:grid-cols-2 lg:grid lg:grid-cols-4">
                {result?.splice(0, 8).map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear2 md:grid-cols-2 lg:grid lg:grid-cols-4">
                {result?.splice(0, 8).map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>
      {/* what client say section */}
      <section className="w-full bg-white min-h-[300px] p-2 flex flex-col">
        <div className="w-full flex justify-center items-center my-5">
          <h1 className="text-2xl font-bold">What Client Says</h1>
        </div>
        <Slider {...setting2}>
          <ClientSayCard />
          <ClientSayCard />
          <ClientSayCard />
        </Slider>
      </section>
    </div>
  );
};

export default Home;
{
  /* <div>
  <img src={image2} alt="" />
  <h1>{faker.internet.userName()}</h1>
  <p className="text-green-300">
    We've recently updated our entire product portfolio to give customers and
    partners the best products with the newest
  </p>
</div>; */
}
