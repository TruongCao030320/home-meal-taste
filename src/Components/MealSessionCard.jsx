import {
  faBowlFood,
  faCab,
  faCoins,
  faCookie,
  faDollar,
  faHomeLg,
  faKitchenSet,
  faNewspaper,
  faPlateWheat,
  faTable,
  faUpDown,
  faUser,
  faUserGroup,
  faUtensilSpoon,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { setCurrentArea } from "../redux/directionSlice";
import { direction } from "../API/Direction";
import { Checkbox, Image } from "antd";
import { formatMoney } from "../API/Money";
import MealDrawer from "./MealDrawer";
import { showDrawer } from "../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "./MealDrawer";
import { LuAreaChart, LuChefHat, LuPercent } from "react-icons/lu";
import {
  removeSelectedMealSessionKey,
  setSelectedMealSessionKey,
} from "../redux/SelectecedMealSessionKeySlice.js";
import { TbBrand4Chan, TbHome2 } from "react-icons/tb";
const MealSessionCard = ({ meal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    description,
    price,
    title,
    images,
    quantity,
    remainQuantity,
    mealSessionId,
    kitchenDtoForMealSession,
    areaDtoForMealSession,
    status,
    discountPercentage,
    stock,
    brand,
  } = meal || {};
  // console.log(meal);
  const { name: kitchenName } = kitchenDtoForMealSession || {};
  const { areaName } = areaDtoForMealSession || {};
  const [check, setCheck] = useState(false);

  const mealSessionIdKeys = useSelector(
    (state) => state.selectedMealSessionSlice.mealSessionKeys
  );
  // const { name: kitchenName } = kitchenDtoForMealSessions || {};
  //   const onHandleNavigateToAreaDetail = () => {
  //     navigate(`${direction.mealSessionInKitchen}/${record.kitchenId}`, {
  //       kitchenId: 2,
  //     });
  //   };
  const onHandleNavigateToAreaDetail = () => {
    // dispatch(setCurrentArea(areaId));
    // localStorage.setItem("areaId", areaId);
    // navigate(`${direction.manageChefInArea}/${areaId}`, {
    //   areaId: areaId,
    // });
  };
  const toggleDrawerType2 = async () => {
    dispatch(showDrawer(mealSessionId));
  };
  const onHandleCheckWhenAll = () => {
    const newArray = mealSessionIdKeys.flat();
    const isChecked = newArray.includes(mealSessionId);
    setCheck(isChecked);
    console.log("isCheck", isChecked);
  };
  useEffect(() => {
    // console.log(
    //   "Chạy",
    //   areaKeys.map((item) => item)
    // );
    onHandleCheckWhenAll();
    // console.log("mealsesionIdkeys", mealSessionIdKeys);
  }, [mealSessionIdKeys]);
  const onHandleCheck = (e) => {
    e.stopPropagation();
    if (e.target.checked) {
      dispatch(setSelectedMealSessionKey(mealSessionId));
      console.log(
        "có chạy checked là mealsessiondi lúc này truyền đi là",
        mealSessionId
      );
    } else {
      dispatch(removeSelectedMealSessionKey(mealSessionId));
    }
  };
  useEffect(() => {
    console.log("selectedMealSesionkeys là", mealSessionIdKeys);
  }, [mealSessionIdKeys]);
  return (
    <div
      className="w-[100%] min-h-[300px] max-h-[300px]  lg:min-h-[200px]   rounded-2xl shadow-lg border-none p-2 relative hover:cursor-pointer hover:shadow-2xl transition-all duration-500 "
      onClick={toggleDrawerType2}
    >
      <Checkbox
        className="absolute top-2 left-3"
        onClick={onHandleCheck}
        checked={check}
        disabled={
          status === "CANCELLED" ||
          status === "COMPLETED" ||
          status === "REJECTED"
            ? true
            : false
        }
      ></Checkbox>
      {/* <CustomDrawer meal={{}} /> */}
      <div className="h-[40%] rounded-lg overflow-hidden">
        <img src={images[0]} className=" max-w-full max-h-[200px] w-full"></img>
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-[#F1ECFF] rounded-lg my-2 h-[10%]">
        <h1 className="p-2 rounded-lg text-[#A285EE]  font-bold text-xs">
          {title}
        </h1>
      </div>
      <div className="w-full flex flex-col h-[30%] gap-1 ">
        {/* <div className="overflow-hidden h-[70%] w-full flex justify-center items-start text-blue-300">
          {description}
        </div> */}
        <div>
          <FontAwesomeIcon icon={faCoins} color="#FFD44E" className="mx-2" />
          <span className="font-bold text-blue-300">
            {" "}
            {formatMoney(price)} VND
          </span>
        </div>
        <div className="flex flex-row ">
          <LuPercent color="#FFD44E" fontSize={18} className="mx-2" />
          <span className="font-bold text-blue-300">{discountPercentage}%</span>
        </div>
        <div className="flex flex-row ">
          <TbHome2 color="#FFD44E" fontSize={18} className="mx-2" />
          <span className="font-bold text-blue-300">{stock}</span>
        </div>
        <div className="flex flex-row ">
          <TbBrand4Chan color="#FFD44E" fontSize={18} className="mx-2" />
          <span className="font-bold text-blue-300">{brand}</span>
        </div>
        <div className="absolute bottom-2 right-5">
          <span
            className={`font-bold ${
              status?.includes("APPROVED")
                ? "text-green-300"
                : status?.includes("PROCESSING")
                ? "text-blue-300"
                : status?.includes("MAKING")
                ? "text-yellow-300"
                : status?.includes("COMPLETED")
                ? "text-orange-300"
                : "text-gray-400"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MealSessionCard;
