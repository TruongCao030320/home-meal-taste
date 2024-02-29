import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Input } from "antd";
import { facebook } from "fontawesome";
import React from "react";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaFly,
  FaMessage,
  FaPaperPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Bottom = () => {
  return (
    <div className="w-full flex-col p-5">
      <Divider className="bg-white h-1" />
      <h1 className="font-festive font-bold text-5xl">T&S</h1>
      <div className="grid grid-cols-2 lg:flex lg:flex-row w-full lg:justify-between">
        <div className="w-full lg:w-[25%] gap-4 ">
          <h1 className="underline">Contact</h1>
          <div>
            <FontAwesomeIcon icon={FaYoutube} />
            <p className="text-gray-100">
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas..
            </p>
            <p>Email : hello@cide.com</p>
            <p>Phone : (303) 795-0928</p>
            <div>
              <h1>Follow Us</h1>
              <div
                className="flex gap-2
              "
              >
                <div className="p-2 rounded-full bg-white inline-block cursor-pointer hover:text-red-300">
                  <FaFacebook />
                </div>
                <div className="p-2 rounded-full bg-white inline-block cursor-pointer hover:text-red-300">
                  <FaYoutube />
                </div>
                <div className="p-2 rounded-full bg-white inline-block cursor-pointer hover:text-red-300">
                  <FaFacebookMessenger />
                </div>
                <div className="p-2 rounded-full bg-white inline-block cursor-pointer hover:text-red-300">
                  <FaTwitter />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[25%] gap-4 ">
          <h1>ABOUT US</h1>
          <div>
            <ul>
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Cases & Protection
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Headphones & Speakers
                </Link>
              </li>{" "}
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Power & Cables
                </Link>
              </li>{" "}
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Creativity
                </Link>
              </li>{" "}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-[25%] gap-4 ">
          <h1>SERVICES</h1>
          <div>
            <ul>
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Store Locations
                </Link>
              </li>{" "}
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Registry
                </Link>
              </li>{" "}
              <li>
                <Link to="#" className="hover:text-blue-200">
                  Privacy Policy
                </Link>
              </li>{" "}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-[25%] gap-4 ">
          <h1>NEWLETTERS</h1>
          <div>
            <p>Give me feedback of your opinion through Email!</p>
            <div>
              <Input
                suffix={<FaPaperPlane />}
                placeholder="Enter your email address..."
              ></Input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
