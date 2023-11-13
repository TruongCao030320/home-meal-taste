import { Button, Input, Row, Col, Divider, message, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table } from "antd";
import { toast } from "react-toastify";
import {
  changeIsActive,
  getOrderByUserId,
  getSingleUser,
} from "../../../API/Admin";
const AccountDetail = () => {
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const user = await getSingleUser(id, navigate);
      if (user) {
        setData(user);
      }
    };
    fetch();
  }, [id]);
  useEffect(() => {
    getOrderByUserId(id)
      .then((res) => setOrder(res))
      .catch((error) => console.log(error));
  }, []);
  const { username, email, phone, address, district, roleId } = data || {};
  const columns = [
    {
      title: "Order number",
      dataIndex: "orderId",
      render: (text) => (
        <div className="rounded-full  flex justify-center items-center font-bold">
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => (
        <Tag color="geekblue" className="font-bold">
          Paid
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "promotionPrice",
      render: (text) => <div className="font-bold">{text}</div>,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Chef",
      dataIndex: "meal",
      render: (_, record, index) => (
        <div className="min-w-[100px] font-bold">{record.meal.name}</div>
      ),
    },
    {
      title: "Products",
      dataIndex: "meal",
      render: (_, record, index) => (
        <div className="font-bold">{record.meal.name}</div>
      ),
    },
    {
      title: "Create At",
      dataIndex: "date",
      render: (text) => <div className="min-w-[80px] font-bold">{text}</div>,
    },
  ];
  return (
    <div className="w-full h-full p-4 ">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Customer Information View</h1>
          <Link to="/dashboard/account">
            <Button className="border-none mr-3">Cancel</Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg flex justify-between w-full h-full">
        <div className="w-[25%] h-full rounded-lg shadow-lg bg-white flex flex-col  items-center p-4">
          <div className="">
            <img
              src={image}
              className="w-[200px] h-[200px] rounded-full border shadow-lg"
            ></img>
          </div>
          <div className=" flex flex-col items-center w-full h-full   mt-5">
            <div className="gender h-[15%] flex w-[90%] justify-between items-center ">
              <p>Role</p>{" "}
              <span>
                {roleId === 1 ? "Admin" : roleId === 2 ? "Customer" : "Chef"}
              </span>
            </div>
            <div className="gender h-[15%] flex w-[90%] justify-between items-center">
              <p>Rank</p> <Tag className="m-0">Classic</Tag>
            </div>
            <div className="gender h-[15%] flex w-[90%] justify-between items-center">
              <p>Total Order</p> <span>27</span>
            </div>
            <div className="gender h-[15%] flex w-[90%] justify-between items-center">
              <p>Total Point</p> <span>257</span>
            </div>
          </div>
        </div>
        <div className="w-[70%]">
          <Divider orientation="left">General Information</Divider>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Name
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={username}
                />
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
                  Email
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={email}
                />
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Phone Number
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={phone}
                />
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Address
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={address}
                />
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  District
                </label>
                <Select defaultValue={district} className="w-full">
                  <option>Quận 1</option>
                  <option>Quận 2</option>
                </Select>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="w-[100%] h-[30%]">
        <h1 className="my-3">Orders</h1>
        <Table
          dataSource={order}
          columns={columns}
          bordered
          loading={loading}
        ></Table>
      </div>
    </div>
  );
};

export default AccountDetail;
