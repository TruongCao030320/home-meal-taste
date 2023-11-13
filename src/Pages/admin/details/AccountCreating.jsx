import {
  Button,
  Input,
  Select,
  Grid,
  Col,
  Row,
  Divider,
  DatePicker,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
const { TextArea } = Input;
const dateFormat = "YYYY/MM/DD";
const AccountCreating = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [data, setData] = useState({});
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file && file.type === "image/png") {
      // Check if the selected file is a PNG image
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      // Handle the case when a non-PNG image is selected
      alert("Please select a PNG image.");
      e.target.value = ""; // Clear the input field
    }
  };
  const showSuccessToast = () => {
    // toast.success("Add new account successfully.");
    toast.success("Add new account successfully.");
  };
  return (
    <div className="w-[100%] h-[100%] p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Add New Customer</h1>
          <div>
            <Link to="/dashboard/account">
              <Button className="border-none mr-3">Cancel</Button>
            </Link>
            <Link to="/dashboard/account">
              <button className="btn rounded-xl py-3 bg-bgBtnColor">
                Update
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <Divider orientation="left">General Information</Divider>
        <Row className="flex justify-around my-4 h-[80px]">
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Name
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Last Name
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
        </Row>
        <Row className="flex justify-around my-4 h-[80px]">
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Phone Number
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Email
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
        </Row>
        <Row className="flex justify-around my-4 h-[80px]">
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Birthdate
              </label>
              <DatePicker format={dateFormat} className="box__shadow w-full" />
            </div>
          </Col>
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Gender
              </label>
              <Radio.Group
                onChange={onChange}
                value={value}
                className=" w-full h-[40px] flex justify-start items-center"
              >
                <Radio value={1}>Male</Radio>
                <Radio value={2}>Female</Radio>
                <Radio value={3}>Other</Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        <Row className="flex justify-around my-4 h-[80px]">
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Address
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                District
              </label>
              <Select className="w-full" />
            </div>
          </Col>
        </Row>
        <Divider orientation="left">Sign In Information</Divider>
        <Row className="flex justify-around my-4 h-[80px]">
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Username
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Password
              </label>
              <Input className="box__shadow" classNames="mt-2" />
            </div>
          </Col>
        </Row>
        <Row className="flex justify-around my-4 h-[80px]">
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Gender
              </label>
              <Radio.Group
                onChange={onChange}
                value={value}
                className=" w-full h-[40px] flex justify-start items-center"
              >
                <Radio value={1}>Active</Radio>
                <Radio value={2}>Inactive</Radio>
              </Radio.Group>
            </div>
          </Col>
          <Col className="" span={11}>
            <div>
              <label htmlFor="" className=" flex justify-start pb-2">
                Gender
              </label>
              <Radio.Group
                onChange={onChange}
                value={value}
                className=" w-full h-[40px] flex justify-start items-center"
              >
                <Radio value={1}>Chef</Radio>
                <Radio value={2}>Customer</Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AccountCreating;
