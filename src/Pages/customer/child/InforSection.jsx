import React from "react";
import cam from "../../../assets/images/headphone.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

const InforSection = ({ item }) => {
  return (
    <div className="flex flex-col w-full lg:infor-slide lg:flex lg:flex-row justify-around items-center">
      <div className="animate-appear1 flex flex-col justify-start items-center">
        <h2 className="font-bold">
          Newest <FontAwesomeIcon icon={faFire} color="red" />
        </h2>
        <h1 className="text-3xl lg:text-5xl ">{item?.title}</h1>
        <Button className="mt-5 p-5 flex justify-center items-center bg-yellow-200 rounded-full">
          <h3 className="font-bold">Show more...</h3>
        </Button>
      </div>
      <img
        src={item?.image}
        alt=""
        style={{
          objectFit: "fill",
        }}
        className="w-[90%] rounded-full min-h-[380px] md:min-h-[700px] lg:w-[40%] lg:min-h-[600px] lg:rounded-full animate-appear2"
      />
    </div>
  );
};

export default InforSection;
