import "../styles/Pagination.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
import { getAllMeal, getAllMealSession, getSingleMeal } from "../API/Admin";
import { direction } from "../API/Direction";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "./MealDrawer";
import { getSingleMealSessionById } from "../API/Admin";
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [drawerData, setDrawerData] = useState({});
  const showToastMessage = () => {
    toast.success("Delete successfully.");
  };
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  console.log(refresh);
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
  const toggleDrawerType2 = async (mealSessionId) => {
    console.log("vao2 day96 khong6", mealSessionId);
    await getSingleMealSessionById(mealSessionId)
      .then((res) => setDrawerData(res))
      .catch((error) => console.log(error));
    dispatch(showDrawer(mealSessionId));
  };
  const [searchTerm, setSearchTerm] = useState("");

  const productPerPage = 12;
  const searchedProduct = data?.filter((item) => {
    if (searchTerm === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    }
  });
  const content2 = (
    <div className="min-w-[300px] grid gap-5">
      <div className="flex w-full justify-between items-center">
        <div className="w-[20%]">
          <h2>Status</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            options={[
              { value: "1", label: "Approved" },
              { value: "2", label: "Cancelled" },
              { value: "3", label: "Pending" },
            ]}
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
            options={[
              { value: "1", label: "Approved" },
              { value: "2", label: "Cancelled" },
              { value: "3", label: "Pending" },
            ]}
          ></Select>
        </div>
      </div>
    </div>
  );
  const columns = [
    {
      title: "Menu",
      dataIndex: "image",
      render: (_, record) => (
        <div className="lg:w-full md:w-[100px] h-[120px] p-1 flex justify-center items-center">
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
  const goToProductDetail = (id) => {
    navigate(`/${direction.dashboard}/${direction.meal}/${id}`);
  };
  const fetchAllMealSession = () => {
    setLoading(true);
    getAllMealSession().then((res) => {
      console.log(res);
      setData(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllMealSession();
  }, [refresh]);
  return (
    <div className="h-full w-full p-4">
      <CustomDrawer meal={drawerData || {}} />
      {contextHolder}
      <div className="account-search flex items-center justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Meal Management</h1>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-between mb-5 w-[100%]  lg:flex md:w-full md:grid md:grid-cols-2 md:gap-3 lg:w-[100%]">
          <div className="my-2">
            <Input
              placeholder="Enter meal's name..."
              onChange={(e) => setSearch(e.target.value)}
              className="box__shadow"
              suffix={<TbSearch />}
            />
          </div>

          <div className="my-2">
            <Popover
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
                },
              },
            }}
          >
            <Table
              dataSource={data}
              columns={columns}
              loading={loading}
              pagination={{ pageSize: 5 }}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "odd-row" : "even-row"}`
              }
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
