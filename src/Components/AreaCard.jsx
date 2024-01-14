import {
  faBowlFood,
  faCookie,
  faHomeLg,
  faNewspaper,
  faPlateWheat,
  faUser,
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
import { Checkbox, Tag } from "antd";
import { LuChefHat } from "react-icons/lu";
import {
  removeSelectedKey,
  resetAreaKey,
  setSelectedKey,
} from "../redux/SelectecedKeySlice";

const AreaCard = ({ area }) => {
  const navigate = useNavigate();
  // console.log("AreaCard", area.status);
  const dispatch = useDispatch();
  const areaKeys = useSelector((state) => state.selectedSlice.areaKeys) || [];
  const [check, setCheck] = useState(false);
  const {
    // areaId,
    // address,
    // areaName,
    status,
    districtId,
    totalMealSessions,
    totalOrders,
    totalChefs,
  } = area || {};
  const { areaId, address, areaName } = area?.areaDtoForSessionArea || {};
  //   const onHandleNavigateToAreaDetail = () => {
  //     navigate(`${direction.mealSessionInKitchen}/${record.kitchenId}`, {
  //       kitchenId: 2,
  //     });
  //   };
  const onHandleNavigateToAreaDetail = () => {
    dispatch(setCurrentArea(areaId));
    localStorage.setItem("areaId", areaId);
    navigate(`${direction.manageChefInArea}/${areaId}`, {
      areaId: areaId,
    });
  };
  const onCheck = (e) => {
    e.stopPropagation();
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(setSelectedKey(areaId));
      console.log("có chạy checked là areaId lúc này truyền đi là", areaId);
    } else {
      dispatch(removeSelectedKey(areaId));
    }
  };
  const onHandleCheck = () => {
    const newArray = areaKeys.flat();
    const isChecked = newArray.includes(areaId);
    setCheck(isChecked);
  };
  useEffect(() => {
    // console.log(
    //   "Chạy",
    //   areaKeys.map((item) => item)
    // );
    onHandleCheck();
  }, [areaKeys]);
  useEffect(() => {
    dispatch(resetAreaKey());
  }, []);
  return (
    <div
      className="w-[100%] h-[150px] bg-white rounded-2xl shadow-lg border-none p-2 relative hover:cursor-pointer hover:shadow-2xl transition-all duration-500"
      onClick={onHandleNavigateToAreaDetail}
    >
      <div
        className={`w-full flex flex-col justify-center items-center ${
          status.includes("FINISHED") ? "bg-[#F6FFED] border" : ""
        } bg-[#F1ECFF] rounded-lg`}
      >
        <div className="flex flex-row relative">
          <Checkbox onClick={onCheck} checked={check}></Checkbox>
          <h1
            className={`p-2 rounded-lg  ${
              status.includes("FINISHED") ? "text-black" : "text-[#A285EE]"
            }  font-bold text-xs`}
          >
            {areaName}
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <p>{address}</p>
      </div>
      <div className="w-full flex flex-row justify-center items-center absolute bottom-2">
        <Tag
          color={
            status.includes("OPEN")
              ? "blue"
              : status.includes("CANCELLED")
              ? "red"
              : "green"
          }
          className="px-4"
        >
          {status}
        </Tag>
        <div>
          {/* <FontAwesomeIcon icon={faUtensils} color="#FFD44E" className="mx-2" /> */}
          <LuChefHat color="#FFD44E" className="mx-2" />
          {totalChefs}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faNewspaper}
            color="#FFD44E"
            className="mx-2"
          />

          {totalOrders}
        </div>
        <div>
          <FontAwesomeIcon
            icon={faPlateWheat}
            color="#FFD44E"
            className="mx-2"
          />

          {totalMealSessions}
        </div>
      </div>
    </div>
  );
};

export default AreaCard;
