import React, {
  useEffect,
  useState,
  createContext,
  useRef,
  useLayoutEffect,
} from "react";
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
  getAllOrderByMealSessionId,
  getSingleMealSessionById,
  getTotalPriceInEveryMealSession,
} from "../API/Admin";
import { useDispatch, useSelector } from "react-redux";
import { showDrawer } from "../redux/ToggleDrawerMealSlice.js";
import CustomDrawer from "./MealDrawer";
import { Background } from "victory";
import { formatMoney } from "../API/Money.js";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const ExpandedContent = ({ mealSessionId }) => {
  console.log("mealsessionid", mealSessionId);
  const [drawerData, setDrawerData] = useState({});
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  const [search, setSearch] = useState("");
  const [newData, setNewData] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [totalPriceInEveryMealSession, setTotalPriceInEveryMealSession] =
    useState();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );
  const detailColumns = [
    {
      title: "Order ID",
      render: (_, record) => (
        <div className="">
          <h1>{record.orderId}</h1>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "",
      render: (_, record) => (
        <div className="flex flex-row">
          <h1>{record.cutomerDtoGetAllOrderByMealSessionId.name}</h1>
          <Divider type="vertical" className="h-[30px] bg-slate-300" />
          <h1>{record.cutomerDtoGetAllOrderByMealSessionId.phone}</h1>
        </div>
      ),
    },
    {
      title: "Create At",
      dataIndex: "",
      render: (_, record) => (
        <div className="">
          <h1>{record.time}</h1>
        </div>
      ),
    },
    {
      title: "Booking Slot",
      dataIndex: "",
      render: (_, record) => (
        <div className="">
          <h1>{record.quantity}</h1>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "totalPrice",
      render: (_, record) => (
        <div className="flex  justify-between items-center">
          {/* <div>
            <Tag
              className="p-2"
              color={record.status.includes("CANCELLED") ? "error" : "green"}
            >
              {record.status}
            </Tag>
          </div>
          <div> */}
          <Tag
            className="p-2 shadow-md min-w-[100px] text-center"
            color={`${
              record.status.includes("PAID")
                ? "blue"
                : record.status.includes("COMPLETED")
                ? "green"
                : "red"
            }`}
          >
            <span className="font-bold">{record.status}</span>
          </Tag>
        </div>
        // </div>
      ),
      filters: [
        { text: "PAID", value: "PAID" },
        { text: "CANCELLED", value: "CANCELLED" },
        { text: "COMPLETED", value: "COMPLETED" },
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
      render: (_, record) => {
        const formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "VND",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
          .format(record.totalPrice)
          .replace("₫", "");

        return (
          <Space
            size="middle"
            className=" hover:border-gray-600 flex flex-col  w-[150px]"
          >
            <h1>{formattedPrice} VND</h1>
            {/* <div className="flex justify-between w-[50px] items-center ">
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
            </div> */}
          </Space>
        );
      },
      sorter: (a, b) => a.price - b.price,
    },
  ];
  const toggleDrawerType2 = async (mealSessionId) => {
    console.log("mealsession id là", mealSessionId);
    if (mealSessionId !== null) {
      await getSingleMealSessionById(mealSessionId)
        .then((res) => setDrawerData(res))
        .catch((error) => console.log(error));
      dispatch(showDrawer(mealSessionId));
    } else {
      return;
    }
  };
  const fetchOrderByMealSessionId = () => {
    getAllOrderByMealSessionId(mealSessionId).then((res) => {
      setData(res);
      setNewData(
        res.filter((item) => {
          return item.time.includes(selectedDate);
        })
      );
    });
  };
  const fetchTotalPriceEveryMealSession = () => {
    getTotalPriceInEveryMealSession(mealSessionId).then((res) => {
      setTotalPriceInEveryMealSession(res);
    });
  };
  // fetchAllMealSessionBySessionId();
  useEffect(() => {
    // if (search) {
    //   setNewData(
    //     newData.filter((item) => {
    //       const inforNormalize = normalizeString(
    //         item?.mealDtoForMealSession?.name
    //       );
    //       const searchNormalize = normalizeString(search);
    //       return inforNormalize.includes(searchNormalize);
    //     })
    //   );
    // } else if (selectedDate) {
    //   return setNewData(
    //     data.filter((item) => {
    //       return item.time.includes(selectedDate);
    //     })
    //   );
    // } else {
    //   setNewData(data);
    // }
  }, [search, selectedDate]);
  useEffect(() => {
    fetchOrderByMealSessionId();
    fetchTotalPriceEveryMealSession();
  }, [refresh]);
  return (
    <div className="overflow-auto w-full p-2 bg-white rounded-lg">
      {/* <CustomDrawer meal={drawerData || {}} /> */}
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
          <h1>Orders For Meal Session</h1>
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
          {/* <DatePicker
            // value={selectedDate}
            defaultValue={dayjs()}
            format="DD-MM-YYYY"
            onChange={(date, dateString) => {
              setSelectedDate(dateString);
            }}
            className="box__shadow !h-[50px] mx-3 !w-[300px]"
          /> */}
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
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F7F5FF",
              headerBorderRadius: 8,
              headerSplitColor: "none",
              fontSize: 20,
              fontWeightStrong: 700,
              footerBg: "white",
            },
          },
        }}
      >
        <Table
          columns={detailColumns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          footer={(record, index) => {
            return (
              <div className=" h-10 flex justify-end text-red-500 text-xl font-bold">
                Total:{" "}
                {totalPriceInEveryMealSession
                  ? formatMoney(totalPriceInEveryMealSession)
                  : 0}{" "}
                VND
              </div>
            );
          }}
        ></Table>
      </ConfigProvider>
    </div>
  );
};

export default ExpandedContent;
