import React from "react";
import cam from "../../../assets/images/camera.jpg";
import { Button, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../redux/productCart";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    // bg-[#F8FAFC]
    <div className="rounded-2xl p-2 flex flex-col gap-3  justify-between w-[350px]  bg-[#F8FAFC]  hover:scale-90 transition-all duration-1000 cursor-pointer relative">
      <FontAwesomeIcon
        icon={faHeart}
        color={product?.isLike ? "red" : "white"}
        className="absolute right-4 top-4"
        // onClick={}
      />
      <img
        src={product?.image}
        alt=""
        className="w-full h-[300px] rounded-2xl"
        onClick={() => {
          navigate(`/product-detail/${product.id}`);
        }}
      />
      <h1>{product?.title}</h1>
      <p className="text-gray-300">{product?.description}</p>
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
    </div>
  );
};

export default ProductCard;
