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
} from "../../API/Admin";
import SessionDrawer from "../../Components/SessionDrawer";
import { Title } from "chart.js";
import { useForm } from "antd/es/form/Form";
import ExpandedContent from "../../Components/ExpandedContent.jsx";
import { direction } from "../../API/Direction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const { RangePicker } = DatePicker;
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const Session = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [showAddForm, setShowAddForm] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [session, setSession] = useState([]);
  const [id, setId] = useState();
  const [areaDefault, setAreaDefault] = useState();
  const [areaValue, setAreaValue] = useState();
  const [newData, setNewData] = useState([]);
  console.log("area name", area[0]?.areaName);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [drawerData, setDrawerData] = useState({});
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );
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
    console.log("record gui di la", record);
    navigate(`${direction.chefInSession}/${record.sessionId}`);
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
  const fetchAllArea = async () => {
    setLoading(true);
    try {
      const areaData = await getAllArea();
      setArea(areaData);
      if (areaData.length > 0) {
        const defaultAreaId = areaData[0].areaId;
        setAreaDefault(defaultAreaId);
        await getAllSessionByAreaId(defaultAreaId)
          .then((sessionData) => {
            setSession(sessionData);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addNewSession = async (values) => {
    createNewSession(values, toast)
      .then(() => {
        fetchSessionByArea(areaValue ? areaValue : areaDefault);
        form.resetFields();
        setShowAddForm(false);
      })
      .catch((error) => toast.error("Create new session failed."));
  };
  const fetchSessionByArea = (id) => {
    setLoading(true);
    getAllSessionByAreaId(id)
      .then((res) => setSession(res))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  const updateSessionStatus = async (id) => {
    setLoading(true);
    patchSessionStatus(id)
      .then((res) => {
        fetchSessionByArea(areaValue ? areaValue : areaDefault);
        toast.success("Change Session Status Completed.");
      })
      .catch((error) => toast.error("Update Session Status Failed."));
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
    fetchAllArea();
  }, [refresh]);
  useEffect(() => {
    getAllSessionByAreaId(areaValue)
      .then((res) => setSession(res))
      .catch((error) => console.log(error));
  }, [areaValue]);
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
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => {
        return (
          <div className="font-bold">
            {record.status === true ? (
              <TiTick size={25} color="green" />
            ) : (
              <TiDelete size={25} color="red" />
            )}
          </div>
        );
      },
      filters: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Is Active",
      key: "price",
      render: (_, record, index) => {
        const status = record.status === true ? "Inactive" : "Active";
        return (
          <div>
            {record.status === true ? (
              <Tag
                color="green"
                className="shadow-sm hover:cursor-pointer hover:opacity-40 py-2 px-6"
                onClick={() => {
                  updateSessionStatus(record.sessionId);
                }}
              >
                {status}
              </Tag>
            ) : (
              <Tag color="gray" className="shadow-sm py-2 px-6">
                {status}
              </Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Create At",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">{record.createDate}</div>
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
            icon={faEdit}
            fontSize={22}
            color="#FFAB01"
            className="hover:text-green-500 "
            onClick={() => onRowClick(record)}
          />

          <Link to="#">
            <FontAwesomeIcon
              icon={faTrash}
              fontSize={22}
              color="#FFAB01"
              className="hover:text-green-500 "
              onClick={() => onHandleShowModalDeleteSession(record.sessionId)}
            />
          </Link>
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
        return item.createDate.includes(selectedDate);
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
          <Link to="">
            <button
              className="btn rounded-xl py-3 bg-bgBtnColor"
              onClick={() => setShowAddForm(true)}
            >
              Add New Session
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-end mb-5 w-[100%]  lg:flex md:w-full md:grid md:grid-cols-2 md:gap-3 lg:w-[100%]">
          <div className="w-full flex flex-row justify-between items-center">
            <DatePicker
              // value={selectedDate}
              defaultValue={dayjs()}
              format="DD-MM-YYYY"
              onChange={(date, dateString) => {
                setSelectedDate(dateString);
              }}
              className="box__shadow !h-[50px] mx-3 !w-[300px]"
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
            <Select
              className="w-[30%]"
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
            ></Select>
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
              // expandable={{
              //   expandedRowKeys: expandedRowKeys,
              //   expandedRowRender: (record, index) => {
              //     // const [search, setSearch] = useState("");
              //     const dataExpand = rowDataExpand[record.sessionId] || [];
              //     return (
              //       <ExpandedContent
              //         dataExpand={dataExpand}
              //         sessionId={record.sessionId}
              //       />
              //     );
              //   },
              //   // rowExpandable: (record) => record.expandable !== "title",
              //   onExpand: handleExpand,
              // }}
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
      <Modal
        title="Confirmation"
        open={show}
        onOk={onHandleDeleteSession}
        onCancel={handleClose}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>Are you sure to delete this record?</p>
      </Modal>
      <Modal
        title="Add New Session"
        open={showAddForm}
        onOk={() => form.submit()}
        onCancel={handleCloseAddSessionForm}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} onFinish={(values) => addNewSession(values)}>
          <Row>
            {" "}
            <Col span={24}>
              <Form.Item
                name="sessionName"
                rules={[{ required: true, message: "Please select area!" }]}
              >
                <Input placeholder="Enter Session Name"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row className="flex justify-between">
            <Col span={11}>
              <Form.Item
                name="areaId"
                rules={[{ required: true, message: "Please select area!" }]}
              >
                <Select
                  placeholder="Choose Area"
                  options={area.map((item) => ({
                    value: item.areaId,
                    label: item.areaName,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="sessionType"
                rules={[
                  { required: true, message: "Please select type of session!" },
                ]}
              >
                <Select
                  defaultValue="Please Choose Type"
                  options={[
                    {
                      value: "Lunch",
                      label: "Lunch",
                    },
                    {
                      value: "Dinner",
                      label: "Dinner",
                    },
                    {
                      value: "Evening",
                      label: "Evening",
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Session;
