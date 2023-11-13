import React, { useState } from "react";
import logo from "../assets/images/logo.jpg";
import {
  AiOutlineHome,
  AiFillSetting,
  AiOutlineSchedule,
  AiOutlineUserAdd,
  AiFillHome,
  AiFillSchedule,
} from "react-icons/ai";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { FaBowlFood, FaMoneyBill, FaEarthEurope } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdPayment, MdManageAccounts } from "react-icons/md";
import { MdOutlineManageAccounts, MdDashboardCustomize } from "react-icons/md";
import { LuMenuSquare } from "react-icons/lu";
import { BsTrophy } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { Menu, Button } from "antd";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const Sidebar = () => {
  const menuLists = [
    {
      title: "Dashboard",
      icon: <MdDashboardCustomize />,
      link: "",
    },
    {
      title: "Sessions",
      icon: <AiFillSchedule />,
      link: "session",
    },
    {
      title: "Kitchen",
      icon: <AiFillHome />,
      link: "kitchen",
    },
    {
      title: "Users",
      icon: <MdManageAccounts />,
      link: "account",
    },
    {
      title: "Meals",
      icon: <FaBowlFood className="text-lg" />,
      link: "product",
    },
    {
      title: "Payment",
      icon: <MdPayment className="text-lg" />,
      link: "payment",
    },
    {
      title: "Order",
      icon: <FaMoneyBill className="text-lg" />,
      link: "order",
    },
  ];
  const items = [
    getItem(
      <Link to="/dashboard">Dashboard</Link>,
      "1",
      <MdDashboardCustomize />
    ),
    getItem(<Link to="#">Session</Link>, "2", <AiFillSchedule />, [
      getItem(
        <Link to="/dashboard/session">Area</Link>,
        "5",
        <FaEarthEurope />
      ),
      getItem(<Link to="/dashboard/product">Meal</Link>, "6", <FaBowlFood />),
    ]),
    getItem(<Link to="/dashboard/kitchen">Kitchen</Link>, "7", <AiFillHome />),
    getItem(
      <Link to="/dashboard/account">User</Link>,
      "8",
      <MdManageAccounts />
    ),
    getItem(<Link to="/dashboard/order">Order</Link>, "9", <FaMoneyBill />),
  ];
  const [active, setActive] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  return (
    <div className="w-full h-full relative  z-[100] overflow-auto no-scrollbar bg-colorBg rounded-lg p-2">
      <div>
        <Menu mode="inline" items={items} item />
      </div>
    </div>
  );
};

export default Sidebar;
