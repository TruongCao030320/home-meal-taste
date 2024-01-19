import "../styles/Pagination.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";

import dayjs from "dayjs";
dayjs.extend(customParseFormat);

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FilterFilled } from "@ant-design/icons";
import { TbSearch } from "react-icons/tb";
import {
  Table,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  ConfigProvider,
  Divider,
  Modal,
  Popover,
} from "antd";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import ModalConfirm from "./ModalConfirm";
import context from "react-bootstrap/esm/AccordionContext";
import { toast } from "react-toastify";
import {
  getAllArea,
  getAllMeal,
  getAllMealSession,
  getAllSession,
  getAllSessionByAreaId,
  getSingleMeal,
  updateStatusMultiMealSession,
} from "../API/Admin";
import { direction } from "../API/Direction";
import { useDispatch, useSelector } from "react-redux";
import { refresh, showDrawer } from "../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "./MealDrawer";
import { getSingleMealSessionById } from "../API/Admin";
import alternateImage from "../assets/images/buncha.png";
import moment from "moment";
import { formatMoney } from "../API/Money.js";
import { Rect } from "victory";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const ProductList = () => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [drawerData, setDrawerData] = useState({});

  const [areaValue, setAreaValue] = useState();
  const [session, setSession] = useState([]);
  const [sessionValue, setSessionValue] = useState(null);
  const [area, setArea] = useState([]);
  const [chefValue, setChefValue] = useState(null);

  const [values, setValues] = useState({
    mealSessionIds: [],
    status: "",
  });
  const [search, setSearch] = useState("");
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [firstValueObject, setFirstValueObject] = useState({});
  const showToastMessage = () => {
    toast.success("Delete successfully.");
  };
  const refreshPage = useSelector((state) => state.mealDrawer.refresh);
  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Do you really want to delete this product?",
      onOk: () => showToastMessage(),
      okText: "Yes",
      cancelText: "Cancel",
    });
  };
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [forcedComplete, setForcedComplete] = useState(false);
  const toggleDrawerType2 = async (mealSessionId) => {
    await getSingleMealSessionById(mealSessionId)
      .then((res) => setDrawerData(res))
      .catch((error) => console.log(error));
    dispatch(showDrawer(mealSessionId));
  };
  // const fetchAllAreaAndSession = () => {
  //   getAllArea().then((res) => {
  //     setArea(res);
  //   });
  // };

  const onHandleUpdateStatusMultiMealSession = (status) => {
    // updateStatusMultiMealSession(values.mealSessionIds, status)
    updateStatusMultiMealSession(selectedRowKeys, status)
      .then(() => {
        fetchAllMealSession();
        toast.success("Update Status Successfully.");
      })
      .catch((error) => {
        toast.warning(
          "Can Not Change Status Of This Meal Session Cause Have Order For This Meal Session Not Done!"
        );
      })
      .finally(() => {
        setSelectedRowKeys([]);
      });
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleResetFilters = () => {
    setAreaValue(null);
    setSessionValue(null);
    setChefValue(null);
  };
  const content2 = (
    <div className=" grid gap-5 min-w-[400px]">
      <div className="flex w-full justify-between items-center">
        <div className="w-[20%]">
          <h2>Session</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            options={session?.map((item) => ({
              value: item?.sessionId,
              label: item?.sessionName,
            }))}
            value={sessionValue}
            onChange={(item) => {
              console.log("sessopm va lue là", item);
              setSessionValue(item);
            }}
          ></Select>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="w-[20%]">
          <h2>Area</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            options={area?.map((item) => ({
              value: item?.areaId,
              label: item?.areaName,
            }))}
            value={areaValue}
            onChange={(item) => setAreaValue(item)}
          ></Select>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div className="w-[20%]">
          <h2>Chef</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            options={area?.map((item) => ({
              value: item?.areaId,
              label: item?.areaName,
            }))}
            value={areaValue}
            onChange={(item) => setAreaValue(item)}
          ></Select>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
  const columns = [
    {
      title: "Menu",
      dataIndex: "image",
      render: (_, record) => (
        <div className="lg:w-[100px] md:w-[100px] h-[120px] p-1 flex justify-center items-center">
          <img
            className="!rounded-2xl box__shadow bg-yellow-50 hover:scale-110 transition-all duration-500 h-full min-w-[120px] "
            src={
              record.mealDtoForMealSession.image
                ? record.mealDtoForMealSession.image
                : alternateImage
            }
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
      title: (
        <div className="z-50 ">
          {selectedRowIsActive ? (
            <div className="flex flex-row gap-5">
              <Button
                className={`${
                  selectedRows.some((item) => item.status === "PROCESSING") &&
                  selectedRowKeys.length > 0
                    ? "block"
                    : "hidden"
                } p-5 shadow-md min-w-[100px] flex justify-center items-center hover:cursor-pointer hover:border-blue-200`}
                color="red"
                onClick={() => {
                  onHandleUpdateStatusMultiMealSession("REJECTED");
                }}
              >
                <span className="font-bold text-red-500">Reject</span>
              </Button>
              <Button
                className={`${
                  selectedRows.some((item) => item.status === "PROCESSING") &&
                  selectedRowKeys.length > 0
                    ? "block"
                    : "hidden"
                } p-5 shadow-md min-w-[100px] flex justify-center items-center hover:cursor-pointer hover:border-blue-200`}
                color="red"
                onClick={() => {
                  onHandleUpdateStatusMultiMealSession("APPROVED");
                }}
              >
                <span className="font-bold text-green-500">Approve</span>
              </Button>
              <Button
                className={`${
                  selectedRowKeys.length > 0 &&
                  selectedRows.some((item) => item.status === "APPROVED")
                    ? "block"
                    : "hidden"
                } p-5 shadow-md min-w-[100px] flex justify-center items-center hover:cursor-pointer hover:border-blue-200`}
                color="red"
                onClick={() => {
                  onHandleUpdateStatusMultiMealSession("CANCELLED");
                }}
              >
                <span className="font-bold text-red-500">Cancel</span>
              </Button>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      ),
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex  justify-between items-center">
          <div className="lg:flex lg:flex-row lg:justify-between lg:w-[80%] flex flex-col">
            <div className="">
              <div className="">
                <h2 className="font-bold">
                  {record.mealDtoForMealSession?.name} #{record.mealSessionId}
                </h2>
                <p>Create At :{record.createDate}</p>
                <p>Kitchen :{record.kitchenDtoForMealSession?.name}</p>
                <div className="flex flex-row gap-5">
                  <p>
                    Remain Slot : {record.remainQuantity}/{record.quantity}
                  </p>
                </div>
              </div>
            </div>
            <div className=" lg:w-[50%] w-full">
              <p>{record.areaDtoForMealSession?.areaName}</p>
              <p>{record.sessionDtoForMealSession?.sessionName}</p>
            </div>
          </div>
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
          <div className="w-full">
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
      // defaultSortOrder: "descend",
      // sorter: (a, b) => {
      //   const dateA = new Date(a.createDate);
      //   const dateB = new Date(b.createDate);

      //   return dateA - dateB;
      // },
      filters: [
        { text: "PROCESSING", value: "PROCESSING" },
        { text: "APPROVED", value: "APPROVED" },
        { text: "CANCELLED", value: "CANCELLED" },
        { text: "COMPLETED", value: "COMPLETED" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      // filterDropdownVisible: false,
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Divider type="vertical" className="h-[70px] bg-slate-300" />
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <Space className="flex flex-col">
          <h2 className="font-semibold">{formatMoney(record.price)} VND</h2>
          <div
            onClick={() => console.log(record)}
            className="flex justify-between w-[50px] items-center "
          >
            <AiTwotoneEdit
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn "
              // onClick={() => toggleDrawerType2(record.mealSessionId)}
              onClick={() => navigateToMealSessionDetail(record)}
            />
          </div>
        </Space>
      ),
      sorter: (a, b) => a.price - b.price,
    },
  ];
  const goToProductDetail = (id) => {
    navigate(`/${direction.dashboard}/${direction.meal}/${id}`);
  };
  const navigateToMealSessionDetail = (record) => {
    navigate(`${direction.mealSessionDetail}/${record.mealSessionId}`, {
      mealSessionId: record.mealSessionId,
    });
  };
  const fetchAllMealSession = () => {
    setLoading(true);
    getAllMealSession().then((res) => {
      setData(res.slice().reverse());
      setNewData(
        res
          .slice()
          .reverse()
          .filter((item) => {
            return item.createDate.includes(selectedDate);
          })
      );
      // setNewData(res);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   if (search) {
  //     setNewData(
  //       newData.filter((item) => {
  //         const inforNormalize = normalizeString(
  //           item?.mealDtoForMealSession?.name
  //         );
  //         const searchNormalize = normalizeString(search);
  //         return inforNormalize.includes(searchNormalize);
  //       })
  //     );
  //   } else if (selectedDate) {
  //     setNewData(
  //       data.filter((item) => {
  //         console.log("vào đc filter k");
  //         return item.createDate.includes(selectedDate);
  //       })
  //     );
  //   } else {
  //     setNewData(data);
  //   }
  // }, [search, selectedDate]);
  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("newselected rowkesy là", newSelectedRowKeys);
  //   if (newSelectedRowKeys.length > 0) {
  //     setSelectedRowIsActive(true);
  //   }
  //   setSelectedRowKeys(newSelectedRowKeys);
  //   setValues({ ...values, mealSessionIds: newSelectedRowKeys });
  // };
  // const onSelectChange = ()=>{}
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    if (selectedRows.length > 0) {
      const firstValueObject = selectedRows[0];
      setFirstValueObject(firstValueObject);
      setSelectedRows(selectedRows);
      setSelectedRowIsActive(true);
      if (
        selectedRows.some((item) => item.status !== firstValueObject.status)
      ) {
        setSelectedRowIsActive(false);
      }
    } else {
      setFirstValueObject(null);
      setSelectedRows([]);
      setSelectedRowKeys([]);
      setSelectedRowIsActive(false);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.status === "COMPLETED" || record.status === "CANCELLED",
    }),
  };
  useEffect(() => {
    fetchAllMealSession();
    fetchAllSession();
    setNewData(newData);
    // setSelectedRowKeys([]);
    // setSelectedRows([]);
  }, [refreshPage]);
  useEffect(() => {
    // fetchAllAreaAndSession();
    fetchAllSession();
  }, []);
  // useEffect(() => {
  //   onHandleUpdateStatusMultiMealSession();
  // }, [values.status]);
  const fetchAllSessionByAreaId = () => {
    getAllSessionByAreaId(areaValue).then((res) => {
      if (selectedDate) {
        setSession(
          res?.filter((item) => {
            return item?.createDate.includes(selectedDate);
          })
        );
      } else {
        setSession(res);
      }
    });
  };
  const fetchAllSession = () => {
    getAllSession().then((res) => {
      setSession(res);
    });
  };
  // useEffect(() => {
  //   fetchAllSessionByAreaId();
  //   setSessionValue(null);
  // }, [areaValue, selectedDate]);
  useEffect(() => {
    let filteredData = data;
    let filtertedSessionData = session;
    if (search) {
      const searchNormalize = normalizeString(search);
      filteredData = filteredData.filter((item) => {
        const inforNormalize = normalizeString(
          item?.mealDtoForMealSession?.name
        );
        return inforNormalize.includes(searchNormalize);
      });
    }

    if (selectedDate) {
      filteredData = filteredData.filter((item) =>
        item.createDate.includes(selectedDate)
      );
      getAllSession().then((res) => {
        setSession(
          res.filter((item) => {
            return item?.endDate?.includes(selectedDate);
          })
        );
      });
      filtertedSessionData = filtertedSessionData?.filter((item) => {
        item.endDate?.includes(selectedDate);
      });
    }

    if (areaValue) {
      filteredData = filteredData.filter(
        (item) =>
          // item.sessionDtoForMealSession?.areaDtoForMealSession?.areaId === areaValue
          item?.areaDtoForMealSession?.areaId == areaValue
      );
    }
    if (sessionValue) {
      filteredData = filteredData.filter(
        (item) => item.sessionDtoForMealSession?.sessionId === sessionValue
      );
      setArea(
        session.find((item) => item.sessionId === sessionValue)
          ?.areaDtoGetAllSession
      );
    }
    // You can add more conditions as needed...

    setNewData(filteredData);
    setSession(filtertedSessionData);
  }, [search, selectedDate, areaValue, sessionValue, data]);

  return (
    <div className="h-full w-full p-4">
      <CustomDrawer meal={drawerData || {}} />
      {contextHolder}
      <div className="account-search flex items-center justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Meal Session Management</h1>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-between mb-5 w-[100%]  lg:flex md:w-full md:flex md:flex-row md:gap-3 lg:w-[100%]">
          <div className="flex w-full lg:my-2 lg:flex lg:flex-row lg:w-full lg:justify-between  md:w-full md:flex md:flex-row  flex-col gap-5">
            <Input
              placeholder="Enter meal's name..."
              onChange={(e) => setSearch(e.target.value)}
              className="box__shadow !h-[50px] lg:w-[30%] md:w-[30%]"
            />
            <DatePicker
              // value={selectedDate}
              defaultValue={dayjs()}
              format="DD-MM-YYYY"
              onChange={(date, dateString) => {
                setSelectedDate(dateString);
              }}
              className="box__shadow !h-[50px] w-full lg:w-[30%] md:w-[30%]"
            />
            <div className=" w-full lg:w-[20%] md:w-[20%] !h-[50px] ">
              <Popover
                className="w-full h-full"
                content={content2}
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
        </div>
        <div className="w-full overflow-hidden">
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
              className="overflow-auto"
              dataSource={newData}
              columns={columns}
              loading={loading}
              rowKey={(item) => item.mealSessionId}
              rowSelection={rowSelection}
              pagination={{ pageSize: 5 }}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "odd-row" : "even-row"} ${
                  record.status.includes("COMPLETED") ||
                  record.status.includes("CANCELLED")
                    ? "disabled-row"
                    : ""
                }`
              }
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
