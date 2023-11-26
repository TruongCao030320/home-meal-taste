import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/errorImage.jpg";
import { direction } from "../API/Direction";
const ErrorPage = () => {
  return (
    <div
      className="fixed w-[100vw] h-[100vh]"
      style={{
        backgroundImage: `url("../src/assets/images/errorImage.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <Link to={`/${direction.dashboard}`}>
        <h1>Back !</h1>
      </Link>
    </div>
  );
};

export default ErrorPage;
