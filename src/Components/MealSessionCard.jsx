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
import React from "react";
import { BiRestaurant } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { setCurrentArea } from "../redux/directionSlice";
import { direction } from "../API/Direction";
import { Image } from "antd";
import { formatMoney } from "../API/Money";
import MealDrawer from "./MealDrawer";
import { showDrawer } from "../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "./MealDrawer";
import { LuChefHat } from "react-icons/lu";
const MealSessionCard = ({ meal }) => {
  const navigate = useNavigate();
  console.log("MealSessionCard", meal);
  console.log(meal);
  const dispatch = useDispatch();
  const {
    mealDtoForMealSession,
    price,
    quantity,
    remainQuantity,
    mealSessionId,
    kitchenDtoForMealSession,
    status,
  } = meal || {};
  const { name, image } = mealDtoForMealSession || {};
  const { name: kitchenName } = kitchenDtoForMealSession || {};
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
  return (
    <div
      className="w-[100%] min-h-[300px]  lg:min-h-[200px]   rounded-2xl shadow-lg border-none p-2 relative hover:cursor-pointer hover:shadow-2xl transition-all duration-500 "
      onClick={toggleDrawerType2}
    >
      {/* <CustomDrawer meal={{}} /> */}
      <div className="  h-[40%] rounded-lg overflow-hidden">
        <img src={image} className=" max-w-full max-h-[200px] w-full"></img>
      </div>
      <div className="w-full flex flex-col justify-center items-center bg-[#F1ECFF] rounded-lg my-2 h-[10%]">
        <h1 className="p-2 rounded-lg text-[#A285EE]  font-bold text-xs">
          {name}
        </h1>
      </div>
      <div className="w-full flex flex-col h-[35%]">
        <div>
          <FontAwesomeIcon icon={faCoins} color="#FFD44E" className="mx-2" />
          <span className="font-bold text-blue-300">
            {" "}
            {formatMoney(price)} VND
          </span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faUserGroup}
            color="#FFD44E"
            className="mx-2"
          />
          <span className="font-bold text-blue-300">
            {remainQuantity}/{quantity} Slots
          </span>
        </div>
        <div className="flex flex-row ">
          <LuChefHat color="#FFD44E" fontSize={18} className="mx-2" />
          <span className="font-bold text-blue-300">{kitchenName}</span>
        </div>
        <div className="absolute bottom-2 right-5">
          <span
            className={`font-bold ${
              status.includes("APPROVED")
                ? "text-green-300"
                : status.includes("PROCESSING")
                ? "text-blue-300"
                : status.includes("MAKING")
                ? "text-yellow-300"
                : status.includes("COMPLETED")
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
