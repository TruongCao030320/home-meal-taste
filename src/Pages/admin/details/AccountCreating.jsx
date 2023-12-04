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
  Form,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { direction } from "../../../API/Direction";
import { AddNewUser, getAllDistrict } from "../../../API/Admin";
import ToggleDrawerMealSlice from "../../../redux/ToggleDrawerMealSlice.js";
const { TextArea } = Input;
const dateFormat = "YYYY/MM/DD";
const AccountCreating = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(3);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState([]);
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
  const formSubmit = () => {
    console.log("submit form kh");
    form.submit();
  };
  const fetchAllDistrict = () => {
    getAllDistrict().then((res) => setDistrict(res));
  };
  const AddNewChef = (values) => {
    console.log("vào đâ không", values);
    AddNewUser(values)
      .then((res) => {
        toast.success("Add new chef successfully.");
        navigate(`/${direction.dashboard}/${direction.user}`);
      })
      .catch((res) => toast.error("Add new chef failed!"));
  };
  useEffect(() => {
    fetchAllDistrict();
  }, []);
  return (
    <div className="w-[100%] h-[100%] p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Add New User</h1>
          <div>
            <Link to={`/${direction.dashboard}/${direction.user}`}>
              <Button className="border-none mr-3">Cancel</Button>
            </Link>
            <Button
              className=" bg-bgBtnColor text-white"
              onClick={() => form.submit()}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <Divider orientation="left">General Information</Divider>
        <Form form={form} onFinish={AddNewChef}>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Name
                </label>
                <Form.Item name="name">
                  <Input className="box__shadow" classNames="mt-2" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" span={11}>
              <label htmlFor="" className=" flex justify-start pb-2">
                Role
              </label>
              <div>
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  className=" w-full h-[40px] flex justify-start items-center"
                >
                  <Radio value={3}>Chef</Radio>
                  <Radio value={2} disabled>
                    Customer
                  </Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  User Name
                </label>
                <Form.Item name="username">
                  <Input className="box__shadow" classNames="mt-2" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Email
                </label>
                <Form.Item name="email">
                  <Input className="box__shadow" classNames="mt-2" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Address
                </label>
                <Form.Item name="address">
                  <Input className="box__shadow" classNames="mt-2" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  District
                </label>
                <Form.Item name="districtId">
                  <Select
                    className="w-full"
                    options={district.map((item) => ({
                      value: item.districtId,
                      label: item.districtName,
                    }))}
                  ></Select>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Divider orientation="left">Sign In Information</Divider>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Phone Number
                </label>
                <Form.Item name="phone">
                  <Input className="box__shadow mt-2 py-6" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Password
                </label>
                <Form.Item name="password">
                  <Input.Password className="box__shadow mt-2" />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AccountCreating;
