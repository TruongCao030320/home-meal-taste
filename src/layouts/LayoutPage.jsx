import React from "react";
import Signup from "../Pages/SignUp";
// import OutsideRouter from "../routes/OutsideRouter";
import Router from "../routes/Router";
import { toast, ToastContainer } from "react-toastify";
import Top from "../Components/Top";

const LayoutPage = () => {
  return (
    <div className="mainContainer">
      <ToastContainer className="z-[9999999] mr-1 top-[5.5rem] " />
      <Router />
    </div>
  );
};

export default LayoutPage;
