import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { closeCart, openCart } from "../../redux/cartSlice";
import CartDrawer from "../../Pages/customer/CartDrawer";
import { MotionConfig, easeInOut, motion } from "framer-motion";
const Top = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleOpenCart = () => {
    console.log("dispatch Open cart");
    dispatch(openCart());
  };
  const itemCount = useSelector((state) => state.productSlice) || [];
  const totalQuantity = itemCount.reduce((total, currentItem) => {
    return total + currentItem.quantity;
  }, 0);
  return (
    <motion.div
      initial={{ y: -500, opacity: 0.5 }}
      transition={{ mass: 0.5, type: "spring", damping: 50 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="w-[98%] hidden top-4 left-0 right-0 fixed  z-50 mx-auto bg-white h-[70px] rounded-2xl shadow-2xl md:flex  lg:flex justify-between items-center"
    >
      <div className="h-full bg-red-200 flex items-center w-[100px] rounded-2xl justify-center">
        <h1 className="font-festive text-4xl text-white">T&S</h1>
      </div>
      <div className="flex flex-row w-[20%]  justify-around md:gap-7">
        <Link to="customerHome">
          <motion.h1
            initial={{
              opacity: 0.5,
              scale: 1.2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 2, ease: easeInOut, repeat: Infinity }}
            whileTap={{ scale: 0.9 }}
            className="font-mono text-red-200 hover:drop-shadow-xl"
          >
            Home
          </motion.h1>
        </Link>
        <Link to="shop">
          <motion.h1
            initial={{
              opacity: 0.5,
              scale: 1.2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 2, ease: easeInOut, repeat: Infinity }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="font-mono text-red-200 hover:drop-shadow-xl"
          >
            Shop
          </motion.h1>
        </Link>
        <Link to="cart">
          <motion.h1
            initial={{
              opacity: 0.5,
              scale: 1.2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 2, ease: easeInOut, repeat: Infinity }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="font-mono text-red-200 hover:drop-shadow-xl"
          >
            Cart
          </motion.h1>
        </Link>{" "}
      </div>
      <div className="w-[5%] flex justify-around mx-7 gap-5">
        <FontAwesomeIcon
          icon={faUser}
          size="xl"
          className="text-red-200 cursor-pointer hover:text-red-500"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className=" relative">
          <FontAwesomeIcon
            icon={faCartShopping}
            size="xl"
            className="text-red-200 cursor-pointer hover:text-red-500"
            onClick={onHandleOpenCart}
          />
          <h3 className="absolute top-[-6px] right-[-5px] text-xs font-bold bg-red-500 text-white rounded-full px-1">
            {totalQuantity}
          </h3>
        </div>
      </div>
      <div className="absolute">
        <CartDrawer />
      </div>
    </motion.div>
  );
};

export default Top;
