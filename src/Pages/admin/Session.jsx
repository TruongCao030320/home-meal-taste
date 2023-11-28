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
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer, hideDrawer } from "../../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "../../Components/MealDrawer";
import ModalConfirm from "../../Components/ModalConfirm";
import { TiTick, TiDelete } from "react-icons/ti";
import { TbBroadcast, TbSearch } from "react-icons/tb";
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
const { RangePicker } = DatePicker;
const Session = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState([]);
  const [session, setSession] = useState([]);
  const [id, setId] = useState();
  const [areaDefault, setAreaDefault] = useState();
  const [areaValue, setAreaValue] = useState();
  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const [drawerData, setDrawerData] = useState({});
  const refresh = useSelector((state) => state.mealDrawer.refresh);
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
        setShow(false);
        toast.success("Delete completed.");
        fetchSessionByArea(areaValue ? areaValue : areaDefault);
      })
      .catch((error) => toast.error(error));
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
  const toggleDrawerType2 = async (mealSessionId) => {
    console.log("vao2 day96 khong6", mealSessionId);
    await getSingleMealSessionById(mealSessionId)
      .then((res) => setDrawerData(res))
      .catch((error) => console.log(error));
    dispatch(showDrawer(mealSessionId));
  };
  const addNewSession = async (values) => {
    createNewSession(values, toast)
      .then(() => {
        fetchSessionByArea(areaValue ? areaValue : areaDefault);
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
      })
      .catch((error) => console.log(error));
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
  // useEffect(() => {
  //   getAllMealSessionBySessionId(sessonIdIsChange).then((res) =>
  //     setDataExpand(res)
  //   );
  //   console.log(sessonIdIsChange);
  // }, [sessonIdIsChange, refresh]);
  // end useeffect section

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
        <div className="font-bold">{record.sessionType}</div>
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
        const color = record.status === true ? "gray" : "green";
        return (
          <Tag
            color={color}
            className="shadow-sm hover:cursor-pointer hover:opacity-40 py-2 px-6"
            onClick={() => {
              updateSessionStatus(record.sessionId);
            }}
          >
            {status}
          </Tag>
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
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
        >
          <Link to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => onHandleShowModalDeleteSession(record.sessionId)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </Link>
        </Space>
      ),
    },
  ];
  const detailColumns = [
    {
      title: "Menu",
      dataIndex: "image",
      render: (_, record) => (
        <div className="w-full h-[120px] p-1 flex justify-center items-center">
          <img
            className="!rounded-2xl box__shadow bg-yellow-50 hover:scale-110 transition-all duration-500 h-full w-[120px] "
            src={record.mealDtoForMealSession.image}
          ></img>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Divider type="vertical" className="h-[70px] bg-slate-300" />
      ),
    },
    {
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex  justify-between items-center">
          <div>
            <h1>{record.mealDtoForMealSession.name}</h1>
            <p>Create At :{record.createDate}</p>
            <p>{record.mealDtoForMealSession.description}</p>
          </div>
          <div>
            <Tag
              className="p-2 shadow-md min-w-[100px] text-center"
              color={`${
                record.status.includes("PROCESSING")
                  ? "blue"
                  : record.status.includes("APPROVED")
                  ? "green"
                  : "red"
              }`}
            >
              <span className="font-bold">{record.status}</span>
            </Tag>
          </div>
        </div>
      ),
      filters: [
        { text: "PROCESSING", value: "PROCESSING" },
        { text: "APPROVED", value: "APPROVED" },
        { text: "REJECTED", value: "REJECTED" },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      dataIndex: "",
      render: (_, record) => (
        <Divider type="vertical" className="h-[70px] bg-slate-300" />
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className=" hover:border-gray-600 flex flex-col  w-[150px]"
        >
          <h1>{record.price} VND</h1>
          {/* <Link to={`/dashboard/account/${record.id}`}>
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
          </Link> */}
          <div
            onClick={() => console.log(record)}
            className="flex justify-between w-[50px] items-center "
          >
            <AiTwotoneEdit
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn "
              onClick={() => toggleDrawerType2(record.mealSessionId)}
            />
            <AiFillDelete
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn"
              onClick={confirm}
            />
          </div>
        </Space>
      ),
      sorter: (a, b) => a.price - b.price,
    },
  ];
  // end column section
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
              defaultValue={areaValue ? areaValue : areaDefault}
              options={area?.map((item, index) => ({
                value: item.areaId,
                label: item.areaName,
              }))}
              onChange={(value) => {
                console.log(value);
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
          <div>
            <Popover
              content={content}
              title="Filter"
              trigger="click"
              placement="bottomRight"
            >
              <Button className="py-5 px-5 flex justify-center items-center box__shadow">
                <FilterFilled />
                <span>Filter</span>
              </Button>
            </Popover>
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
                },
              },
            }}
          >
            <Table
              columns={columns}
              expandable={{
                expandedRowKeys: expandedRowKeys,
                expandedRowRender: (record, index) => {
                  const dataExpand = rowDataExpand[record.sessionId] || [];
                  return (
                    <div className="overflow-auto w-full p-2 bg-white rounded-lg">
                      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
                        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
                          <h1>Product In Session</h1>
                        </div>
                      </div>
                      <div className="account-search flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:gap-3 ">
                        <div className="">
                          <Input
                            placeholder="Enter data to find...."
                            onChange={(e) => setSearch(e.target.value)}
                            className="box__shadow"
                            suffix={<TbSearch />}
                          />
                        </div>
                        <div className="my-2">
                          <Popover
                            content={content}
                            title="Filter"
                            trigger="click"
                            placement="bottomRight"
                          >
                            <Button className="py-5 px-5 flex justify-center items-center box__shadow">
                              <FilterFilled />
                              <span>Filter</span>
                            </Button>
                          </Popover>
                        </div>
                      </div>
                      <Table
                        columns={detailColumns}
                        dataSource={dataExpand}
                        pagination={{ pageSize: 5 }}
                      ></Table>
                    </div>
                  );
                },
                rowExpandable: (record) => record.expandable !== "title",
                onExpand: handleExpand,
              }}
              loading={loading}
              dataSource={session}
              rowKey={(record) => record.sessionId}
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
          <Row className="flex justify-between">
            <Col span={11}>
              <Form.Item
                name="areaId"
                rules={[{ required: true, message: "Please select area!" }]}
              >
                <Select
                  defaultValue={area[0]?.areaId}
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
                  defaultValue="Lunch"
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
