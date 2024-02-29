import { Divider, Drawer } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "../../redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addItemToCart, minusItem, removeItem } from "../../redux/productCart";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartSlice.isOpen);
  const cartItems = useSelector((state) => state.productSlice) || [];
  const onHandleClose = () => {
    dispatch(closeCart());
  };

  const CartItem = ({ item }) => {
    return (
      <div className="w-full flex flex-row justify-between items-center gap-4 my-5 p-2 border-b-2">
        <img src={item?.imageUrl} alt="" width={80} height={80} />
        <div className="flex flex-col">
          <p className="font-bold">{item?.title}</p>
          <p className="font-bold">Price: {item?.price}$</p>
          {/* quantity */}
          <div className="flex flex-row justify-normal items-center gap-5">
            <FontAwesomeIcon
              icon={faMinus}
              size="sm"
              color="gray"
              className="cursor-pointer hover:text-red-400"
              onClick={() => {
                dispatch(minusItem(item));
              }}
            />
            <div className="w-[50%] bg-gray-300 min-w-[50px] flex justify-center items-center">
              <p className="font-bold">{item?.quantity}</p>
            </div>
            <FontAwesomeIcon
              icon={faPlus}
              size="sm"
              color="gray"
              className="cursor-pointer hover:text-red-400"
              onClick={() => {
                dispatch(addItemToCart(item));
              }}
            />
          </div>
        </div>
        <FontAwesomeIcon
          icon={faTrash}
          size="sm"
          color="gray"
          className="cursor-pointer hover:text-red-400"
          onClick={() => {
            dispatch(removeItem(item));
          }}
        />
      </div>
    ); // Just for demonstration, replace {item} with the content you want to display
  };
  return (
    <div>
      <Drawer
        size="default"
        title="Your Cart Items"
        open={cartState}
        onClose={onHandleClose}
      >
        {cartItems?.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </Drawer>
    </div>
  );
};

export default CartDrawer;
