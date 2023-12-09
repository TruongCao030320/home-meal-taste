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
  Badge,
} from "antd";
import { TbSearch } from "react-icons/tb";

import { TiTick } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { render } from "react-dom";
import { Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { direction } from "../../../API/Direction";
import {
  getAllKitchenBySessionId,
  getSingleSessionById,
  patchSessionStatus,
} from "../../../API/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FaCircle, FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const ManageChefInSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState({});
  const [kitchens, setKitchens] = useState([]);
  const handleClose = () => {
    setShow(false);
    toast.success("Delete successfully.");
  };
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  // const goToKitchenDetail = (id,userId)=>{

  // }

  const onRowClick = (record) => {
    console.log("record gui di la ben maage chef", record);

    console.log("r infor la cai gi ma gui qua kia", record.kitchenId);
    navigate(`${direction.mealSessionInKitchen}/${record.kitchenId}`, {
      kitchenId: record.kitchenId,
      sessionId: sessionId,
    });
  };
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
          {record?.userDtoGetAllKitchenBySessionId?.email}
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "user",
      render: (_, record) => (
        <div className="font-bold">
          {record?.userDtoGetAllKitchenBySessionId?.phone}
        </div>
      ),
    },
    // {
    //   title: "Active",
    //   dataIndex: "",
    //   render: (_, record) => {
    //     const status = record?.user?.status;
    //     return (
    //       <div className="font-bold">
    //         {status == true ? <TiTick /> : <IoCloseSharp />}
    //       </div>
    //     );
    //   },
    //   filters: [
    //     { text: "Yes", value: true },
    //     { text: "No", value: false },
    //   ],
    //   onFilter: (value, record) => record.user.status === value,
    // },
    {
      title: "Address",
      dataIndex: "",
      render: (_, record) => (
        <div className="font-bold">
          {record.address} - {record.district}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
          onClick={() => onRowClick(record)}
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
  const fetchAllKitchenBySession = () => {
    setLoading(true);
    getAllKitchenBySessionId(sessionId).then((res) => {
      setKitchens(res);
      setLoading(false);
    });
  };
  const fetchSingleSessionById = () => {
    getSingleSessionById(sessionId).then((res) => {
      setSession(res);
    });
  };
  const onHandleChangeSessionStatus = () => {
    setLoading(true);
    patchSessionStatus(sessionId)
      .then((res) => {
        fetchSingleSessionById(sessionId);
        toast.success("Change Session Status Completed.");
        setLoading(false);
      })
      .catch((error) => toast.error("Update Session Status Failed."));
  };

  const newData = data?.filter((item) => {
    const searchTermNormalized = normalizeString(search.toLowerCase());
    const itemNormalized = normalizeString(item.name.toLowerCase());
    return itemNormalized.includes(searchTermNormalized);
  });

  useEffect(() => {
    // setLoading(true);
    // getAllKitchen(navigate).then((res) => {
    //   setData(res);
    //   setLoading(false);
    // });
    fetchAllKitchenBySession();
    fetchSingleSessionById();
  }, []);
  const { RangePicker } = DatePicker;
  return (
    <div className="w-[100%] h-[100%] p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <div className="flex flex-row justify-center items-center">
            <div className=" flex justify-center items-center p-2 gap-2">
              <h1 className="text-2xl m-0 p-0 ">{session?.sessionName}</h1>
              <FontAwesomeIcon
                icon={faCircle}
                fontSize={10}
                color={session.status == true ? "blue" : "gray"}
                className="animate-pulse mt-1"
              ></FontAwesomeIcon>
            </div>
          </div>
          <button
            className="mx-1 btn rounded-xl py-3 bg-bgBtnColor"
            onClick={() => onHandleChangeSessionStatus()}
          >
            {session.status == true ? "Inactive" : "Active"}
          </button>
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
                dataSource={kitchens}
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

export default ManageChefInSession;
