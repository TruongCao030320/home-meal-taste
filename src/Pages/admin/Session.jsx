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
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { setCurrentSession } from "../../redux/directionSlice.js";
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
  // const [selectedDate, setSelectedDate] = useState(
  //   dayjs().format(dateFormatList[2])
  // );
  const [selectedDate, setSelectedDate] = useState();

  // function section
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [dataExpand, setDataExpand] = useState([]);
  const [rowDataExpand, setRowDataExpand] = useState({});
  const [sessionIdIsChange, setSessionIdIsChange] = useState(null);
  const handleExpand = (expanded, record) => {
    if (expanded) {
      setSessionIdIsChange(record.sessionId);
      setExpandedRowKeys([...expandedRowKeys, record.sessionId]);
    } else {
      setExpandedRowKeys(
        expandedRowKeys.filter((key) => key !== record.sessionId)
      );
    }
  };
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
  const onHandlePatchRegisterForMeal = (record) => {
    setLoading(true);
    changeStatusOfRegisterForMeal(record.sessionId)
      .then((res) => {
        fetchAllSession();
        toast.success("Update status Meal Advance completed");
      })
      .catch(() => {
        toast.success("Update status Meal Advance completed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onHandlePatchBookingSlot = (record) => {
    changeStatusOfBookingSlot(record.sessionId)
      .then((res) => {
        fetchAllSession();
        toast.success("Update status booking slot completed");
      })
      .catch(() => {
        toast.success("Update status booking slot completed");
      });
  };
  const fetchAllSession = async () => {
    setLoading(true);
    getAllSession()
      .then((sessionData) => {
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
  const updateSessionStatus = async () => {
    setLoading(true);
    patchSessionStatus(selectedSession?.sessionId, checkboxAutoCreateNewSession)
      .then((res) => {
        fetchAllSession();
        toast.success(`${selectedSession?.sessionName} Is Off.`);
      })
      .catch((error) =>
        toast.error(`Fail To Off Session ${selectedSession?.sessionName} !`)
      );
  };
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
  }, [refresh]);
  // useEffect(() => {
  //   getAllSessionByAreaId(areaValue)
  //     .then((res) => setSession(res))
  //     .catch((error) => console.log(error));
  // }, [areaValue]);
  // column section
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
        {
          text: "Evening",
          value: "Evening",
        },
      ],
      onFilter: (value, record) => record.sessionType.startsWith(value),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (_, record) => {
    //     return (
    //       <div className="font-bold">
    //         {record.status === true ? (
    //           <TiTick size={25} color="green" />
    //         ) : (
    //           <TiDelete size={25} color="red" />
    //         )}
    //       </div>
    //     );
    //   },
    //   filters: [
    //     { text: "Yes", value: true },
    //     { text: "No", value: false },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    // },
    {
      title: "Is Active",
      key: "status",
      render: (_, record, index) => {
        const status = record.status === true ? "Inactive" : "Active";
        return (
          <div>
            {record.status === true ? (
              <Tag
                color="green"
                className="shadow-sm hover:cursor-pointer hover:opacity-40 py-2 px-6 flex flex-row justify-between items-center"
                onClick={() => {
                  onHandleOpenOffConfirmForm(record);
                }}
              >
                <p className="font-bold mr-2">{status}</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  fontSize={8}
                  color="green"
                  className="animate-pulse"
                ></FontAwesomeIcon>
              </Tag>
            ) : (
              <Tag
                // color="gray"
                className="shadow-sm py-2 px-6 flex flex-row justify-between items-center bg-gray-400"
              >
                <p className="font-bold">{status}</p>
                <FontAwesomeIcon
                  icon={faCircle}
                  fontSize={8}
                  color="gray"
                  className="animate-pulse"
                ></FontAwesomeIcon>
              </Tag>
            )}
          </div>
        );
      },
      filters: [
        { text: "ON", value: true },
        { text: "OFF", value: false },
      ],
      defaultFilteredValue: ["true"],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Meal Advance",
      key: "registerForMealStatus",
      render: (_, record, index) => {
        return (
          <div>
            <Switch
              className="bg-gray-400"
              checkedChildren="On"
              unCheckedChildren="Off"
              defaultChecked={record.registerForMealStatus}
              onClick={() => onHandlePatchRegisterForMeal(record)}
            />
          </div>
        );
      },
      filters: [
        { text: "OPEN", value: true },
        { text: "CLOSED", value: false },
      ],
      onFilter: (value, record) => record.registerForMealStatus === value,
    },
    {
      title: "Booking Status",
      key: "bookingSlotStatus",
      render: (_, record, index) => {
        return (
          <div>
            <Switch
              className="bg-yellow-200"
              checkedChildren="On"
              unCheckedChildren="Off"
              defaultChecked={record.bookingSlotStatus}
              onClick={() => onHandlePatchBookingSlot(record)}
            />
          </div>
        );
      },
      filters: [
        { text: "OPEN", value: true },
        { text: "CLOSED", value: false },
      ],
      onFilter: (value, record) => record.bookingSlotStatus === value,
    },
    {
      title: "Off Time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">{record.endDate}</div>
      ),
    },
    {
      title: "Start time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">{record.startTime}</div>
      ),
    },
    {
      title: "End time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">{record.endTime}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="p-1 border rounded-md">
          <FontAwesomeIcon
            icon={faEye}
            fontSize={22}
            color="#FFAB01"
            className="hover:text-green-500 "
            onClick={() => onRowClick(record)}
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
              rowKey={(record) => record.sessionId}
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
    </div>
  );
};

export default Session;
