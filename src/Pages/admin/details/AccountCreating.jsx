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
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { direction } from "../../../API/Direction";
import {
  AddNewUser,
  getAllAreaByDistrict,
  getAllDistrict,
} from "../../../API/Admin";
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
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState(null);

  const [area, setArea] = useState([]);
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
  const fetchAllAreaByDistrictId = () => {
    getAllAreaByDistrict(districtId).then((res) => {
      setArea(res);
    });
  };
  const AddNewChef = (values) => {
    if (values.email && values.phone && values.password) {
      setLoading(true);
      toast.success("Add new user successfully.");
      navigate(`/${direction.dashboard}/${direction.user}`);
    } else {
      toast.error("Please enter full fields.");
    }
  };

  useEffect(() => {
    fetchAllDistrict();
  }, []);
  useEffect(() => {
    fetchAllAreaByDistrictId();
  }, [districtId]);
  return (
    <div className="w-[100%] h-[100%] p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Add New User</h1>
          <div>
            <Link to={`/${direction.dashboard}/${direction.user}`}>
              <Button
                className="border-none mr-3"
                disabled={loading ? true : false}
              >
                Cancel
              </Button>
            </Link>
            <Button
              className=" bg-bgBtnColor text-white"
              disabled={loading ? true : false}
              onClick={() => form.submit()}
            >
              {loading ? <Spin /> : "Add"}
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <Form form={form} onFinish={AddNewChef} className="h-full">
          <Row className="flex justify-around my-4  w-full h-[70%]  ">
            <Divider orientation="left">General Information</Divider>

            <Col className="" xs={24} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  User Name
                </label>
                <Form.Item name="username">
                  <Input className="box__shadow" classNames="mt-2" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" xs={24} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    className="box__shadow"
                    classNames="mt-2"
                    required
                    type="email"
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="" xs={24} md={11} lg={11}>
              <div className="">
                <label htmlFor="" className=" flex justify-start ">
                  District
                </label>
                <Form.Item
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Please enter district !",
                    },
                  ]}
                >
                  <Input type="text" className="box__shadow"></Input>
                </Form.Item>
              </div>
            </Col>
            <Col className="" xs={24} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start">
                  Area
                </label>
                <Form.Item
                  name="area"
                  rules={[
                    {
                      required: true,
                      message: "Please enter area !",
                    },
                  ]}
                >
                  <Input type="text" className="box__shadow"></Input>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around">
            <Divider orientation="left">Sign In Information</Divider>
            <Col className="" xs={24} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Phone Number
                </label>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter phone number!",
                    },
                    {
                      pattern: /^\d{10}$/,
                      message: "Please enter a valid 10-digit phone number!",
                    },
                  ]}
                >
                  <Input className="box__shadow mt-2 py-6" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" xs={24} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Password
                </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter password!",
                    },
                  ]}
                >
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
{
  /* <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" xs={23} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  User Name
                </label>
                <Form.Item name="username">
                  <Input className="box__shadow" classNames="mt-2" />
                </Form.Item>
              </div>
            </Col>
            <Col className="" xs={23} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Email
                </label>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    className="box__shadow"
                    classNames="mt-2"
                    required
                    type="email"
                  />
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
          </Row> */
}
