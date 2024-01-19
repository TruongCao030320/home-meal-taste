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
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );

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
        // console.log(sessionData);
        setSession(sessionData.slice().reverse());
        setNewData(
          sessionData
            .slice()
            .reverse()
            .filter((item) => {
              return item.endDate.includes(selectedDate);
            })
        );
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
  const SelectComponent = ({ record }) => (
    <Select
      className="min-w-[120px]"
      options={[
        {
          value: "OPEN",
          label: (
            <div className="flex flex-row justify-start items-center gap-2">
              <FontAwesomeIcon icon={faCircle} fontSize={8} color="blue" />
              <span className="text-blue-500 font-bold">Open</span>
            </div>
          ),
        },
        {
          value: "BOOKING",
          label: (
            <div className="flex flex-row justify-start items-center gap-2">
              <FontAwesomeIcon icon={faCircle} fontSize={8} color="yellow" />
              <span className="text-yellow-500 font-bold">Booking</span>
            </div>
          ),
        },
        {
          value: "ONGOING",
          label: (
            <div
              className={`flex flex-row justify-start items-center gap-2 font-bold`}
            >
              <FontAwesomeIcon icon={faCircle} fontSize={8} color="green" />
              <span
                className={`text-green-500 font-bold ${
                  record?.status === "OPEN" ? "line-through" : ""
                }`}
              >
                On Going
              </span>
            </div>
          ),
          disabled: record?.status === "OPEN" ? true : false,
        },
        {
          value: "CLOSED",
          label: (
            <div
              className={`flex flex-row justify-start items-center gap-2 font-bold  ${
                record.status === "OPEN" ? "line-through" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCircle} fontSize={8} color="grey" />
              <span className="text-gray-500 font-bold">Closed</span>
            </div>
          ),
          disabled: record.status === "OPEN",
        },
        {
          value: "CANCELLED",
          label: (
            <div className="flex flex-row justify-start items-center gap-2">
              <FontAwesomeIcon icon={faCircle} fontSize={8} color="red" />
              <span className="text-red-500 font-bold">Cancelled</span>
            </div>
          ),
        },
      ]}
      value={record.status}
      disabled={
        record.status === "CLOSED" || record.status === "CANCELLED"
          ? true
          : false
      }
      onChange={(value) => {
        console.log("value khi select là", value);
        onHandleChangeStatusMultiSession(record.sessionId, value);
        // updateSessionStatus(record.sessionId, value);
        // console.log("record sessionId", record?.sessionId);
      }}
      formatOptionLabel={(option) => (
        <div style={{ textTransform: "uppercase", color: "red" }}>
          {option.label}
        </div>
      )}
    ></Select>
  );

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
  const onHandleChangeStatusMultiSession = async (sessionId, value) => {
    // setSelectedRowKeys([...selectedRowKeys, record?.sessionId]);
    switch (value) {
      case "OPEN":
        patchSessionStatus(sessionId, value)
          .then((res) => {
            fetchAllSession();
            toast.success("Session Open Completed.");
          })
          .catch((error) => toast.error(`Can Not Return To Open Status!`))
          .finally(() => {
            setLoading(false);
            setSelectedRowKeys([]);
            setFirstValueObject(null);
          });
        break;
      case "BOOKING":
        updateSessionStatus(sessionId, value, false);
        break;
      case "ONGOING":
        updateSessionStatus(sessionId, value, false);
        break;
      case "CANCELLED":
        updateSessionStatus(sessionId, value, false);
        break;
      case "CLOSED":
        patchSessionStatus(sessionId, value)
          .then((res) => {
            fetchAllSession();
            toast.success("Session Is Closed.");
          })
          .catch((error) =>
            toast.error(
              `Can Not Close  Session ! Because Area In Session Still Open`
            )
          )
          .finally(() => {
            setLoading(false);
            setSelectedRowKeys([]);
            setFirstValueObject(null);
          });
        break;
      default:
        break;
    }
  };
  // const onHandleSelectRowOrMultiRow = (record) => {
  //   // setFirstValueObject(record);
  //   if (selectedRowKeys.find((item) => item == record?.sessionId)) {
  //     if (
  //       firstValueObject.status?.toUpperCase.includes(
  //         record.status?.toUpperCase()
  //       )
  //     ) {
  //       setSelectedRowIsActive(true);
  //     } else {
  //       setSelectedRowIsActive(false);
  //     }
  //   } else {
  //     setSelectedRowKeys([value]);
  //   }
  // };
  const updateSessionStatus = async (sessionId, value) => {
    console.log("Sessionid và value khi lấy đc là", sessionId, value);
    setLoading(true);
    patchSessionStatus(sessionId, value)
      .then((res) => {
        fetchAllSession();
        toast.success("Modified Status Completed.");
      })
      .catch((error) =>
        toast.error(
          `Can Not Close  Session ! Because Area In Session Still Open`
        )
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
    setSelectedRows(selectedRows);
    setSelectedRowIsActive(true);
    if (selectedRowKeys.length == 0) {
      setSelectedRowIsActive(false);
    }
    // if (
    //   selectedRows.find((item) => item?.status !== firstValueObject?.status)
    // ) {
    //   setSelectedRowIsActive(false);
    // }
  };
  const rowSelection = {
    selectedRowKeys,
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
      onFilter: (value, record) => record.sessionType?.startsWith(value),
    },
    {
      // title: selectedRowIsActive ? <SelectComponent /> : "Status",
      title: "Status",
      key: "status",
      render: (_, record, index) => {
        const status = record.status.toLowerCase();
        const capitalizedStatus =
          status.charAt(0).toUpperCase() + status.slice(1);
        return (
          // <Tag
          //   className="flex flex-row justify-start items-center gap-2 p-2 max-w-[90px]"
          //   color={`${
          //     record.status.includes("OPEN")
          //       ? "blue"
          //       : record.status.includes("BOOKING")
          //       ? "yellow"
          //       : record.status.includes("ONGOING")
          //       ? "green"
          //       : record.status.includes("CLOSED")
          //       ? "gray"
          //       : "red"
          //   }`}
          // >
          //   <FontAwesomeIcon
          //     icon={faCircle}
          //     fontSize={8}
          //     color={`${
          //       record.status.includes("OPEN")
          //         ? "blue"
          //         : record.status.includes("BOOKING")
          //         ? "yellow"
          //         : record.status.includes("ONGOING")
          //         ? "green"
          //         : record.status.includes("CLOSED")
          //         ? "gray"
          //         : "red"
          //     }`}
          //   />
          //   <span
          //     className={` font-bold ${
          //       record.status.includes("OPEN")
          //         ? "text-blue-500"
          //         : record.status.includes("BOOKING")
          //         ? "text-yellow-300"
          //         : record.status.includes("ONGOING")
          //         ? "text-green-300"
          //         : record.status.includes("CLOSED")
          //         ? "text-gray-300"
          //         : "text-red-300"
          //     }`}
          //   >
          //     {record.status.toUpperCase().includes("ONGOING")
          //       ? "On Going"
          //       : capitalizedStatus}
          //   </span>
          // </Tag>
          <SelectComponent record={record} />
        );
      },
      filters: [
        { text: "OPEN", value: "OPEN" },
        { text: "BOOKING", value: "BOOKING" },
        { text: "ON GOING", value: "ONGOING" },
        { text: "COMPLETED", value: "COMPLETED" },
        { text: "CANCELLED", value: "CANCELLED" },
      ],
      // defaultFilteredValue: ["true"],
      onFilter: (value, record) => record.status.includes(value),
    },

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
            onClick={(e) => {
              e.stopPropagation();
              onHandleNavigateToSessionDetail(record);
            }}
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
  useEffect(() => {
    console.log("ENd date", selectedDate);
    let filteredArray = session;
    if (selectedDate) {
      filteredArray = session.filter((item) => {
        return item.endDate.includes(selectedDate);
      });
    }
    setNewData(filteredArray);
  }, [selectedDate]);
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
              defaultValue={dayjs()}
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
              // rowSelection={rowSelection}
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
