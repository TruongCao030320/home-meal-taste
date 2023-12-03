import React, { useEffect, useState, createContext, useRef } from "react";
import { FilterFilled } from "@ant-design/icons";
import { TbBroadcast, TbSearch } from "react-icons/tb";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

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
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import {
  getAllMealSessionBySessionId,
  getSingleMealSessionById,
} from "../API/Admin";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "./MealDrawer";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const ExpandedContent = ({ sessionId }) => {
  const [drawerData, setDrawerData] = useState({});
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const dispatch = useDispatch();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[0])
  );
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
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const dateA = new Date(a.createDate);
        const dateB = new Date(b.createDate);

        return dateA - dateB;
      },
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
          <div className="flex justify-between w-[50px] items-center ">
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
  const toggleDrawerType2 = async (mealSessionId) => {
    console.log("vao2 day96 khong6", mealSessionId);
    await getSingleMealSessionById(mealSessionId)
      .then((res) => setDrawerData(res))
      .catch((error) => console.log(error));
    dispatch(showDrawer(mealSessionId));
  };

  const fetchAllMealSessionBySessionId = () => {
    getAllMealSessionBySessionId(sessionId).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    if (search) {
      setNewData(
        newData.filter((item) => {
          const inforNormalize = normalizeString(
            item?.mealDtoForMealSession?.name
          );
          const searchNormalize = normalizeString(search);
          return inforNormalize.includes(searchNormalize);
        })
      );
    } else if (selectedDate) {
      setNewData(
        data.filter((item) => {
          return item.createDate.includes(selectedDate);
        })
      );
    } else {
      setNewData(data);
    }
  }, [search, selectedDate]);
  useEffect(() => {
    fetchAllMealSessionBySessionId();
  }, [refresh]);
  return (
    <div className="overflow-auto w-full p-2 bg-white rounded-lg">
      <CustomDrawer meal={drawerData || {}} />
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
          <h1>Product In Session</h1>
        </div>
      </div>
      <div className="account-search flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:gap-3 ">
        <div className="my-2 flex flex-row w-[40%] justify-between">
          <Input
            placeholder="Enter data to find...."
            onChange={(e) => setSearch(e.target.value)}
            className="box__shadow"
            suffix={<TbSearch />}
          />
          <DatePicker
            // value={selectedDate}
            defaultValue={dayjs()}
            format="DD-MM-YYYY"
            onChange={(date, dateString) => {
              setSelectedDate(dateString);
            }}
            className="box__shadow !h-[50px] mx-3 !w-[300px]"
          />
        </div>
        {/* <div className="my-2">
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
        </div> */}
      </div>
      <Table
        columns={detailColumns}
        dataSource={newData}
        pagination={{ pageSize: 5 }}
      ></Table>
    </div>
  );
};

export default ExpandedContent;
