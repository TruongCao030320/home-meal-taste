import React from "react";
import Sidebar from "../Components/Sidebar";
import Session from "./RightSection";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Top from "../Components/Top";
import RightSection from "./RightSection";
import { Toaster } from "react-hot-toast";
import { Breadcrumb, Layout, Menu, theme, Button, Drawer } from "antd";
import logo from "../assets/images/logo.jpg";
import foodLogo from "../assets/images/foodLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAddressBook, FaSliders, FaTypo3 } from "react-icons/fa6";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const { Header, Content, Sider } = Layout;
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className=" mainContainer no-scrollbarflex w-full">
      <Layout className="">
        <Sider
          style={{
            backgroundColor: "white",
            border: "none",
            borderRadius: "2px",
          }}
          className="rounded-lg p-2 bg-white"
        >
          <Button
            className="md:w-52bg-black md:fixed lg:hidden md:block md:left-20 md:top-10"
            onClick={showDrawer}
          >
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl"
            ></FontAwesomeIcon>
          </Button>
          <Header
            className="md:hidden lg:block"
            style={{
              padding: 0,
              backgroundColor: "white",
              backgroundImage: "url('../assets/images/foodLogo.png')",
            }}
          >
            <div
              className="w-full logo flex justify-center items-center h-full rounded-lg"
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

          <Content className="mt-4 md:hidden lg:block">
            <Sidebar></Sidebar>
          </Content>
        </Sider>
        <Layout className="p-2 bg-white w-full h-full">
          <Header className="bg-white p-0 lg:w-full ">
            <Top />
          </Header>
          <Content className=" lg:h-full lg:top-0 lg:left-0  lg:rounded-lg bg-colorBg lg:mt-4 flex lg:w-full lg:relative justify-center md:w-[90vw] md:fixed md:left-14 md:top-28">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Drawer placement="left" open={open} onClose={onClose}>
        <Sidebar />
      </Drawer>
    </div>
  );
};

export default Dashboard;
