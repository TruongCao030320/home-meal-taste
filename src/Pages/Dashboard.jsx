import React from "react";
import Sidebar from "../Components/Sidebar";
import Session from "./RightSection";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Top from "../Components/Top";
import RightSection from "./RightSection";
import { Toaster } from "react-hot-toast";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import logo from "../assets/images/logo.jpg";
import foodLogo from "../assets/images/foodLogo.png";

const { Header, Content, Sider } = Layout;
const Dashboard = () => {
  return (
    <div className=" mainContainer no-scrollbarflex ">
      <Layout className="">
        <Sider
          style={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "2px",
          }}
          className="rounded-lg p-2 bg-white"
        >
          <Header
            style={{
              padding: 0,
              backgroundColor: "white",
              backgroundImage: "url('../assets/images/foodLogo.png')",
            }}
          >
            <div
              className="w-full logo flex justify-center items-center h-full rounded-lg "
              style={{
                backgroundColor: "white ",
              }}
            >
              <div className="font-semibold text-bgBtnColor w-full flex flex-col h-full justify-center items-center">
                <div className="font-festive text-xl">Home Meal </div>
                <div className="font-festive leading-3 text-xl">Taste</div>
              </div>
            </div>
          </Header>
          <Content className="mt-4">
            <Sidebar></Sidebar>
          </Content>
        </Sider>
        <Layout className="p-2 bg-white w-full h-full">
          <Header className="bg-white p-0">
            <Top />
          </Header>
          <Content className="h-[100%]  rounded-lg bg-colorBg mt-4 flex justify-center">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
