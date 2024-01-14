import React, { useEffect, useState, createContext, useRef } from "react";
import {
  Table,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  Modal,
  ConfigProvider,
  Drawer,
  Dropdown,
  Popover,
  Form,
  Row,
  Col,
  Divider,
  Switch,
  Checkbox,
  Spin,
  Tabs,
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../Components/MealDrawer.jsx";
import { TiTick, TiDelete } from "react-icons/ti";
import {
  getAllArea,
  getAllDistrict,
  getAllSession,
  getAllSessionByAreaId,
  patchSessionStatus,
  createNewSession,
  deleteSession,
  getAllMealSessionBySessionId,
  getSingleMealSessionById,
  changeStatusOfRegisterForMeal,
  changeStatusOfBookingSlot,
  getAllInformationInSession,
  getAllSessionAreaBySessionId,
  getAllOrderBySessionId,
} from "../../API/Admin.js";
import SessionDrawer from "../../Components/SessionDrawer.jsx";
import { Title } from "chart.js";
import { useForm } from "antd/es/form/Form";
import ExpandedContent from "../../Components/ExpandedContent.jsx";
import { direction } from "../../API/Direction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faDeleteLeft,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { setCurrentSession } from "../../redux/directionSlice.js";
import ModalConfirm from "../../Components/ModalConfirm.jsx";
import ConfirmModal from "../../Components/ConfirmModal.jsx";
import AreaCard from "../../Components/AreaCard.jsx";
import MealSessionCard from "../../Components/MealSessionCard.jsx";
import OrderCard from "../../Components/OrderCard.jsx";
import { formatMoney } from "../../API/Money.js";
import {
  resetAreaKey,
  setSelectedKey,
} from "../../redux/SelectecedKeySlice.js";
const { RangePicker } = DatePicker;
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const SessionArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const arrayKeysId =
  //   useSelector((state) => state.selectedSlice.areaKeys) || [];
  // const [appear, setAppear] = useState(areaKeys.length > 0 ? true : false);
  const [form] = useForm();
  const [showAddForm, setShowAddForm] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [session, setSession] = useState([]);
  const [id, setId] = useState();
  const [areaDefault, setAreaDefault] = useState();
  const [selectedSession, setSelectedSession] = useState();
  const [areaValue, setAreaValue] = useState();
  const [checkboxAutoCreateNewSession, setCheckboxAutoCreateNewSession] =
    useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [drawerData, setDrawerData] = useState({});
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModalType, setConfirmModalType] = useState(0);
  const [typeOfConfirmModal, setTypeOfConfirmModal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);
  const [information, setInformation] = useState({
    areaList: [],
    totalPriceOrders: 0,
    totalOrdersWithStatusPaid: 0,
    totalOrdersWithStatusAccepted: 0,
    totalOrdersWithStatusCompleted: 0,
    totalOrdersWithStatusCancelled: 0,
    totalOrdersWithStatusNotEat: 0,
    totalMealSessionWithStatusApproved: 0,
    totalMealSessionWithStatusCancelled: 0,
    totalMealSessionWithStatusMaking: 0,
    totalMealSessionWithStatusCompleted: 0,
    totalMealSessionWithStatusProcessing: 0,
    sumTotalMealSessions: 0,
    sumTotalOrders: 0,
    sumTotalChefs: 0,
  });
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );
  const [newData, setNewData] = useState([]);
  // function section

  const [rowDataExpand, setRowDataExpand] = useState({});
  const [sessionIdIsChange, setSessionIdIsChange] = useState(null);
  const [sessionIdValue, setSessionIdValue] = useState(null);
  const [singleSession, setSingleSession] = useState({});
  const [mealSession, setMealSession] = useState([]);
  const [order, setOrder] = useState([]);
  // const areaKeys = useSelector((state) => state.selectedSlice.areaKeys) || [];
  const onRowClick = (record) => {
    dispatch(setCurrentSession(record.sessionId));
    localStorage.setItem("sessionId", record.sessionId);
    navigate(`${direction.areaInSession}/${record.sessionId}`, {
      sessionId: record.sessionId,
    });
  };
  useEffect(() => {
    if (sessionIdIsChange) {
      getAllMealSessionBySessionId(sessionIdIsChange).then((res) => {
        setRowDataExpand((prevData) => ({
          ...prevData,
          [sessionIdIsChange]: res,
        }));
      });
    }
  }, [sessionIdIsChange]);

  const handleCloseAddSessionForm = () => {
    setShowAddForm(false);
    form.resetFields();
  };
  const updateSessionStatus = async () => {
    setLoading(true);
    patchSessionStatus(selectedSession?.sessionId, checkboxAutoCreateNewSession)
      .then((res) => {
        // fetchAllSession();
        toast.success(`${selectedSession?.sessionName} Is Off.`);
      })
      .catch((error) =>
        toast.error(
          `Can Not Modified  Session ${selectedSession?.sessionName} Because It Already Over !`
        )
      )
      .finally(() => setLoading(false));
  };
  const onHandleOffSession = () => {
    // seshowAddForm(true);
    updateSessionStatus();
    setShowAddForm(false);
  };
  const fetchAllSession = () => {
    setLoading(true);
    getAllSession()
      .then((res) => {
        console.log("Chạy lần đầu tiên", res, selectedDate);
        setSession(res.slice().reverse());
        setNewData(
          res?.filter((item) => {
            return item.endDate.includes(selectedDate);
          })
        );
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchAllInformationInSession = () => {
    setLoading(true);

    getAllInformationInSession(sessionIdValue)
      .then((res) => {
        setInformation(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // end function section
  //   <div className="w-full grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3">
  //     {area?.map((area, index) => (
  //       <AreaCard area={area} key={index} />
  //     ))}
  //   </div>
  const fetchAllMealSessionBySessionId = () => {
    getAllMealSessionBySessionId(sessionIdValue).then((res) => {
      setMealSession(res);
    });
  };
  const fetchAllSessionAreaBySessionId = () => {
    setLoading(true);
    if (sessionIdValue == null) {
      setArea([]);
      setLoading(false);
    } else {
      // getAllSessionAreaBySessionId(sessionIdValue)
      getAllInformationInSession(sessionIdValue)
        .then((res) => {
          setArea(res.areaList || []);
          // setInformation(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const fetchAllOrderBySessionId = () => {
    getAllOrderBySessionId(sessionIdValue).then((res) => {
      setOrder(res);
    });
  };
  const AreaComponent = () => (
    <div className=" h-full min-h-[500px] w-full flex flex-col   justify-around relative">
      {loading ? (
        <div className="w-[70vw] min-h-[500px] flex justify-center items-center ">
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        <div className="w-full absolute top-0 h-full">
          <div
            className="my-2 flex flex-row"
            style={{
              display: area.length > 0 ? "block" : "none",
            }}
          >
            <div className="flex flex-row justify-around items-center w-[40%]">
              <div className="font-bold flex flex-row">
                <Checkbox
                  onClick={(e) => {
                    const areaIds = area.map((item) => {
                      return item.areaDtoForSessionArea?.areaId;
                    });
                    console.log(
                      "Chạy 2",
                      areaIds.map((item) => item)
                    );
                    if (e.target.checked) {
                      dispatch(setSelectedKey(areaIds));
                    } else {
                      dispatch(resetAreaKey());
                    }
                  }}
                />
                <span className="mx-2">All</span>
              </div>
              <div className="">
                <Button className="bg-green-400 text-white">Finish</Button>
              </div>
              <div className="">
                <Button className="bg-gray-400 text-white">Cancel</Button>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3">
            {area?.map((area, index) => (
              <AreaCard area={area} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
  const MealSessionComponent = () => (
    <div className="min-h-[500px] w-full flex flex-row ">
      {loading ? (
        <div className="w-[70vw] min-h-[500px] flex justify-center items-center ">
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3 ">
          {mealSession?.map((meal, index) => (
            <MealSessionCard meal={meal} key={index} />
          ))}
        </div>
      )}
    </div>
  );
  const OrderSessionComponent = () => {
    return <OrderCard order={order} />;
  };

  const tabItems = [
    {
      key: "1",
      label: <div className="font-bold">Areas</div>,
      children: <AreaComponent />,
    },
    {
      key: "2",
      label: <div className="font-bold">Meal Sessions</div>,
      children: <MealSessionComponent />,
    },
    {
      key: "3",
      label: <div className="font-bold">Orders</div>,
      children: <OrderSessionComponent />,
    },
  ];
  // useeffect section
  useEffect(() => {
    fetchAllInformationInSession();
    console.log("session lúc này", session, sessionIdValue);
    setSingleSession(
      session.find((session) => session.sessionId == sessionIdValue)
    );
    fetchAllMealSessionBySessionId();
    fetchAllSessionAreaBySessionId();
    fetchAllOrderBySessionId();
  }, [sessionIdValue]);
  // }, [selectedDate]);

  useEffect(() => {
    fetchAllSession();
    setSelectedRowKeys([]);
    setIsModalOpen(false);
    // fetchAllInformationInSession();
  }, [refresh]);
  useEffect(() => {
    fetchAllSession();
    setSelectedRowKeys([]);
    setIsModalOpen(false);
    // fetchAllInformationInSession();
  }, []);
  // useEffect(() => {
  //   fetchAllInformationInSession();
  // }, []);
  // useEffect(() => {
  //   getAllSessionByAreaId(areaValue)
  //     .then((res) => setSession(res))
  //     .catch((error) => console.log(error));
  // }, [areaValue]);
  // column section
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("newselected rowkesy là", selectedRowKeys);
    // if (newSelectedRowKeys.length > 0) {
    //   setSelectedRowIsActive(true);
    // }
    // setValues({ ...values, mealSessionIds: newSelectedRowKeys });
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowIsActive(false);

    if (selectedRows.length > 0) {
      // setSelectedRowIsActive(false);
      const firstAttributeValue = selectedRows[0].bookingSlotStatus; // Change 'attribute' to the actual attribute you're checking
      const secondAttributeValue = selectedRows[0].registerForMealStatus;
      if (
        selectedRows.some(
          (row) => row.bookingSlotStatus !== firstAttributeValue
        ) ||
        selectedRows.some(
          (row) => row.registerForMealStatus !== secondAttributeValue
        )
      ) {
        setSelectedRowIsActive(true);
      }
    } else {
      setSelectedRowIsActive(false);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    // onChange: onSelectChange,
    onChange: onSelectChange,
  };

  // content section
  useEffect(() => {
    setSessionIdValue(null);
    fetchAllSession();
    // fetchAllInformationInSession();
  }, [selectedDate]);
  useEffect(() => {
    fetchAllSession();
  }, []);
  // end content section
  const newDataStatusOpen = newData?.filter((item) => {
    return item?.status?.includes("OPEN") || item?.status?.includes("BOOKING");
  });
  const newDataStatusClose = newData?.filter((item) => {
    return item?.status?.includes("CLOSE");
  });
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer />
      <div className="account-search flex items-center  justify-end ">
        <div className="w-full h-[40%] add-btn flex flex-col justify-between items-center mb-3 md:flex-row lg:flex-row">
          <div className="">
            <h1>Session-Area Management</h1>
          </div>
          {/* <div className=" flex flex-col justify-center items-center gap-2 md:flex md:w-full md:flex-row md:justify-between md:items-center">
           */}
          <div>
            <DatePicker
              defaultValue={dayjs()}
              format="DD-MM-YYYY"
              onChange={(date, dateString) => {
                setSelectedDate(dateString);
              }}
              className="box__shadow w-full md:w-[40%] min-w-[200px]"
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg h-full bg-white min-h-[1000px]">
        <div className="account-search flex items-center justify-end mb-5 w-[100%]  lg:flex md:gap-3 lg:w-[100%]"></div>
        <div className="w-full h-full flex flex-row justify-around p-2">
          {/* bg-slate-50 */}
          <div className="w-[75%] h-full flex flex-col bg-slate-50  p-2 rounded-lg min-h-[1000px] ">
            <Select
              className="w-full md:w-[50%] mb-5"
              placeholder="Select Session"
              disabled={loading}
              value={sessionIdValue}
              options={[
                {
                  label: "OPEN",
                  options: newDataStatusOpen.map((item, index) => ({
                    value: item.sessionId,
                    label: (
                      <div key={index} className="gap-2">
                        {item.sessionName}
                        <Tag color="geekblue" className="mx-2">
                          {item?.status}
                        </Tag>
                      </div>
                    ),
                  })),
                },
                {
                  label: "CLOSE",
                  options: newDataStatusClose.map((item, index) => ({
                    value: item.sessionId,
                    label: (
                      <div key={index}>
                        {item.sessionName}{" "}
                        <Tag color="geekblue" className="mx-2">
                          {item?.status}
                        </Tag>
                      </div>
                    ),
                  })),
                },
              ]}
              onChange={(value) => {
                localStorage.setItem("sessionId", value);
                setSessionIdValue(value);
              }}
            ></Select>
            <div className="h-full">
              <Tabs
                className="h-full"
                defaultActiveKey="1"
                items={tabItems}
                type="card"
              ></Tabs>
            </div>
            {/* {loading ? (
              <div className="w-[70vw] h-full flex justify-center items-center">
                <Spin tip="Loading" size="large" />
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3">
                {area?.map((area, index) => (
                  <AreaCard area={area} key={index} />
                ))}
              </div>
            )} */}
          </div>
          <div className="w-[20%] h-full flex flex-col justify-between items-center relative min-h-[500px]">
            <div className="w-full bg-slate-50 h-full rounded-lg min-h-[400px] flex flex-col p-4 justify-between">
              <div className="h-[20%] bg-blue-200 p-2 rounded-2xl font-bold">
                Status:
              </div>
              <div className="h-full">
                <h1 className="my-2">Meal Session</h1>
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-4 bg-blue-100 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Total</span>{" "}
                    <span className="font-bold">
                      {information?.sumTotalMealSessions}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-blue-200 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Processing</span>{" "}
                    <span className="font-bold">
                      {information?.totalMealSessionWithStatusProcessing}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-blue-200 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Approved</span>{" "}
                    <span className="font-bold">
                      {information?.totalMealSessionWithStatusApproved}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Cancel</span>{" "}
                    <span className="font-bold">
                      {information?.totalMealSessionWithStatusCancelled}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Making</span>{" "}
                    <span className="font-bold">
                      {information?.totalMealSessionWithStatusMaking}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-blue-200 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Completed</span>{" "}
                    <span className="font-bold">
                      {information?.totalMealSessionWithStatusCompleted}
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="h-full">
                <h1 className="my-2">Orders</h1>
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-4 bg-blue-100 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Total</span>{" "}
                    <span className="font-bold">
                      {information?.sumTotalOrders}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-blue-200 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Completed</span>{" "}
                    <span className="font-bold">
                      {information?.totalOrdersWithStatusCompleted}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Cancel</span>{" "}
                    <span className="font-bold">
                      {information?.totalOrdersWithStatusCancelled}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-orange-100 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Accept</span>{" "}
                    <span className="font-bold">
                      {information?.totalOrdersWithStatusAccepted}
                    </span>{" "}
                  </div>
                  <div className="p-4 bg-blue-200 rounded-lg w-[90%] flex flex-col justify-center items-center">
                    <span className="font-bold">Paid</span>{" "}
                    <span className="font-bold">
                      {information?.totalOrdersWithStatusPaid}
                    </span>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-50 h-full rounded-lg min-h-[50px] flex justify-center flex-col items-center my-5">
              <div className="font-bold ">
                Start Time : {singleSession?.startTime}{" "}
                {singleSession?.startTime
                  ? singleSession?.startTime > "12:00"
                    ? "PM"
                    : "AM"
                  : ""}
              </div>
              <div className="font-bold ">
                End Time : {singleSession?.endTime}{" "}
                {singleSession?.startTime
                  ? singleSession?.startTime > "12:00"
                    ? "PM"
                    : "AM"
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        title="Confirmation"
        open={show}
        onOk={onHandleDeleteSession}
        onCancel={handleClose}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>Are you sure to delete this record?</p>
      </Modal> */}
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
      <ConfirmModal
        isModalOpen={isModalOpen}
        type={confirmModalType}
        array={selectedRowKeys}
      />
    </div>
  );
};

export default SessionArea;
