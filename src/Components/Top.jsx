import React, { useRef } from "react";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { GrNotification } from "react-icons/gr";
import avt from "../assets/images/avatar01.png";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import NotificationTag from "./NotificationTag";
import { Input } from "antd";
const Top = () => {
  const [showLogout, setShowLogout] = useState(false);
  const handleMouseEnter = () => {
    setShowLogout(true);
  };
  const handleMouseLeave = () => {
    setShowLogout(false);
  };
  const toggleRef = useRef(null);
  const toggleRef2 = useRef(null);
  const toggleVisibility = () => {
    if (toggleRef.current) {
      toggleRef.current.classList.toggle("hidden");
      toggleRef2.current.classList.toggle("hidden");
    }
  };
  const successToast = () => {
    toast.error("Lỗi nè");
  };
  const notiExample = [
    {
      title: "Khuyến mãi ngày 24.7",
      timeStamp: "23.7.2023",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid ut et quam rerum eligendi veniam quasi ad porro.Quaerat, temporibus.",
    },
    // {
    //   title: "Khuyến mãi ngày 24.7",
    //   timeStamp: "23.7.2023",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid ut et quam rerum eligendi veniam quasi ad porro.Quaerat, temporibus.",
    // },
    // {
    //   title: "Khuyến mãi ngày 24.7",
    //   timeStamp: "23.7.2023",
    //   description:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid ut et quam rerum eligendi veniam quasi ad porro.Quaerat, temporibus.",
    // },
  ];
  const items = [
    {
      label: "Submit and continue",
      key: "1",
    },
  ];
  return (
    <div className="h-full w-full sticky__header">
      <div
        className="w-full h-full headerSection  justify-between items-center fixed z-[99] top-0 left-0 bottom-0 right-0  opacity-30 hidden"
        onClick={toggleVisibility}
        ref={toggleRef2}
      ></div>
      <div className="w-[100%] h-[100%] flex justify-between items-center rounded-lg box__shadow px-5">
        <div className="title flex flex-col justify-center items-start">
          <h1 className="">
            Welcome to <span>Home Meal Taste</span> !
          </h1>
          <p className="text-textColor p-0 m-0 leading-5">
            Hello <span className="text-yellowColor">Tuanung</span>, Welcome
            back !
          </p>
        </div>

        <div className="adminDiv flex justify-between items-center gap-2">
          <Link to="/dashboard/chatbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 hover:stroke-yellow-500 hover:cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
          </Link>
          <div className="notiTag">
            <div
              className=" bg-black absolute top-[3rem] right-16 shadow rounded-lg z-[9999] h-[50%] w-[20%] hidden box__shadow"
              ref={toggleRef}
            >
              <div className="bg-white rounded-lg border">
                <h1 className="w-full text-center mt-2">Notification</h1>
                {notiExample.map((item, index) => (
                  <NotificationTag tag={item} key={index} />
                ))}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 hover:stroke-yellow-500 hover:cursor-pointer"
              onClick={toggleVisibility}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
          </div>

          <div
            className="adminImg h-10 w-10  rounded-full p-1 bg-white relative before:w-[40px] before:absolute before:top-[33px] before:right-[7px] before:content-[''] before:h-[20px] before:bg-black before:opacity-0 "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <figure>
              <img
                src={avt}
                className="rounded-full w-full h-full border border-solid cursor-pointer box__shadow"
              ></img>
            </figure>
            {showLogout && (
              <div className="absolute top-10  shadow-md right-4 min-w-[100px] w-[150px] h-[100px] bg-white text-white px-2 py-1 rounded transition-all ease-in-out duration-300 animate-fadeOut text-center  flex flex-col justify-center items-center ">
                <div className="hover:bg-gray-300 flex justify-around items-center w-full max-h-[40px] hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>

                  <Link to={`/dashboard/admin/${1}`}>
                    <a href="#" className="text-black">
                      Profile
                    </a>
                  </Link>
                </div>
                <div className="hover:bg-gray-300 flex justify-around items-center w-full max-h-[40px] hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <Link to="/" className="text-black">
                    Log out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top;
