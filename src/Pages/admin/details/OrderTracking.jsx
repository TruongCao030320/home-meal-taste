import React from "react";
import { useState, useEffect } from "react";
import { Table, Input, ConfigProvider, Tag, Steps, Button } from "antd";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import buncha from "../../../assets/images/buncha.png";
import { render } from "react-dom";
const OrderTracking = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [bigData, setBigData] = useState();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Customers",
      dataIndex: "thumbnail",
      render: (_, record, index) => (
        <div className="flex justify-start items-center p-2">
          <img
            className="w-[100px] h-[100px] rounded-full mr-5"
            src={record.thumbnail}
          ></img>
          <h1>{record.title}</h1>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "quantity",
      render: (text) => <p className="font-extralight">{text}</p>,
    },
    {
      title: "Create At",
      dataIndex: "price",
      render: (text) => <p className="font-extralight">{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
      render: (text) => <p className="font-extralight">{text}</p>,
    },
  ];
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/carts/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBigData(res);
        setData(res.products);
        setLoading(false);
        console.log(res);
      });
  }, []);
  return (
    <div className="w-full h-full p-4">
      {" "}
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex flex-col w-full py-3">
          <h1 className="">
            Order ID : #<span className="text-red-500">{id}</span>{" "}
          </h1>
          <h1>
            {" "}
            <span>Create At: </span>
          </h1>
        </div>
        <div>
          <Link to="/dashboard/order">
            <Button>Leave</Button>
          </Link>
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        <div className="my-5">
          <Steps
            items={[
              {
                title: "Confirm",
                description: "23-7-2023",
                status: "finish",
                icon: <UserOutlined />,
              },
              {
                title: "Ready",
                status: "finish",
                icon: <SolutionOutlined />,
              },
              {
                title: "Pending...",
                status: "finish",
                icon: <LoadingOutlined />,
              },
              {
                title: "Completed.",
                description: "23-7-2023",
                status: "error",
                icon: <SmileOutlined />,
              },
            ]}
          />
        </div>
        <div className="w-full min-h-[250px] rounded-lg flex items-center p-4 bg-colorBg my-5">
          <div className="mr-5">
            <img
              src={buncha}
              alt=""
              className="min-w-[100px] min-h-[200px] max-w-[200px] max-h-[400px] rounded-full box__shadow"
            />
          </div>
          <div>
            <h1>Food Package:</h1>
            <h1>Chef:</h1>
            <h1>Address: </h1>
          </div>
        </div>
        <div className="w-full h-full overflow-auto no-scrollbar">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#F7F5FF",
                  headerBorderRadius: 8,
                  headerSplitColor: "none",
                  fontSize: 20,
                  fontWeightStrong: 700,
                },
              },
            }}
          >
            <Table
              dataSource={data}
              columns={columns}
              loading={loading}
              pagination={{ pageSize: 5 }}
              footer={(record, index) => {
                return (
                  <div className=" h-10 flex justify-end text-red-500 text-xl font-bold">
                    Total: {bigData?.total} VND
                  </div>
                );
              }}
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
