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
      <Layout className="lg:w-full md:w-full bg-white">
        <Sider className="md:hidden hidden !bg-white rounded-lg md:!bg-white lg:block lg:px-2 lg:bg-white  md:!justify-center md:relative">
          {/* <Button
            className="lg:hidden md:block md:absolute md:top-5 md:left-[20%]"
            onClick={showDrawer}
          >
            <FontAwesomeIcon
              icon={faBars}
              className="text-sm"
            ></FontAwesomeIcon>
          </Button> */}
          <Header
            className="hidden md:hidden lg:block"
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
          <Content className="mt-4 md:hidden lg:flex hidden ">
            <Sidebar></Sidebar>
          </Content>
        </Sider>
        <Layout className="!bg-white lg:bg-white lg:w-full lg:h-full w-full h-full md:w-full md:bg-white">
          <Header className="md:w-full lg:w-full w-full px-0">
            <Top />
          </Header>
          <Content className=" lg:h-full lg:top-0 lg:left-0  lg:rounded-lg bg-colorBg lg:mt-4 flex lg:w-full lg:relative justify-center md:w-full md:mt-2 md:rounded-lg lg:min-h-[500px] mt-2 rounded-lg">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
