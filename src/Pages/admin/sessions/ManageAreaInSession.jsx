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
  Spin,
  Modal,
  Checkbox,
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
  getAllKitchenBySessionId,
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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentArea } from "../../../redux/directionSlice";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const ManageAreaInSession = () => {
  const dispatch = useDispatch();
  // const { sessionId } = useParams();
  // const sessionId = useSelector((state) => state.directionSlice.currentSession);
  const sessionId = localStorage.getItem("sessionId");
  console.log("sessionid là", sessionId);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [session, setSession] = useState({});
  const [selectedSession, setSelectedSession] = useState();
  const [checkboxAutoCreateNewSession, setCheckboxAutoCreateNewSession] =
    useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleCloseAddSessionForm = () => {
    setShowAddForm(false);
    form.resetFields();
  };
  const onHandleOpenOffConfirmForm = () => {
    setShowAddForm(true);
  };
  const updateSessionStatus = async () => {
    console.log("sessionId hiện tại là", sessionId);
    setLoading(true);
    patchSessionStatus(sessionId, checkboxAutoCreateNewSession)
      .then((res) => {
        fetchSingleSessionById(sessionId);
        toast.success(`Session Is Off.`);
      })
      .catch((error) => toast.error(`Fail To Off Session !`))
      .finally(() => {
        setLoading(false);
      });
  };
  const onHandleOffSession = () => {
    // seshowAddForm(true);
    updateSessionStatus();
    setShowAddForm(false);
  };
  const [kitchens, setKitchens] = useState([]);
  const [area, setArea] = useState([]);
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
      kitchenId: record.kitchenId,
      sessionId: sessionId,
    });
  };
  const columns = [
    {
      title: "Area ID",
      dataIndex: "areaId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Area Name",
      dataIndex: "areaName",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Address",
      dataIndex: "",
      render: (_, record) => <div className="font-bold">{record.address}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
          // onClick={() => onRowClick(record)}
          onClick={() => onHandleNavigateToAreaDetail(record)}
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
      setArea(res.areaDtoGetSingleSessionBySessionId);
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

  const newData = area?.filter((item) => {
    const searchTermNormalized = normalizeString(search.toLowerCase());
    const itemNormalized = normalizeString(item.areaName.toLowerCase());
    return itemNormalized.includes(searchTermNormalized);
  });
  const onHandleNavigateToSessionDetail = () => {
    navigate(
      `/${direction.dashboard}/${direction.session}/${direction.sessionCreating}/${session?.sessionId}`,
      {
        sessionId: session?.sessionId,
      }
    );
  };
  const onHandleNavigateToAreaDetail = (record) => {
    dispatch(setCurrentArea(record.areaId));
    localStorage.setItem("areaId", record.areaId);
    navigate(`${direction.manageChefInArea}/${record.areaId}`, {
      areaId: record.areaId,
    });
  };
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
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={`/${direction.dashboard}/${direction.session}`}>
                <h1 className="font-bold text-black underline">
                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                  Session
                </h1>
              </Link>
            ),
          },
        ]}
      />
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <div className="flex flex-row justify-center items-center">
            <div className=" flex justify-center items-center p-2 gap-2">
              <h1
                className="text-2xl m-0 p-0 hover:cursor-pointer hover:text-bgBtnColor"
                onClick={onHandleNavigateToSessionDetail}
              >
                {session?.sessionName}
              </h1>
              <FontAwesomeIcon
                icon={faCircle}
                fontSize={10}
                color={session?.status == true ? "blue" : "gray"}
                className="animate-pulse mt-1"
              ></FontAwesomeIcon>
            </div>
          </div>
          {session?.status == true ? (
            <Button
              className="btn rounded-2xl p-6 flex justify-center items-center bg-bgBtnColor cursor-pointer"
              // onClick={() => onHandleChangeSessionStatus()}
              onClick={() => onHandleOpenOffConfirmForm()}
              disabled={loading ? true : false}
            >
              Inactive
            </Button>
          ) : (
            ""
          )}
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
                dataSource={search ? newData : area}
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
      <Modal
        title="Confirm On Off Session"
        open={showAddForm}
        onOk={onHandleOffSession}
        onCancel={handleCloseAddSessionForm}
        okText="Yes"
        cancelText="No"
      >
        <div className="flex flex-row">
          <Checkbox
            className="mr-2"
            checked={checkboxAutoCreateNewSession}
            onChange={() =>
              setCheckboxAutoCreateNewSession(!checkboxAutoCreateNewSession)
            }
          />
          <p className="font-bold">Create new session for tomorrow ?</p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAreaInSession;
