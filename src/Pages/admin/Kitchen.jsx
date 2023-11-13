import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  ConfigProvider,
} from "antd";
import toast from "react-hot-toast";
import { render } from "react-dom";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllKitchen } from "../../API/Admin";
const Kitchen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleClose = () => {
    setShow(false);
    toast.success("Delete successfully.");
  };
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  // const goToKitchenDetail = (id,userId)=>{

  // }
  const columns = [
    {
      title: "Store ID",
      dataIndex: "kitchenId",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Phone",
      dataIndex: "user",
      render: (_, record) => <div>{record.user.phone}</div>,
    },
    {
      title: "Number Of Orders",
      dataIndex: "phone",
      render: (text) => <p className="min-w-[150px]">{text}</p>,
    },
    {
      title: "Is Active",
      dataIndex: "price",
      render: (_, record, index) => {
        const isEvent = index % 2 === 0;
        const tagName = isEvent ? "Active" : "Inactive";
        const tagColor = isEvent ? "geekblue" : "yellow";
        return (
          <Tag color={tagColor} className="min-w-[60px] text-center p-1">
            {tagName}
          </Tag>
        );
      },
    },
    {
      title: "Create At",
      dataIndex: "birthDate",
      render: (text) => <Tag className="min-w-[80px]">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
        >
          <Link to={`/dashboard/kitchen/${record.kitchenId}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>
        </Space>
      ),
    },
  ];

  const newData = data?.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
  useEffect(() => {
    setLoading(true);
    getAllKitchen().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  const { RangePicker } = DatePicker;
  return (
    <div className="w-[100%] h-[100%] p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Kitchen Management</h1>
          <Link to="productCreating">
            <button className="btn rounded-xl py-3 bg-bgBtnColor">Add</button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-between mb-5 ">
          <div className=" w-[50%]  rounded-md flex items-center justify-between md:w-full md:grid md:grid-cols-2 md:gap-3 lg:w-[50%] lg:flex">
            <div className="my-2">
              <h2 className="mb-1">Search</h2>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                className="box__shadow"
              />
            </div>
            <div className="my-3">
              <h2 className="mb-1">Create At</h2>
              <RangePicker className="box__shadow" />
            </div>
            <div className="my-2 rounded-lg mt-0">
              <h2 className="mb-1">Active</h2>
              <Select
                defaultValue="Yes"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                className="w-full "
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full flex justify-between md:overflow-auto">
          <div className="w-[110%]">
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#F7F5FF",
                    headerBorderRadius: 8,
                    headerSplitColor: "none",
                    fontSize: 16,
                    fontWeightStrong: 700,
                    footerBg: "black",
                  },
                },
              }}
            >
              <Table
                dataSource={search ? newData : data}
                columns={columns}
                loading={loading}
                rowClassName={(record, index) =>
                  `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
                }
              ></Table>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
