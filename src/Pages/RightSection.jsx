import React from "react";
import Top from "../Components/Top";
import Body from "../Components/Body";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import AdminRouter from "../routes/AdminRouter";
import Router from "../routes/Router";
import Account from "./admin/Account";
import { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";
const RightSection = () => {
  return (
    <div className="w-[90%] flex flex-col  items-center h-[95vh] overflow-auto no-scrollbar ">
      <Sidebar></Sidebar>
      {/* <RightSection /> */}
      <Outlet />
    </div>
  );
};

export default RightSection;
