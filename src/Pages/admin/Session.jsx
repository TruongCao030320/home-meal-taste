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
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../Components/MealDrawer";
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
} from "../../API/Admin";
import SessionDrawer from "../../Components/SessionDrawer";
import { Title } from "chart.js";
import { useForm } from "antd/es/form/Form";
import ExpandedContent from "../../Components/ExpandedContent.jsx";
import { direction } from "../../API/Direction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faDeleteLeft,
  faDotCircle,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { setCurrentSession } from "../../redux/directionSlice.js";
import ModalConfirm from "../../Components/ModalConfirm.jsx";
import ConfirmModal from "../../Components/ConfirmModal.jsx";
const { RangePicker } = DatePicker;
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const Session = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [newData, setNewData] = useState([]);
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
  const [firstValueObject, setFirstValueObject] = useState({});
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);

  // const [selectedDate, setSelectedDate] = useState(
  //   dayjs().format(dateFormatList[2])
  // );
  const [selectedDate, setSelectedDate] = useState();

  // function section
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [dataExpand, setDataExpand] = useState([]);
  const [rowDataExpand, setRowDataExpand] = useState({});
  const [sessionIdIsChange, setSessionIdIsChange] = useState(null);
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
  const onHandleShowModalDeleteSession = (id) => {
    setShow(true);
    setId(id);
  };
  const onHandleDeleteSession = () => {
    deleteSession(id)
      .then((res) => {
        toast.success("Delete completed.");
        fetchSessionByArea(areaValue ? areaValue : areaDefault);
      })
      .catch((error) => toast.error("Can't Delete Session !"))
      .finally(() => {
        setShow(false);
      });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseAddSessionForm = () => {
    setShowAddForm(false);
    form.resetFields();
  };
  const onHandleNavigateToCreateSessionPage = () => {
    navigate(`${direction.sessionCreating}/${null}`);
  };

  const fetchAllSession = async () => {
    setLoading(true);
    getAllSession()
      .then((sessionData) => {
        console.log(sessionData);
        setSession(sessionData.slice().reverse());
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  const onHandleOpenOffConfirmForm = (record) => {
    setSelectedSession(record);
    setShowAddForm(true);
  };
  // const onChangeCheckboxAutoCreateNewSession = () => {
  //   setCheckboxAutoCreateNewSession(!checkboxAutoCreateNewSession);
  //   console.log(checkboxAutoCreateNewSession);
  // };

  // const fetchSessionByArea = (id) => {
  //   setLoading(true);
  //   getAllSessionByAreaId(id)
  //     .then((res) => setSession(res))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // };

  const onHandleOffSession = () => {
    // seshowAddForm(true);
    updateSessionStatus();
    setShowAddForm(false);
  };

  // end function section
  // useeffect section
  useEffect(() => {
    // Fetch dataExpand using the sessionIdIsChange state
    if (sessionIdIsChange) {
      getAllMealSessionBySessionId(sessionIdIsChange).then((res) => {
        setDataExpand(res);
      });
    }
  }, [sessionIdIsChange]);
  useEffect(() => {
    fetchAllSession();
    setSelectedRowKeys([]);
    setIsModalOpen(false);
  }, [refresh]);
  // useEffect(() => {
  //   getAllSessionByAreaId(areaValue)
  //     .then((res) => setSession(res))
  //     .catch((error) => console.log(error));
  // }, [areaValue]);
  // column section
  const onHandleNavigateToSessionDetail = (record) => {
    console.log("sessionId trước khi chuyển đi", record);
    navigate(
      `/${direction.dashboard}/${direction.session}/${direction.sessionCreating}/${record?.sessionId}`,
      {
        sessionId: record?.sessionId,
      }
    );
  };
  const onHandleChangeStatusMultiSession = async (value, record) => {
    setSelectedRowKeys([...selectedRowKeys, record?.sessionId]);
    console.log("vào đây", value, record?.sessionId);
    switch (value) {
      case "OPEN":
        updateSessionStatus(value, false);
        break;
      case "BOOKING":
        updateSessionStatus(value, false);
        break;
      case "ONGOING":
        updateSessionStatus(value, false);
      default:
        break;
    }
  };
  const onHandleSelectRowOrMultiRow = (record) => {
    // setFirstValueObject(record);
    if (selectedRowKeys.length == 0) {
      setSelectedRowKeys([record.sessionId]);
    }
  };
  const updateSessionStatus = async (value, auto) => {
    console.log("Selected row keys lúc này là", selectedRowKeys);
    setLoading(true);
    patchSessionStatus(selectedRowKeys, value, auto)
      .then((res) => {
        fetchAllSession();
        toast.success("Modified Status Completed.");
      })
      .catch((error) =>
        toast.error(`Can Not Modified  Session ! Because It Already Over !`)
      )
      .finally(() => {
        setLoading(false);
        setSelectedRowKeys([]);
        setFirstValueObject(null);
      });
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setFirstValueObject(selectedRows[0]);
    // console.log(
    //   "Các row đc chọn có status",
    //   selectedRows.map((item) => {
    //     return item.status;
    //   })
    // );
    // setFirstValueObject(selectedRows[0]);

    // if (newSelectedRowKeys.length > 0) {
    // setSelectedRowIsActive(false);
    // }
    // setValues({ ...values, mealSessionIds: newSelectedRowKeys });
    setSelectedRowKeys(selectedRowKeys);
    if (selectedRows.length > 0) {
      setSelectedRowIsActive(false); // Change 'attribute' to the actual attribute you're checking
      if (firstValueObject) {
        if (
          selectedRows.some((row) => row.status !== firstValueObject?.status)
        ) {
          setSelectedRowIsActive(true);
        }
      } else {
        setSelectedRowIsActive(false);
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

  const columns = [
    {
      title: "ID",
      dataIndex: "type",
      key: "sessionId",
      render: (_, record) => (
        <div className="font-bold">{record.sessionId}</div>
      ),
    },
    {
      title: "Title",
      dataIndex: "type",
      key: "title",
      render: (_, record) => (
        <div className="font-bold">{record.sessionName}</div>
      ),
      filters: [
        {
          text: "Lunch",
          value: "Lunch",
        },
        {
          text: "Dinner",
          value: "Dinner",
        },
      ],
      onFilter: (value, record) => record.sessionType.startsWith(value),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record, index) => {
        const status = record.status === true ? "Inactive" : "Active";
        return (
          <div className="min-w-[150px]">
            {/* <Tag
              color="green"
              className="shadow-sm hover:cursor-pointer hover:opacity-40 py-2 px-6 flex flex-row justify-between items-center"
              onClick={() => {
                onHandleOpenOffConfirmForm(record);
              }}
            > */}
            {/* <p className="font-bold mr-2">{status}</p> */}
            <Select
              className="min-w-[120px]"
              disabled={
                record.status === "CLOSED" || record.status === "CANCELLED"
                  ? true
                  : false
              }
              options={[
                {
                  value: "OPEN",
                  label: (
                    <div className="flex flex-row justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircle}
                        fontSize={8}
                        color="blue"
                      />
                      <span className="text-blue-500 font-bold">Open</span>
                    </div>
                  ),
                },
                {
                  value: "BOOKING",
                  label: (
                    <div className="flex flex-row justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircle}
                        fontSize={8}
                        color="yellow"
                      />
                      <span className="text-yellow-500 font-bold">Booking</span>
                    </div>
                  ),
                },
                {
                  value: "ONGOING",
                  label: (
                    <div
                      className={`flex flex-row justify-start items-center gap-2 font-bold ${
                        record.status === "OPEN" ? "line-through" : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faCircle}
                        fontSize={8}
                        color="green"
                      />
                      <span className="text-green-500 font-bold">On Going</span>
                    </div>
                  ),
                  disabled: record.status === "OPEN" ? true : false,
                },
                {
                  value: "CLOSED",
                  label: (
                    <div
                      className={`flex flex-row justify-start items-center gap-2 font-bold ${
                        record.status === "BOOKING" || record.status === "OPEN"
                          ? "line-through"
                          : ""
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faCircle}
                        fontSize={8}
                        color="grey"
                      />
                      <span className="text-gray-500 font-bold">Closed</span>
                    </div>
                  ),
                  disabled:
                    record.status === "BOOKING" || record.status === "OPEN"
                      ? true
                      : false,
                },
                {
                  value: "CANCELLED",
                  label: (
                    <div className="flex flex-row justify-start items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircle}
                        fontSize={8}
                        color="red"
                      />
                      <span className="text-red-500 font-bold">Cancelled</span>
                    </div>
                  ),
                },
              ]}
              value={record.status}
              // onClick={() => {
              //   onHandleSelectRowOrMultiRow(record);
              // }}
              onChange={(value) => {
                // console.log("value khi select là", value);
                // onHandleSelectRowOrMultiRow(record);
                onHandleChangeStatusMultiSession(value, record);
                // console.log("record sessionId", record?.sessionId);
              }}
              formatOptionLabel={(option) => (
                <div style={{ textTransform: "uppercase", color: "red" }}>
                  {option.label}
                </div>
              )}
            ></Select>
            {/* <FontAwesomeIcon
              icon={faCircle}
              fontSize={8}
              color="green"
              className="animate-pulse"
            ></FontAwesomeIcon> */}
          </div>
        );
      },
      filters: [
        { text: "ON", value: true },
        { text: "OFF", value: false },
      ],
      // defaultFilteredValue: ["true"],
      // onFilter: (value, record) => record.status === value,
    },
    // {
    //   title: "Is Active",
    //   key: "status",
    //   render: (_, record, index) => {
    //     const status = record.status === true ? "Inactive" : "Active";
    //     return (
    //       <div>
    //         {record.status === true ? (
    //           <Tag
    //             color="green"
    //             className="shadow-sm hover:cursor-pointer hover:opacity-40 py-2 px-6 flex flex-row justify-between items-center"
    //             onClick={() => {
    //               onHandleOpenOffConfirmForm(record);
    //             }}
    //           >
    //             <p className="font-bold mr-2">{status}</p>
    //             <FontAwesomeIcon
    //               icon={faCircle}
    //               fontSize={8}
    //               color="green"
    //               className="animate-pulse"
    //             ></FontAwesomeIcon>
    //           </Tag>
    //         ) : (
    //           <Tag
    //             // color="gray"
    //             className="shadow-sm py-2 px-6 flex flex-row justify-between items-center bg-gray-400"
    //           >
    //             <p className="font-bold">{status}</p>
    //             <FontAwesomeIcon
    //               icon={faCircle}
    //               fontSize={8}
    //               color="gray"
    //               className="animate-pulse"
    //             ></FontAwesomeIcon>
    //           </Tag>
    //         )}
    //       </div>
    //     );
    //   },
    //   filters: [
    //     { text: "ON", value: true },
    //     { text: "OFF", value: false },
    //   ],
    //   defaultFilteredValue: ["true"],
    //   onFilter: (value, record) => record.status === value,
    // },
    // {
    //   title: "Meal Advance",
    //   key: "registerForMealStatus",
    //   render: (_, record, index) => {
    //     return (
    //       <div>
    //         <Switch
    //           className="bg-gray-400"
    //           checkedChildren="On"
    //           unCheckedChildren="Off"
    //           disabled={selectedRowIsActive}
    //           // defaultChecked={record.registerForMealStatus}
    //           checked={record.registerForMealStatus}
    //           onClick={() => onHandlePatchRegisterForMeal(record)}
    //         />
    //       </div>
    //     );
    //   },
    //   filters: [
    //     { text: "OPEN", value: true },
    //     { text: "CLOSED", value: false },
    //   ],
    //   onFilter: (value, record) => record.registerForMealStatus === value,
    // },
    // {
    //   title: "Booking Status",
    //   key: "bookingSlotStatus",
    //   render: (_, record, index) => {
    //     console.log("in record", record.bookingSlotStatus);
    //     return (
    //       <div>
    //         <Switch
    //           className="bg-yellow-200"
    //           checkedChildren="On"
    //           unCheckedChildren="Off"
    //           disabled={selectedRowIsActive}
    //           // value={record.bookingSlotStatus}
    //           // defaultChecked={record.bookingSlotStatus}
    //           checked={record.bookingSlotStatus}
    //           onChange={() => onHandlePatchBookingSlot(record)}
    //         />
    //       </div>
    //     );
    //   },
    //   filters: [
    //     { text: "OPEN", value: true },
    //     { text: "CLOSED", value: false },
    //   ],
    //   onFilter: (value, record) => record.bookingSlotStatus === value,
    // },
    // {
    //   title: "Off Time",
    //   dataIndex: "session",
    //   key: "birthDate",
    //   render: (_, record) => (
    //     <div className="min-w-[80px] font-bold">{record.endDate}</div>
    //   ),
    // },
    {
      title: "Start time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">
          {record.startTime} {record?.startTime > "12:00" ? "PM" : "AM"}
        </div>
      ),
    },
    {
      title: "End time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">
          {record.endTime} {record?.startTime > "12:00" ? "PM" : "AM"}{" "}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="p-1 border rounded-md">
          <FontAwesomeIcon
            icon={faEdit}
            fontSize={22}
            color="#FFAB01"
            className="hover:text-green-500 "
            // onClick={() => onRowClick(record)}
            onClick={() => onHandleNavigateToSessionDetail(record)}
          />
          {/* <Link to="#">
            <FontAwesomeIcon
              icon={faTrash}
              fontSize={22}
              color="#FFAB01"
              className="hover:text-green-500 "
              onClick={() => onHandleShowModalDeleteSession(record.sessionId)}
            />
          </Link> */}
        </Space>
      ),
    },
  ];
  // content section
  const content = (
    <div className="w-[300px]">
      <Form>
        <div className="flex w-full  flex-col">
          <div className="w-[20%]">
            <h2>Area</h2>
          </div>
          <Form.Item className="w-[100%] my-2">
            <Select
              className="w-full"
              // defaultValue={areaValue ? areaValue : areaDefault}
              value={areaValue}
              options={area?.map((item, index) => ({
                value: item.areaId,
                label: item.areaName,
              }))}
              onChange={(value) => {
                setAreaValue(value);
              }}
            ></Select>
          </Form.Item>
        </div>
        <div className="flex w-full flex-col my-2">
          <div className="w-[30%]">
            <h2>Create Date</h2>
          </div>
          <Form.Item className="w-[100%] my-2">
            <RangePicker onChange={(dates) => setSelectedDateRange(dates)} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );

  useEffect(() => {
    setNewData(
      session?.filter((item) => {
        return item.endDate.includes(selectedDate);
      })
    );
  }, [selectedDate, session]);
  // end content section
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer meal={drawerData || {}} />
      <div className="account-search flex items-center  justify-end ">
        <div className="w-full h-[40%] add-btn flex justify-between items-center mb-3">
          <h1>Session Management</h1>
          <Button
            disabled={loading ? true : false}
            className="btn rounded-2xl p-6 flex justify-center items-center bg-bgBtnColor"
            onClick={() => {
              // setShowAddForm(true)
              onHandleNavigateToCreateSessionPage();
              // navigate(`${direction.area}`);
            }}
          >
            Add New Session
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-end mb-5 w-[100%]  lg:flex md:gap-3 lg:w-[100%]">
          <div className="w-full flex flex-col justify-center items-center gap-2 md:flex md:w-full md:flex-row md:justify-between md:items-center">
            <DatePicker
              // value={selectedDate}
              format="DD-MM-YYYY"
              onChange={(date, dateString) => {
                setSelectedDate(dateString);
              }}
              className="box__shadow !h-[50px] mx-3 w-full md:w-[40%]"
            />
            {/* <Popover
              content={content}
              title="Filter"
              trigger="click"
              placement="bottomRight"
            >
              <Button className="py-5 px-5 flex justify-center items-center box__shadow">
                <FilterFilled />
                <span>Filter</span>
              </Button>
            </Popover> */}
            {/* <Select
              className="w-full md:w-[40%]"
              value={
                areaValue
                  ? areaValue
                  : {
                      value: area[0]?.areaId,
                      label: area[0]?.areaName,
                    }
              }
              options={area?.map((item, index) => ({
                value: item.areaId,
                label: item.areaName,
              }))}
              onChange={(value) => {
                setAreaValue(value);
              }}
            ></Select> */}
          </div>
        </div>
        <div className="w-full overflow-auto">
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
                  bodySortBg: "transparent",
                  headerSortActiveBg: "#F7F5FF",
                },
              },
            }}
          >
            <Table
              columns={columns}
              loading={loading}
              dataSource={selectedDate ? newData : session}
              // dataSource={session}
              rowKey={(record) => record.sessionId}
              rowSelection={rowSelection}
              // onRow={(record) => ({
              //   onClick: () => onRowClick(record),
              // })}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
              }
              pagination={{ pageSize: 5 }}
            ></Table>
          </ConfigProvider>
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

export default Session;
