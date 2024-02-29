import React from "react";
import human2 from "../../../assets/images/human2.jpg";
import { faker } from "@faker-js/faker";
const ClientSayCard = () => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div>
        <img
          src={human2}
          alt=""
          width={100}
          height={100}
          className="rounded-2xl"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <h1 className="font-serif font-bold">{faker.internet.userName()}</h1>
      <p className="text-black font-bold w-[50%]">
        We've recently updated our entire product portfolio to give customers
        and partners the best products with the newest
      </p>
    </div>
  );
};

export default ClientSayCard;
