import {
  Button,
  Input,
  Row,
  Col,
  Divider,
  message,
  Select,
  Tag,
  Space,
  Form,
  Spin,
  DatePicker,
  Radio,
  Modal,
  Checkbox,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table } from "antd";
import { toast } from "react-toastify";
import {
  changeIsActive,
  createNewSession,
  getAllArea,
  getAllDistrict,
  getAllTransactionByUserId,
  getOrderByUserId,
  getSingleSessionById,
  getSingleUser,
  patchSessionStatus,
  updateSession,
} from "../../../API/Admin";
import { direction } from "../../../API/Direction";
import { formatMoney } from "../../../API/Money";
// import { filter } from "fontawesome";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import fa from "fontawesome";
dayjs.extend(customParseFormat);

const SessionCreating = () => {
  const { sessionId } = useParams();
  // console.log("sessionId truyền qua là", sessionId);
  const [form] = useForm();
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  // const { id } = useParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [area, setArea] = useState([]);
  const [district, setDistrict] = useState([]);
  const [session, setSession] = useState({});
  const { endDate, sessionType } = session || {};
  const [showAddForm, setShowAddForm] = useState(false);
  const [availableAreaInSession, setAvailableAreaInSession] = useState([]);
  const [checkboxAutoCreateNewSession, setCheckboxAutoCreateNewSession] =
    useState(true);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [sessionTypeArray, setSessionTypeArray] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );
  const [values, setValues] = useState({
    sessionId: null,
    endDate: dayjs().format("DD-MM-YYYY"),
    status: "",
    areaIds: [0],
  });
  const disabledDate = (current) => {
    // Disable past dates (dates before today)
    return current && current < dayjs().startOf("day");
  };
  const navigate = useNavigate();
  // const fetchAllTransaction = () => {
  //   getAllTransactionByUserId(id).then((res) => {
  //     setTransaction(res.slice().reverse());
  //   });
  // };

  // useEffect(() => {
  //   const fetch = async () => {
  //     const user = await getSingl veUser(id, navigate);
  //     if (user) {
  //       setData(user);
  //     }
  //   };
  //   fetch();
  // }, [id]);
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
    setValues({
      ...values,
      areaIds: selectedRowKeys,
    });
    // console.log(values.areaIds);
  };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      checked: selectedRowKeys?.includes(record.areaId),
      disabled: availableAreaInSession?.includes(record.areaId),
    }),
  };
  const fetchSingleSessionById = () => {
    setLoading(true);
    getSingleSessionById(sessionId)
      .then((res) => {
        setSession(res);
        // setSelectedDate(res.endDate);
        setValues({
          ...values,
          sessionId: res?.sessionId,
          endDate: res?.endDate,
          sessionType: res?.sessionType?.toUpperCase(),
          status: res?.status,
          areaIds: res?.areaDtoGetSingleSessionBySessionId.map(
            (item) => item.areaId
          ),
        });
        setAvailableAreaInSession(
          res?.areaDtoGetSingleSessionBySessionId.map((item) => item.areaId)
        );
        console.log("selectedrowkesy ban đầu là");
        setSelectedRowKeys(
          res?.areaDtoGetSingleSessionBySessionId.map((item) => {
            return item.areaId;
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onAddNewSession = () => {
    if (
      selectedDate &&
      sessionTypeArray.length > 0 &&
      values.areaIds.length > 0 &&
      values.status !== ""
    ) {
      setLoading(true);
      // console.log("trước khi truyền đi", sessionTypeArray?.length);
      createNewSession(values, sessionTypeArray)
        .then((res) => {
          navigate(`/${direction.dashboard}/${direction.session}`);
          toast.success("Create New Session Successfully.");
        })
        .catch((error) => {
          toast.error("Session Is Exist!");
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.warning("Please fill all fields.");
    }
  };
  const onHandleUpdateSession = () => {
    setLoading(true);
    if (
      values.endDate &&
      values.sessionType &&
      values.areaIds.length > 0 &&
      values.status !== ""
    ) {
      updateSession(values)
        .then((res) => {
          toast.success("Update Session Success.");
          navigate(`/${direction.dashboard}/${direction.session}`);
        })
        .catch((error) => {
          toast.error("Update failed.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.warning("Please fill all fields.");
    }
  };
  // useEffect(() => {
  //   getOrderByUserId(id)
  //     .then((res) => {
  //       setOrder(res.slice().reverse());
  //       setCountOrder(res.length);
  //     })
  //     .catch((error) => console.log(error));
  //   fetchAllTransaction();
  // }, []);
  const { username, email, phone, address, districtId, roleId } = data || {};
  const { districtName } = data?.districtDto || {};
  const fetchAllArea = () => {
    setLoading(true);
    getAllArea()
      .then((res) => {
        console.log("Area", res);
        setArea(res);
        setSelectedRowKeys(
          res.map((item) => {
            return item.areaId;
          })
        );
        setValues({
          ...values,
          areaIds: res.map((item) => {
            return item.areaId;
          }),
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchAllDistrict = () => {
    getAllDistrict()
      .then((res) => {
        setDistrict(res);
      })
      .catch((error) => console.log(error));
  };
  const updateSessionStatus = async () => {
    console.log("sessionId hiện tại là", sessionId);
    setLoading(true);
    patchSessionStatus(sessionId, checkboxAutoCreateNewSession)
      .then((res) => {
        // fetchSingleSessionById(sessionId);
        fetchSingleSessionById();
        toast.success(`Session Is Off.`);
      })
      .catch((error) =>
        toast.error(`Can Not Modified Session Because It Already Over !`)
      )
      .finally(() => {
        setLoading(false);
      });
  };
  const onHandleOpenOffConfirmForm = () => {
    setShowAddForm(true);
  };
  const handleCloseAddSessionForm = () => {
    setShowAddForm(false);
    form.resetFields();
  };
  const onHandleOffSession = () => {
    // seshowAddForm(true);
    updateSessionStatus();
    setShowAddForm(false);
  };
  const onSessionTypeCheck = (value) => {
    // console.log("Sau khi check", value.target.value);
    setSessionTypeArray(sessionId ? value : value.target.value);
    // console.log(sessionTypeArray.map((item) => item));
    // console.log(
    //   "sau khi thêm vào arrray là bao nhiêu",
    //   sessionTypeArray?.map((item) => item)
    // );
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "areaId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Area Name",
      dataIndex: "areaName",
      render: (text) => {
        return <div className="font-bold py-2 px-6">{text}</div>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => {
        return <div className="font-bold py-2 px-6">{text}</div>;
      },
    },
    {
      title: "District",
      dataIndex: "district",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">
          {record?.districtDtoAreaResponseModel?.districtName}
        </div>
      ),
      filters: district.map((item) => ({
        text: item.districtName,
        value: item.districtId,
      })),
      onFilter: (value, record) =>
        record?.districtDtoAreaResponseModel?.districtId == value,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space
    //       size="middle"
    //       className="p-1 border rounded-md hover:border-gray-600"
    //     >
    //       <FontAwesomeIcon
    //         cursor="pointer"
    //         icon={faEdit}
    //         fontSize={25}
    //         onClick={() => {
    //           console.log("default item", record);
    //           setDefaultItem(record);
    //           handleShow(record.areaId);
    //         }}
    //       />
    //       {/* <Link to="#">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6 z-[999999]"
    //           onClick={(e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             console.log("default item", record);
    //             setDefaultItem(record);
    //             handleShow(record.areaId);
    //           }}
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    //           />
    //         </svg>
    //       </Link> */}
    //     </Space>
    //   ),
    // },
  ];
  useEffect(() => {
    fetchAllArea();
    fetchAllDistrict();
    fetchSingleSessionById();
  }, []);
  useEffect(() => {
    fetchSingleSessionById();
  }, [sessionId]);
  return (
    <div className="w-full h-full p-4 ">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <div className="flex items-center">
            <h1>
              {sessionId == "null" ? (
                "Add New Session View"
              ) : (
                <div className="flex justify-center items-center gap-5">
                  {session?.sessionName} <Tag>{session?.status}</Tag>
                </div>
              )}{" "}
            </h1>
            {/* {session?.status == true ? (
              <FontAwesomeIcon
                icon={faCircle}
                fontSize={10}
                color="blue"
                className={`animate-pulse ml-2 ${
                  sessionId == "null" ? "hidden" : "block"
                }`}
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faCircle}
                fontSize={10}
                color="gray"
                className={`animate-pulse ml-2 ${
                  sessionId == "null" ? "hidden" : "block"
                }`}
              ></FontAwesomeIcon>
            )} */}
          </div>

          <div className="">
            {session?.status == true ? (
              <Button
                className="mr-3"
                disabled={loading ? true : false}
                onClick={onHandleOpenOffConfirmForm}
              >
                Inactive
              </Button>
            ) : (
              ""
            )}
            <Link to={`/${direction.dashboard}/${direction.session}`}>
              <Button className=" mr-3" disabled={loading ? true : false}>
                Cancel
              </Button>
            </Link>
            {sessionId == "null" ? (
              <Link>
                <Button
                  disabled={loading ? true : false}
                  className="border-none mr-3 bg-bgBtnColor text-white"
                  onClick={() => onAddNewSession()}
                >
                  {loading ? <Spin /> : "Add"}
                </Button>
              </Link>
            ) : (
              <Link>
                <Button
                  disabled={
                    loading || session.status === "CLOSED" ? true : false
                  }
                  className="border-none mr-3 bg-bgBtnColor text-white"
                  onClick={() => onHandleUpdateSession()}
                >
                  {loading ? <Spin /> : "Update"}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg flex justify-between w-full h-full">
        <div className="w-[100%] h-full">
          <Divider orientation="left">Session Information</Divider>
          <Row className="flex justify-around items-center h-[10%] my-5 lg:my-5">
            <Col className="" xs={24} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Session's Date
                </label>
                {/* <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={values.sessionName}
                  onChange={(text) =>
                    setValues({ ...values, sessionName: text.target.value })
                  }
                /> */}
                {sessionId === "null" ? (
                  <DatePicker
                    disabled={loading ? true : false}
                    allowClear={false}
                    className="box__shadow w-full"
                    format="DD-MM-YYYY"
                    value={dayjs(values.endDate, "DD-MM-YYYY")}
                    onChange={(date, dateString) => {
                      setValues({
                        ...values,
                        endDate: dateString,
                      });
                      // setSelectedDate(dateString);
                    }}
                    disabledDate={disabledDate}
                  />
                ) : (
                  <DatePicker
                    allowClear={false}
                    className="box__shadow w-full"
                    format="DD-MM-YYYY"
                    disabled={true}
                    value={dayjs(values.endDate, "DD-MM-YYYY")}
                    onChange={(date, dateString) => {
                      setValues({
                        ...values,
                        endDate: dateString,
                      });
                      // setSelectedDate(dateString);
                    }}
                    disabledDate={disabledDate}
                  />
                )}
              </div>
            </Col>
            <Col className="flex flex-col" xs={24} md={11} lg={11}>
              <label htmlFor="" className=" flex justify-start pb-2">
                Session's Type
              </label>
              {sessionId === "null" ? (
                <Checkbox.Group
                  onChange={onSessionTypeCheck}
                  disabled={loading ? true : false}
                >
                  <Checkbox value="LUNCH" disabled={loading ? true : false}>
                    Lunch
                  </Checkbox>
                  <Checkbox value="DINNER" disabled={loading ? true : false}>
                    Dinner
                  </Checkbox>
                </Checkbox.Group>
              ) : (
                <Radio.Group
                  onChange={(e) => {
                    setValues({ ...values, sessionType: e.target.value });
                  }}
                  disabled={loading || values ? true : false}
                  value={values.sessionType}
                >
                  <Radio value="LUNCH">Lunch</Radio>
                  <Radio value="DINNER">Dinner</Radio>
                </Radio.Group>
              )}
            </Col>
          </Row>
          <Row className="flex justify-around h-[10%] my-5 lg:my-5">
            <Col xs={24} md={23} lg={23}>
              <label htmlFor="" className=" flex justify-start pb-2">
                Session's Status
              </label>
              {sessionId === "null" ? (
                <Select
                  disabled={loading ? true : false}
                  className="min-w-[100px]"
                  options={[
                    {
                      value: "OPEN",
                      label: "Open",
                    },
                  ]}
                  value={values?.status}
                  onChange={(value) => {
                    setValues({ ...values, status: value });
                  }}
                ></Select>
              ) : (
                <Select
                  className="min-w-[100px]"
                  disabled={loading || sessionId !== null ? true : false}
                  options={[
                    {
                      value: "OPEN",
                      label: "Open",
                    },
                    {
                      value: "BOOKING",
                      label: "Booking",
                    },
                    {
                      value: "ONGOING",
                      label: "On Going",
                    },
                    {
                      value: "CLOSED",
                      label: <div>Close</div>,
                    },
                    {
                      value: "CANCELLED",
                      label: <div>Cancel</div>,
                    },
                  ]}
                  value={values?.status}
                  onChange={(value) => {
                    setValues({ ...values, status: value });
                  }}
                ></Select>
              )}
            </Col>
          </Row>
          <div className="w-[100%] h-[60%]  overflow-auto no-scrollbar md:h-[70%] lg:h-[70%]">
            <h1 className="my-3">Areas In Session</h1>
            <Table
              rowSelection={rowSelection}
              rowKey={(item) => item.areaId}
              dataSource={area}
              columns={columns}
              bordered
              loading={loading}
            ></Table>
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
      {/* <div className="w-[100%] h-[30%]">
        <h1 className="my-3">Transactions</h1>
        <Table
          dataSource={transaction}
          columns={transactionColumns}
          bordered
          loading={loading}
        ></Table>
      </div> */}
    </div>
  );
};

export default SessionCreating;
