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
  getAllKitchenBySessionId,
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
import axios from "axios";
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
  const [kitchen, setKitchen] = useState([]);
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
          <h2>Category</h2>
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
          <h2>Brand</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            options={kitchen?.map((item) => ({
              value: item?.kitchenId,
              label: item?.name,
            }))}
            value={chefValue}
            onChange={(item) => setChefValue(item)}
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
      title: "Thumbnail",
      dataIndex: "image",
      render: (_, record) => (
        <img className="w-10 h-10  rounded-full" src={record.thumbnail}></img>
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex  justify-between items-center">
          <div className="lg:flex lg:flex-row lg:justify-between lg:w-[80%] flex flex-col">
            <div className="">
              <div className="">
                <h2 className="font-bold">{record.title}</h2>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "",
      render: (_, record) => (
        <span className="font-bold">{formatMoney(record.price)}$</span>
      ),
      sorter: (a, b) => a.price > b.price,
    },
    {
      title: "Discount(%)",
      dataIndex: "",
      render: (_, record) => (
        <p className="font-bold">{record.discountPercentage}</p>
      ),
      sorter: (a, b) => a.discountPercentage > b.discountPercentage,
    },
    {
      title: "Remain",
      dataIndex: "",
      render: (_, record) => <span className="font-bold">{record.stock}</span>,
      sorter: (a, b) => a.stock > b.stock,
    },
    {
      title: "Category",
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex  justify-between items-center">
          <div className="w-full">
            <Tag
              className="p-2 shadow-md min-w-[100px] text-center"
              color="green"
            >
              <span className="font-bold">{record.category}</span>
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
          <div
            onClick={() => console.log(record)}
            className="flex justify-between w-[50px] items-center "
          >
            <AiTwotoneEdit
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn cursor-pointer"
              // onClick={() => toggleDrawerType2(record.mealSessionId)}
              onClick={() => navigateToMealSessionDetail(record)}
            />
          </div>
        </Space>
      ),
      sorter: (a, b) => a.price - b.price,
    },
  ];
  const navigateToMealSessionDetail = (record) => {
    navigate(`${direction.mealSessionDetail}/${record.id}`, {
      mealSessionId: record.id,
    });
  };
  const fetchAllMealSession = () => {
    setLoading(true);
    // getAllMealSession().then((res) => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setData(res.products.slice().reverse());

        setNewData(res.products);
      })
      .finally(() => setLoading(false));
  };

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
    fetchAllSession();
  }, []);

  const fetchAllSession = () => {
    getAllSession().then((res) => {
      setSession(res);
    });
  };
  const fetchAllKitchenBySessionId = () => {
    getAllKitchenBySessionId(sessionValue).then((res) => {
      setKitchen(res);
    });
  };

  useEffect(() => {
    let filteredData = data;
    console.log("filterdata", filteredData);
    console.log("search là", search);
    if (search) {
      const searchNormalize = normalizeString(search);
      filteredData = filteredData.filter((item) => {
        const inforNormalize = normalizeString(item?.title);
        return inforNormalize.includes(searchNormalize);
      });
    }
    setNewData(filteredData);
  }, [search]);
  return (
    <div className="h-full w-full p-4">
      <CustomDrawer meal={drawerData || {}} />
      {contextHolder}
      <div className="account-search flex items-center justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Stock Management</h1>
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
              rowKey={(item) => item.id}
              rowSelection={rowSelection}
              pagination={{ pageSize: 10 }}
              // rowClassName={(record, index) =>
              //   `custom-row ${index % 2 === 0 ? "odd-row" : "even-row"} ${
              //     record.status.includes("COMPLETED") ||
              //     record.status.includes("CANCELLED")
              //       ? "disabled-row"
              //       : ""
              //   }`
              // }
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
