import React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Input,
  ConfigProvider,
  Tag,
  Steps,
  Button,
  Divider,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import buncha from "../../../assets/images/buncha.png";
import { render } from "react-dom";
import { direction } from "../../../API/Direction";
import { AdminCancelledOrder, getOrderById } from "../../../API/Admin";
import { toast } from "react-toastify";
import { formatMoney } from "../../../API/Money";
const columns = [
  {
    title: "Meal ID",
    render: (_, record, index) => (
      <div className="flex justify-start items-center p-2">
        <h1>{record.mealSessionDto2?.mealDto2?.mealId}</h1>
      </div>
    ),
  },
  {
    title: "Meal ID",
    render: (_, record, index) => (
      <div className="flex justify-start items-center p-2">
        <img
          className="w-[100px] h-[100px] rounded-full mr-5"
          src={record.mealSessionDto2.mealDto2.image}
        ></img>
      </div>
    ),
  },
  {
    title: "Meal's Title",
    render: (_, record) => (
      <div>
        <p className="font-bold">{record.mealSessionDto2?.mealDto2?.name}</p>
      </div>
    ),
  },
  {
    title: "Kitchen",
    render: (_, record) => (
      <p className="font-bold">
        {record.mealSessionDto2?.mealDto2?.kitchenDto2?.name}
      </p>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    render: (text) => <p className="font-bold">{text}</p>,
  },
  {
    title: "Create At",
    dataIndex: "time",
    render: (text) => <p className="font-bold">{text}</p>,
  },
  {
    title: "Price (VND)",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
    render: (_, record) => (
      <p className="font-bold">{formatMoney(record.mealSessionDto2.price)}</p>
    ),
  },
];
const OrderTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [bigData, setBigData] = useState();
  const [loading, setLoading] = useState(false);

  const [orderDetail, setOrderDetail] = useState({});
  const { orderId, time, status } = orderDetail;
  const { name, phone, userId } = orderDetail.customerDto2 || {};
  const fetchOrderDetail = () => {
    getOrderById(id).then((res) => {
      setOrderDetail(res);
      setData([res]);
    });
  };
  const handleCancelledOrder = () => {
    AdminCancelledOrder({ orderId: id })
      .then((res) => {
        fetchOrderDetail();
        toast.success("Update status completed.");
      })
      .catch((error) => toast.error("Can not cancelled."));
  };
  const navigateToUserDetail = () => {
    navigate(`/${direction.dashboard}/${direction.user}/${userId}`);
  };
  useEffect(() => {
    fetchOrderDetail();
  }, []);
  return (
    <div className="w-full h-full p-4">
      {" "}
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex flex-col w-full py-3">
          <h1 className="">
            Order ID : #<span className="text-red-500">{id}</span>{" "}
          </h1>
          <h1>
            {" "}
            <span>Create At: {time} </span>
          </h1>
          <h1>
            Status : <Tag className="px-3 py-1">{status}</Tag>
          </h1>
          {/* {orderDetail.status?.includes("CANCELLED") ? (
            ""
          ) : (
            <Button
              className="w-[120px] my-2"
              onClick={() => handleCancelledOrder()}
            >
              Cancel Order
            </Button>
          )} */}
        </div>
        <div>
          <Link to={`/${direction.dashboard}/${direction.order}`}>
            <Button>Leave</Button>
          </Link>
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        {/* <div className="my-5">
          <Steps
            items={[
              {
                title: "Paid",
                description: "23-7-2023",
                status: "finish",
                icon: <UserOutlined />,
              },
              {
                title: "Cancelled..",
                description: "23-7-2023",
                status: "error",
                icon: <SmileOutlined />,
              },
            ]}
          />
        </div> */}
        <div className="w-full min-h-[150px] rounded-lg flex p-4 bg-colorBg my-5 flex-row justify-between items-center">
          <div className=" border-2 rounded-3xl p-5 box__shadow my-5 w-[30%]">
            <div className="w-full flex flex-col lg:flex lg:flex-row justify-between items-center">
              <h1>Status</h1>
              <div
                style={{
                  fontWeight: 500,
                  color: orderDetail?.status?.includes("APPROVED")
                    ? "green"
                    : orderDetail?.status?.includes("CANCELLED")
                    ? "gray"
                    : orderDetail?.status?.includes("COMPLETED")
                    ? "orangered"
                    : "",
                }}
              >
                {orderDetail?.status}
              </div>
            </div>
            <Divider></Divider>

            <Select
              disabled={
                orderDetail?.status === "COMPLETED" ||
                orderDetail?.status === "CANCELLED"
                  ? true
                  : false
              }
              className="w-full"
              options={[
                {
                  value: "COMPLETED",
                  label: "Complete",
                },
                {
                  value: "CANCELLED",
                  label: "Cancel",
                },
                // {
                //   value: "COMPLETED",
                //   label: "Complete",
                //   disabled: meal?.status?.includes("COMPLETED"),
                // },
              ]}
              // onChange={onHandleSelectStatusToChange}
            ></Select>
          </div>
          <div className="flex gap-5 items-center w-[60%] border-2 box__shadow rounded-3xl p-6">
            <div
              className="border w-[100px] p-3 box__shadow text-center rounded-full border-black hover:cursor-pointer hover:shadow-xl transition-all duration-500"
              onClick={() => navigateToUserDetail()}
            >
              <UserOutlined size={30} className="text-7xl" />
            </div>
            <div>
              <h1 className="font-bold my-2">
                {name} #<span className="text-red-400">{userId}</span>
              </h1>
              <Tag color="blue" className="font-bold p-2">
                <PhoneFilled className="text-xl rotate-[100deg] mr-2" />
                {phone}
              </Tag>
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-auto no-scrollbar">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#F7F5FF",
                  headerBorderRadius: 8,
                  headerSplitColor: "none",
                  fontSize: 20,
                  fontWeightStrong: 700,
                },
              },
            }}
          >
            <Table
              dataSource={data}
              columns={columns}
              loading={loading}
              pagination={{ pageSize: 5 }}
              footer={(record, index) => {
                return (
                  <div className=" h-10 flex justify-end text-red-500 text-xl font-bold">
                    Total: {formatMoney(record[0]?.totalPrice)} VND
                  </div>
                );
              }}
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
