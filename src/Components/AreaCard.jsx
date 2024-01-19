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
import { PiNewspaperClipping } from "react-icons/pi";
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
    areaId,
    address,
    areaName,
    status,
    districtId,
    totalMealSessions,
    totalOrders,
    totalChefs,
    sessionAreaId,
  } = area || {};
  // const { areaId, address, areaName } = area?.areaDtoForSessionArea || {};
  //   const onHandleNavigateToAreaDetail = () => {
  //     navigate(`${direction.mealSessionInKitchen}/${record.kitchenId}`, {
  //       kitchenId: 2,
  //     });
  //   };
  const onHandleNavigateToAreaDetail = () => {
    dispatch(setCurrentArea(areaId));
    localStorage.setItem("areaId", areaId);
    console.log("SessionAreaId truyền đi là", sessionAreaId);
    navigate(`${direction.manageChefInArea}/${sessionAreaId}`, {
      sessionAreaId: sessionAreaId,
    });
  };
  const onCheck = (e) => {
    e.stopPropagation();
    console.log(e.target.checked);
    if (e.target.checked) {
      dispatch(setSelectedKey(sessionAreaId));
      console.log(
        "có chạy checked là areaId lúc này truyền đi là",
        e.target.checked
      );
    } else {
      dispatch(removeSelectedKey(sessionAreaId));
      console.log(
        "có chạy checked là areaId lúc này truyền đi là",
        e.target.checked
      );
    }
  };
  const onHandleCheck = () => {
    const newArray = areaKeys.flat();
    const isChecked = newArray.includes(sessionAreaId);
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
      className=" w-[90%] h-[150px] bg-white rounded-2xl shadow-lg border-none  relative hover:cursor-pointer hover:shadow-2xl transition-all duration-500"
      onClick={onHandleNavigateToAreaDetail}
    >
      <div className="p-2">
        <div
          className={`w-full flex flex-col justify-center items-center ${
            status.includes("FINISHED") ? "bg-[#F6FFED] border" : ""
          } bg-[#F1ECFF] rounded-lg`}
        >
          <div className="flex flex-row relative">
            <Checkbox
              onClick={onCheck}
              checked={check}
              disabled={
                status === "FINISHED" || status === "CANCELLED" ? true : false
              }
            ></Checkbox>
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
        <div className="w-full flex flex-row justify-around items-center mt-4">
          <div className="flex flex-row justify-center items-center">
            {/* <FontAwesomeIcon icon={faUtensils} color="#FFD44E" className="mx-2" /> */}
            <LuChefHat color="#FFD44E" className="mx-2" />
            {totalChefs}
          </div>
          <div className="flex flex-row justify-center items-center">
            {/* <FontAwesomeIcon
              icon={faNewspaper}
              color="#FFD44E"
              className="mx-2"
            /> */}
            <PiNewspaperClipping
              className="mx-2"
              color="#FFD44E"
              fontSize={20}
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

      <Tag
        color={
          status.includes("OPEN")
            ? "blue"
            : status.includes("CANCELLED")
            ? "red"
            : "green"
        }
        className="p-2 text-xs w-full absolute bottom-0 rounded-b-2xl text-center font-bold border-none"
      >
        {status}
      </Tag>
    </div>
  );
};

export default AreaCard;
