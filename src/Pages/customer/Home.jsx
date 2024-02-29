import React, { useState } from "react";
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
import { faker } from "@faker-js/faker";
import human1 from "../../assets/images/human1.jpg";
import human2 from "../../assets/images/human2.jpg";
import human3 from "../../assets/images/human3.jpg";
import ClientSayCard from "./child/ClientSayCard";

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
const data = [
  {
    id: faker.string.uuid(),

    title: "Smart Headphone",
    image: image,
  },
  {
    title: "Smart Watch",
    image: image2,
  },
  {
    title: "Smart Camera",
    image: image3,
  },
];
const products = [
  {
    id: faker.string.uuid(),

    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 25,
    isLike: false,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 25,
    isLike: false,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 25,
    isLike: false,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 25,
    isLike: false,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 25,
    isLike: false,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 25,
    isLike: true,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 25,
    isLike: true,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 25,
    isLike: true,
  },
  {
    id: faker.string.uuid(),

    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 25,
    isLike: true,
  },
];
const Home = () => {
  const [isActive, setIsActive] = useState(0);
  return (
    <div className="">
      {/* infor-section */}
      <section className="mt-36 infor">
        <Carousel autoplay>
          {data.map((item) => (
            <InforSection item={item} key={item.title} />
          ))}
        </Carousel>
      </section>
      {/* product-section */}
      <section className="product-section bg-white my-5">
        <h1 className="font-sans my-10 text-5xl">
          Best-seller <FontAwesomeIcon icon={faFire} />
        </h1>
        <Slider {...settings}>
          {products?.map((product) => (
            <ProductCard product={product} />
          ))}
        </Slider>
      </section>
      {/* tracking-section */}
      <section className="my-10">
        <Divider className="bg-white" />
        <TrackingCard />
      </section>
      {/* category section */}
      <section className="my-10">
        <Divider className="bg-white" />
        <h1 className="font-sans my-10 text-5xl text-white">
          Store <FontAwesomeIcon icon={faStore} />
        </h1>
        <div className="flex flex-col justify-center items-center">
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
          <div className="w-[95%] bg-white p-5 my-10 rounded-2xl">
            {isActive == 1 ? (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear1 md:grid-cols-2 lg:grid lg:grid-cols-3">
                {products?.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            ) : isActive == 2 ? (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear2 md:grid-cols-2 lg:grid lg:grid-cols-3">
                {products?.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            ) : isActive == 3 ? (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear1 md:grid-cols-2 lg:grid lg:grid-cols-3">
                {products?.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 transition-all animate-appear2 md:grid-cols-2 lg:grid lg:grid-cols-3">
                {products?.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
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
