import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from "../../assets/images/headphone.jpg";
import image2 from "../../assets/images/watch.jpg";
import image3 from "../../assets/images/camera.jpg";
import { getSingleProduct } from "../../API/newApi";
import { Button, Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faShop } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/productCart";
const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [reviewImage, setReviewImage] = useState(image);
  const [product, setProduct] = useState();
  const handleAddItem = () => {
    dispatch(addItemToCart(product));
  };
  useEffect(() => {
    getSingleProduct(id).then((res) => {
      setProduct(res);
      setReviewImage(product?.thumbnail);
    });
  }, [id]);
  return (
    <div className="mt-36 flex flex-col justify-center items-center h-full gap-10">
      <h1>Product Detail</h1>
      <div className="w-full flex flex-col items-center gap-4 md:flex-row md:justify-around md:items-start md:h-full">
        <motion.div
          initial={{
            x: -200,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="w-full lg:w-[40%]"
        >
          <img
            initial={{
              x: -200,
              opacity: 0.5,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            src={reviewImage ? reviewImage : product?.images[0]}
            alt=""
            className="w-full rounded-2xl mb-10  max-w-[500px] max-h-[400px]"
            width={"100%"}
            height={"100%"}
          />
          <div className="w-full flex flex-row justify-around ">
            <img
              src={product?.images[0]}
              alt=""
              width={120}
              height={120}
              className="rounded-2xl cursor-pointer hover:border-cyan-300 hover:drop-shadow-xl transition-all duration-500 hover:scale-110"
              onMouseOver={() =>
                setTimeout(() => {
                  setReviewImage(product?.images[0]);
                }, 500)
              }
              onMouseLeave={() => {
                setTimeout(() => {
                  setReviewImage(product?.thumbnail);
                }, 500);
              }}
            />
            <img
              src={product?.images[1]}
              alt=""
              width={100}
              height={100}
              className="rounded-2xl cursor-pointer hover:border-cyan-300 hover:drop-shadow-xl transition-all duration-500 hover:scale-110"
              onMouseOver={() =>
                setTimeout(() => {
                  setReviewImage(product?.images[1]);
                }, 500)
              }
              onMouseLeave={() => {
                setTimeout(() => {
                  setReviewImage(product?.thumbnail);
                }, 500);
              }}
            />
            <img
              src={product?.images[2]}
              alt=""
              width={100}
              height={100}
              className="rounded-2xl cursor-pointer hover:border-cyan-300 hover:drop-shadow-xl transition-all duration-500 hover:scale-110"
              onMouseOver={() =>
                setTimeout(() => {
                  setReviewImage(product?.images[2]);
                }, 500)
              }
              onMouseLeave={() => {
                setTimeout(() => {
                  setReviewImage(product?.thumbnail);
                }, 500);
              }}
            />
          </div>
        </motion.div>
        <div className="w-[90%] lg:w-[40%] bg-white rounded-2xl p-4 min-h-[400px] leading-7 flex flex-col justify-around">
          <h1 className="font-bold text-2xl">{product?.title}</h1>
          <h1>{product?.category}</h1>
          <p className="text-gray-300 text-xl">{product?.description}</p>
          <div className="flex flex-row justify-between">
            <h1>
              {product?.brand} {product?.price}$
            </h1>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-3">
              <h1>{Math.floor(product?.rating)}</h1>
              <Rate value={Math.floor(product?.rating)} disabled />
            </div>
            <Button
              className="flex gap-4 justify-center items-center p-5"
              onClick={handleAddItem}
            >
              Add To Cart <FontAwesomeIcon icon={faCartArrowDown} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
