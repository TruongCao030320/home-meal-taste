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
import {
  FaBowlFood,
  FaMoneyBill,
  FaEarthEurope,
  FaClock,
  FaTypo3,
  FaAddressBook,
} from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdPayment, MdManageAccounts } from "react-icons/md";
import { MdOutlineManageAccounts, MdDashboardCustomize } from "react-icons/md";
import { LuMenuSquare } from "react-icons/lu";
import { BsTrophy } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { Menu, Button } from "antd";
import { direction } from "../API/Direction";
import { TbCategory2 } from "react-icons/tb";
import { FaHistory, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { hiddenSidebar } from "../redux/sidebarSlice";
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
  const dispatch = useDispatch();
  const handleHiddenSidebar = () => {
    dispatch(hiddenSidebar());
  };
  const items = [
    getItem(
      "Statistic",
      "g1",
      null,
      [
        getItem(
          <Link onClick={handleHiddenSidebar} to={`/${direction.dashboard}`}>
            Dashboard
          </Link>,
          "1",
          <MdDashboardCustomize size={15} />
        ),
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.order}`}
          >
            Order
          </Link>,
          "9",
          <FaMoneyBill size={15} />
        ),
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.transaction}`}
          >
            Transaction
          </Link>,
          "11",
          <FaHistory size={15} />
        ),
      ],
      "group"
    ),

    getItem(
      "Market",
      "g2",
      null,
      [
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.sessionArea}`}
          >
            Session-Area
          </Link>,
          "15",
          <FaClock size={15} />
        ),
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.session}`}
          >
            Session
          </Link>,
          "14",
          <FaClock size={15} />
        ),
      ],
      "group"
    ),

    getItem(
      "System",
      "g3",
      null,
      [
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.district}`}
          >
            District
          </Link>,
          "12",
          <FaEarthEurope size={15} />
        ),
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.area}`}
          >
            Area
          </Link>,
          "4",
          <FaEarthEurope size={15} />
        ),

        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.kitchen}`}
          >
            Kitchen
          </Link>,
          "7",
          <AiFillHome size={15} />
        ),
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.meal}`}
          >
            Meal Session
          </Link>,
          "6",
          <FaBowlFood size={12} />
        ),

        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.dishType}`}
          >
            Category
          </Link>,
          "10",
          <TbCategory2 size={15} />
        ),
        getItem(
          <Link
            onClick={handleHiddenSidebar}
            to={`/${direction.dashboard}/${direction.user}`}
          >
            User
          </Link>,
          "8",
          <MdManageAccounts size={15} />
        ),
      ],
      "group"
    ),
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
