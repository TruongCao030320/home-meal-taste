import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Top from "../../Components/Customer/Top";
import Bottom from "../../Components/Customer/Bottom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "antd";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full h-full flex flex-col justify-between absolute left-0 top-0 bg-[#D4B19E] overflow-scroll no-scrollbar">
      <Top />
      <div className="p-2 border w-[10%] flex justify-center items-center rounded-lg md:hidden lg:hidden absolute left-10 top-10 cursor-pointer hover:border-blue-300">
        <FontAwesomeIcon
          icon={faBars}
          className="hover:text-blue-300"
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <Drawer
          open={isOpen}
          placement="left"
          size="default"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col w-full justify-center items-center gap-4">
            <Link to="customerHome">
              <h1 className="font-mono text-red-200 hover:drop-shadow-xl">
                Home
              </h1>
            </Link>
            <Link to="shop">
              <h1 className="font-mono text-red-200 hover:drop-shadow-xl">
                Shop
              </h1>
            </Link>
            <Link to="cart">
              <h1 className="font-mono text-red-200 hover:drop-shadow-xl">
                Cart
              </h1>
            </Link>{" "}
          </div>
        </Drawer>
      </div>
      <Outlet />
      <Bottom />
    </div>
  );
};

export default HomePage;
