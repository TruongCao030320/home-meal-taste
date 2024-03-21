import React from "react";
import cam from "../../../assets/images/camera.jpg";
import { Button, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/productCart";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const ProductSlideCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    // bg-[#F8FAFC]
    <motion.div
      initial={{
        y: 200,
        opacity: 0.5,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl p-2 flex flex-col gap-3  justify-between w-[95%]  bg-[#F8FAFC]  hover:scale-90 transition-all duration-1000 cursor-pointer relative lg:max-h-[500px]"
    >
      <FontAwesomeIcon
        icon={faHeart}
        color={product?.isLike ? "red" : "white"}
        className="absolute right-4 top-4"
        // onClick={}
      />
      <img
        src={product?.thumbnail}
        alt=""
        className="w-full h-[300px] rounded-2xl object-cover"
        onClick={() => {
          navigate(`/product-detail/${product.id}`);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      />
      <h1>{product?.title}</h1>
      <p className="text-gray-300  max-h-[30px] overflow-hidden">
        {product?.description}...
      </p>
      <div className="flex flex-row justify-between">
        <Tag className="bg-white border-2 px-5 rounded-lg w-[15%] flex justify-center items-center">
          <p className="font-bold">{product?.price}$</p>
        </Tag>
        <Button
          onClick={() => {
            console.log(product);
            dispatch(addItemToCart({ ...product, quantity: 1 }));
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductSlideCard;
