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
  Popover,
} from "antd";
import { TbSearch } from "react-icons/tb";

import { TiTick } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { render } from "react-dom";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllArea, getAllKitchen } from "../../API/Admin";
import { direction } from "../../API/Direction";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const Kitchen = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState([]);
  const handleClose = () => {
    setShow(false);
    toast.success("Delete successfully.");
  };
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  // const goToKitchenDetail = (id,userId)=>{
  const fetchAllArea = () => {
    getAllArea().then((res) => {
      setArea(res);
    });
  };
  // }
  const columns = [
    {
      title: "Store ID",
      dataIndex: "kitchenId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Email",
      dataIndex: "",
      render: (_, record) => (
        <div className="font-bold">
          {record?.userDtoKitchenResponseModel?.email}
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "user",
      render: (_, record) => (
        <div className="font-bold">
          {record?.userDtoKitchenResponseModel?.phone}
        </div>
      ),
    },
    {
      title: "Area",
      dataIndex: "",
      render: (_, record) => (
        <div className="font-bold">{record.areaDtoGetKitchen?.areaName}</div>
      ),
      filters: area.map((item) => ({
        text: item.areaName,
        value: item.areaId,
      })),
      onFilter: (value, record) => record.areaDtoGetKitchen?.areaId === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
          onClick={() => {
            navigate(
              `/${direction.dashboard}/${direction.kitchen}/${record.userDtoKitchenResponseModel?.userId}`,
              {
                id: record.userDtoKitchenResponseModel?.userId,
              }
            );
          }}
        >
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
        </Space>
      ),
    },
  ];

  const newData = data?.filter((item) => {
    const searchTermNormalized = normalizeString(search.toLowerCase());
    const itemNormalized = normalizeString(item.name.toLowerCase());
    return itemNormalized.includes(searchTermNormalized);
  });
  useEffect(() => {
    setLoading(true);
    getAllKitchen(navigate).then((res) => {
      setData(res.slice().reverse());
      setLoading(false);
    });
    fetchAllArea();
  }, []);
  const { RangePicker } = DatePicker;
  return (
    <div className="w-[100%] h-[100%] p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Kitchen Management</h1>
          {/* <Link to="productCreating">
            <button className="btn rounded-xl py-3 bg-bgBtnColor">
              Add New Kitchen
            </button>
          </Link> */}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="account-search lg:flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
          <div className="my-2">
            <Input
              placeholder="Enter kitchen want to find..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="box__shadow"
              suffix={<TbSearch />}
            />
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
