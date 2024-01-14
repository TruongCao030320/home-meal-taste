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
  Breadcrumb,
  Modal,
} from "antd";
import { TbSearch } from "react-icons/tb";

import { TiTick } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import * as reactDom from "react-dom";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { direction } from "../../../API/Direction";
import {
  getAllKitchenBySessionAndAreaId,
  getAllKitchenBySessionId,
  getAllKitchenInArea,
  getSingleArea,
  getSingleSessionById,
  patchSessionStatus,
} from "../../../API/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleDot,
  faClock,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FaCircle, FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import { useSelector } from "react-redux";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const ManageChefInArea = () => {
  const { areaId } = useParams();
  // const sessionId = useSelector((state) => state.directionSlice.currentSession);
  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState({});
  const [kitchens, setKitchens] = useState([]);
  const [area, setArea] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [areaName, setAreaName] = useState("");
  const handleClose = () => {
    setShow(false);
    toast.success("Delete successfully.");
  };
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  // const goToKitchenDetail = (id,userId)=>{

  // }

  const onRowClick = (record) => {
    navigate(`${direction.mealSessionInKitchen}/${record.kitchenId}`, {
      kitchenId: 2,
    });
  };
  const columns = [
    {
      title: "Kitchen ID",
      dataIndex: "kitchenId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Kitchen Name",
      dataIndex: "name",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    // {
    //   title: "Area",
    //   dataIndex: "",
    //   render: (_, record) => (
    //     <div className="font-bold">
    //       {record.areaDtoGetAllKitchenByAreaId?.areaName}
    //     </div>
    //   ),
    // },
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
  // const fetchAllKitchenBySession = () => {
  //   setLoading(true);
  //   getAllKitchenBySessionId(sessionId).then((res) => {
  //     setKitchens(res);
  //     setLoading(false);
  //   });
  // };
  // const fetchSingleSessionById = () => {
  //   getSingleSessionById(sessionId).then((res) => {
  //     setSession(res);
  //     setArea(res.areaDtoGetSingleSessionBySessionId);
  //   });
  // };
  const fetchSingleArea = () => {
    getSingleArea(areaId).then((res) => {
      setAreaName(res.areaName);
    });
  };
  const fetchAllKitchenInArea = () => {
    setLoading(true);
    getAllKitchenInArea(areaId)
      .then((res) => {
        // setAreaName(res[0]?.areaDtoGetAllKitchenByAreaId?.areaName);
        setKitchen(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchAllKitchenByAreaAndSessionId = () => {
    setLoading(true);
    getAllKitchenBySessionAndAreaId(areaId, sessionId)
      .then((res) => {
        setKitchen(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const onHandleChangeSessionStatus = () => {
  //   setLoading(true);
  //   patchSessionStatus(sessionId)
  //     .then((res) => {
  //       fetchSingleSessionById(sessionId);
  //       toast.success("Change Session Status Completed.");
  //       setLoading(false);
  //     })
  //     .catch((error) => toast.error("Update Session Status Failed."));
  // };
  const fetchSingleSessionById = () => {
    getSingleSessionById(sessionId).then((res) => {
      console.log("session", res);
      setSession(res);
      setArea(res.areaDtoGetSingleSessionBySessionId);
    });
  };
  const newData = area?.filter((item) => {
    const searchTermNormalized = normalizeString(search.toLowerCase());
    const itemNormalized = normalizeString(item.areaName.toLowerCase());
    return itemNormalized.includes(searchTermNormalized);
  });
  const onHandleNavigateToSession = () => {
    navigate(
      `/${direction.dashboard}/${direction.session}/${direction.sessionCreating}`,
      {
        sessionId: 1,
      }
    );
  };
  useEffect(() => {
    // setLoading(true);
    // getAllKitchen(navigate).then((res) => {
    //   setData(res);
    //   setLoading(false);
    // });
    // fetchAllKitchenBySession();
    // fetchSingleSessionById();
    // fetchAllKitchenInArea();
    // fetchSingleSessionById();
    fetchSingleArea();
    fetchAllKitchenByAreaAndSessionId();
  }, []);
  useEffect(() => {
    fetchAllKitchenByAreaAndSessionId();
  }, [sessionId]);
  const { RangePicker } = DatePicker;
  return (
    <div className="w-[100%] h-[100%] p-4">
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={`/${direction.dashboard}/${direction.sessionArea}`}>
                <p className="font-bold text-black underline">Session-Area</p>
              </Link>
            ),
          },
          // {
          //   title: (
          //     <Link
          //       to={`/${direction.dashboard}/${direction.session}/${direction.areaInSession}/${sessionId}`}
          //     >
          //       <p className="font-bold text-black underline">
          //         {session?.sessionName}
          //       </p>
          //     </Link>
          //   ),
          // },
        ]}
      />
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <div className="flex flex-row justify-center items-center">
            <div className=" flex justify-center items-center p-2 gap-2">
              <h1
                className="text-2xl m-0 p-0"
                // onClick={onHandleNavigateToSession}
              >
                {areaName}
              </h1>
            </div>
          </div>
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
                dataSource={search ? newData : kitchen}
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

export default ManageChefInArea;
