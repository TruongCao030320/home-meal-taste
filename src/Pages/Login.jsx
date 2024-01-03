import { Button, Input, Form, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserOutlined } from "@ant-design/icons";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdTableRestaurant } from "react-icons/md";
import axios from "axios";
import { login } from "../API/Login";
import { direction } from "../API/Direction";
import { getAllRevenue } from "../API/Admin";
import { useDispatch } from "react-redux";
import { getUserInfor } from "../redux/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const onFinish = (values) => {
    setLoading(true);
    login(values, navigate, message)
      .then((res) => {
        dispatch(getUserInfor(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section
      className={`p-10 md:flex md:justify-between md:items-center bg-video h-screen bg-cover bg-center fixed top-0 left-0 w-full z-0 flex justify-around items-center ${
        loading ? "fixed bg-white w-[vw] opacity-50" : ""
      }`}
    >
      <div className="hidden w-[50%] md:h-full md:w-[40%] md:z-50 md:flex md:flex-col md:items-center md:justify-center md:relative lg:h-full lg:w-[45%]">
        <div className="border rounded-full bg-white p-10 flex flex-col items-center justify-center opacity-80 w-[500px] h-[500px] md:relative md:w-full md:h-[60%] md:overflow-auto lg:flex lg:h-full lg:w-full">
          <h1 className="text-5xl font-festive flex text-orange-400 absolute top-12 gap-4 md:text-4xl lg:text-5xl">
            <div className=" inline-block">Home </div>
            <div className="">Meal</div>
            <div className="">Taste</div>
          </h1>
          <p className="text-5xl font-bold md:text-2xl lg:text-5xl">
            When was the <span className="text-red-600">last time</span> you had
            <span className="text-red-600"> a delicious meal</span> that felt
            just like <span className="text-red-600">home</span>?
          </p>
        </div>
      </div>
      <div className="bg-white bg-opacity-70 p-5 rounded-lg  flex flex-col w-full h-[70%] lg:w-[40%] lg:h-[80%] lg:max-w-[570px]  lg:rounded-2xl lg:shadow-2xl lg:flex lg:flex-col lg:justify-center md:p-10 z-50 md:w-[50%] before:block before:content-[''] before:transition-all before:duration-1000 before:animate-bigScale">
        <h1 className="text-5xl font-festive flex text-bgBtnColor  justify-center gap-4 md:hidden lg:hidden">
          <div className=" inline-block">Home </div>
          <div className="">Meal</div>
          <div className="">Taste</div>
        </h1>
        <h3 className="text-white  text-[22px] leading-7 font-bold flex justify-center gap-3 mb-5">
          Hello !<span className="text-bgBtnColor">Welcome</span>{" "}
          <span>Back! </span>
        </h3>
        <Form name="login" onFinish={onFinish} className="w-full">
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Enter your phone"
              className="w-full p-2   border box__shadow border-solid border-[#0066ff61] focus:outline-none text-[16px] focus:border-b-primaryColor
              leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer mt-3
              "
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              onChange={handleInputChange}
              value={formData.password}
              prefix={<RiLockPasswordLine className="text-[20px]" />}
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-full p-2 border mt-3 box__shadow border-solid border-[#0066ff61] focus:outline-none text-[16px] focus:border-b-primaryColor
              leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer
              "
            />
          </Form.Item>
          <Form.Item>
            <div className="mt-7 h-[70px]">
              <Button
                className="!bg-bgBtnColor w-full p-5 flex items-center justify-center box__shadow  text-white  h-[50px] hover:opacity-50"
                htmlType="submit"
                type="primary"
              >
                {loading ? <Spin /> : "Login"}
              </Button>
            </div>
          </Form.Item>
        </Form>
        {/* <p className="mt-5 text-textColor text-center">
          Don&apos;t have an account?{" "}
          <Link
            to={`/${direction.register}`}
            className="text-primaryColor font-medium"
          >
            Register
          </Link>
        </p> */}
      </div>
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-10 opacity-80"
      >
        <source
          src={`${"https://homemealtaste.blob.core.windows.net/video/309320ef-804a-4451-bfb0-95c205c9ea4b.mp4"}`}
          type="video/mp4"
        />
        {/* You can also add additional source elements for different video formats */}
        {/* <source src="path/to/your/background-video.webm" type="video/webm" /> */}
        {/* <source src="path/to/your/background-video.ogv" type="video/ogg" /> */}
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Login;
