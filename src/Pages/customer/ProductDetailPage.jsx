import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import image from "../../assets/images/headphone.jpg";
import image2 from "../../assets/images/watch.jpg";
import image3 from "../../assets/images/camera.jpg";
const products = [
  {
    id: faker.string.uuid(),
    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 21,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 22,
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
    price: 27,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 32,
    isLike: false,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 54,
    isLike: true,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Headphone",
    image: image,
    description: "Description",
    price: 15,
    isLike: true,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Watch",
    image: image2,
    description: "Description",
    price: 86,
    isLike: true,
  },
  {
    id: faker.string.uuid(),
    title: "Smart Camera",
    image: image3,
    description: "Description",
    price: 90,
    isLike: true,
  },
];
const ProductDetailPage = () => {
  const { id } = useParams();
  const [reviewImage, setReviewImage] = useState(image);
  return (
    <div className="mt-36 flex flex-col justify-center items-center h-full gap-10">
      <h1>Product Detail</h1>
      <div className="w-full flex flex-col items-center gap-4 md:flex-row md:justify-around md:items-start md:h-full">
        <div className="w-full lg:w-[40%]">
          <img
            src={reviewImage}
            alt=""
            className="w-full rounded-2xl mb-10 transition-all duration-1000 max-w-[700px] max-h-[500px]"
            width={500}
            height={500}
          />
          <div className="w-full flex flex-row justify-around ">
            <img
              src={image}
              alt=""
              width={100}
              height={100}
              className="rounded-2xl cursor-pointer hover:border-cyan-300 hover:drop-shadow-xl transition-all duration-500 hover:scale-150"
              onMouseOver={() =>
                setTimeout(() => {
                  setReviewImage(image);
                }, 500)
              }
              onMouseLeave={() => {
                setTimeout(() => {
                  setReviewImage(image);
                }, 500);
              }}
            />
            <img
              src={image2}
              alt=""
              width={100}
              height={100}
              className="rounded-2xl cursor-pointer hover:border-cyan-300 hover:drop-shadow-xl transition-all duration-500 hover:scale-150"
              onMouseOver={() =>
                setTimeout(() => {
                  setReviewImage(image2);
                }, 500)
              }
              onMouseLeave={() => {
                setTimeout(() => {
                  setReviewImage(image);
                }, 500);
              }}
            />
            <img
              src={image3}
              alt=""
              width={100}
              height={100}
              className="rounded-2xl cursor-pointer hover:border-cyan-300 hover:drop-shadow-xl transition-all duration-500 hover:scale-150"
              onMouseOver={() =>
                setTimeout(() => {
                  setReviewImage(image3);
                }, 500)
              }
              onMouseLeave={() => {
                setTimeout(() => {
                  setReviewImage(image);
                }, 500);
              }}
            />
          </div>
        </div>
        <div className="w-[90%] lg:w-[40%] bg-white rounded-2xl p-4">
          <h1>{products[0].title}</h1>
          <p className="text-gray-300">{products[0].description}</p>
          <h1>{products[0].price}$</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
