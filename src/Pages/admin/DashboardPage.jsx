import React, { useEffect, useState } from "react";
import { Table, Tag, ConfigProvider, Timeline } from "antd";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { Component } from "react";
import { fakerDE as faker } from "@faker-js/faker";
import {
  countAllOrder,
  countCustomer,
  getAllOrder,
  getAllRevenue,
  getAllTransactionOrderType,
  getTop5Chef,
  getTop5Customer,
  getTotalIn12Month,
} from "../../API/Admin";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../API/Money";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paperclip, user } from "fontawesome";
import { faNewspaper, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { direction } from "../../API/Direction";
import alternateImage from "../../assets/images/buncha.png";
const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [kitchen, setKitchen] = useState();
  const [topCustomer, setTopCustomer] = useState([]);
  const [customer, setCustomer] = useState();
  const [order, setOrder] = useState(0);
  const money = [
    {
      month: "Feb",
      money: 5000,
    },
    {
      month: "Jan",
      money: 5000,
    },
    {
      month: "Mar",
      money: 12000,
    },
    {
      month: "Apr",
      money: 70000,
    },
    {
      month: "May",
      money: 36000,
    },
    {
      month: "Jun",
      money: 30100,
    },
    {
      month: "July",
      money: 30200,
    },
    {
      month: "Aug",
      money: 39000,
    },
    {
      month: "Sep",
      money: 30001,
    },
    {
      month: "Nov",
      money: 30002,
    },
    {
      month: "Dec",
      money: 300055,
    },
  ];
  const [revenue, setRevenue] = useState({});

  const transaction = [
    {
      user: faker.number.int(),
      status: "has paid for order",
      order: Math.random(),
    },
    {
      user: faker.number.int(),
      status: "has paid for order",
      order: faker.number.int(),
    },
    {
      user: faker.number.int(),
      status: "has paid for order",
      order: faker.number.int(),
    },
    {
      user: faker.number.int(),
      status: "has paid for order",
      order: faker.number.int(),
    },
    {
      user: faker.number.int(),
      status: "has paid for order",
      order: faker.number.int(),
    },
    {
      user: faker.number.int(),
      status: "has paid for order",
      order: faker.number.int(),
    },
  ];
  const card = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Revenue",
      number: formatMoney(revenue?.result || 0) + " VND",
      bgColor: "bg-green-300",
      bgCard: "bg-gray-400",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      ),
      title: "Order",
      number: order,
      bgColor: "bg-yellow-200",
      bgCard: "bg-red-400",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
      ),
      title: "Happy Client",
      number: customer,
      bgColor: "bg-blue-300",
      bgCard: "bg-light-400",
    },
  ];
  const fetchAllRevenue = () => {
    getAllRevenue().then((res) => {
      setRevenue(res);
    });
  };
  const fetchAllTransaction = () => {
    // getAllTransactionOrderType().then((res) => {
    //   setTransaction(res?.slice().reverse());
    // });
  };
  const fetchCountAllOrder = () => {
    countAllOrder().then((res) => {
      setOrder(res);
    });
  };
  const fetchCountCustomer = () => {
    countCustomer()
      .then((res) => {
        setCustomer(res);
      })
      .catch((error) => console.log(error));
  };
  const fetchTop5Chef = () => {
    getTop5Chef()
      .then((res) => {
        setKitchen(res);
      })
      .catch((error) => console.log(error));
  };
  const formatMonth = (monthNumber) => {
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Check if the monthNumber is valid (between 1 and 12)
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return "Invalid Month";
    }
  };
  const fetchTotal12Month = () => {
    getTotalIn12Month()
      .then((res) => {
        setMoney(
          res?.map((item) => {
            return {
              month: formatMonth(item?.month),
              money: item?.totalPrice,
            };
          })
        );
      })
      .catch((error) => console.log(error));
  };
  const fetchTop5Customer = () => {
    getTop5Customer()
      .then((res) => {
        console.log(res);
        setTopCustomer(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUserTimelineClick = (id) => {
    navigate(`/${direction.dashboard}/${direction.user}/${id}`);
  };
  useEffect(() => {
    fetchAllRevenue();
    fetchCountAllOrder();
    fetchCountCustomer();
    fetchAllTransaction();
    fetchTotal12Month();
    fetchTop5Customer();
    fetchTop5Chef();
  }, []);
  useEffect(() => {
    getAllOrder()
      .then((res) => {
        setData(res.slice().reverse());
      })
      .catch((err) => console.log(err));
  }, []);
  //   const { id, description, price, thumbnail } = data;
  const columns = [
    {
      title: <p className="font-bold text-xl">Recent Orders</p>,
      dataIndex: "thumbnail",
      render: (_, record, index) => (
        <div className=" w-[100px] h-[100px] rounded-lg overflow-hidden">
          <img
            src={
              record.mealSessionDto1?.mealDto1?.image
                ? record.mealSessionDto1?.mealDto1?.image
                : alternateImage
            }
            className="w-full h-[100%]"
          ></img>
        </div>
      ),
    },
    {
      dataIndex: "title",
      render: (_, record, index) => (
        <div className="leading-7 md:overflow-auto md:w-[200px]">
          <h1 className="font-bold">
            {record.mealSessionDto1?.mealDto1?.name}
          </h1>
          <p className="text-gray-400">
            {record.mealSessionDto1?.mealDto1?.description}
          </p>
          <p className="font-bold text-2xl">#{index + 1}</p>
          <p className="font-bold">{record.time}</p>
        </div>
      ),
    },
    {
      dataIndex: "",
      render: (_, record) => (
        <div className="md:w-[200px]">
          <h1 className=" font-bold">
            <span className="text-red-400">{record.customerDto1?.userId}#</span>
            {record.customerDto1?.name}
          </h1>
        </div>
      ),
    },
    {
      dataIndex: "price",
      render: (_, record) => (
        <div className="">
          <p className="font-bold">
            {formatMoney(record.mealSessionDto1?.price)} VND
          </p>
        </div>
      ),
    },
    {
      dataIndex: "",
      render: (_, record) => (
        <Tag color="geekblue" className=" py-2 px-3">
          {record.status}
        </Tag>
      ),
    },
  ];
  const columns1 = [
    {
      render: (_, record, index) => (
        <div className="text-red-600">#{index + 1}</div>
      ),
    },
    {
      dataIndex: "title",
      render: (_, record) => <div>{record.customerDtoGetTop5?.name}</div>,
    },
    {
      dataIndex: "title",
      render: (_, record) => (
        <div>
          <h1 className="font-bold text-sm text-black">{record.title}</h1>
        </div>
      ),
    },
    {
      dataIndex: "price",
      render: (_, record) => (
        <div className="flex flex-row gap-3 justify-between">
          <p className="font-bold text-sm">{record.orderTimes}</p>
          <FontAwesomeIcon icon={faNewspaper} color="#F0E901" />
        </div>
      ),
    },
  ];
  const columnsKitchen = [
    {
      render: (_, record, index) => (
        <div className="text-red-600">#{index + 1}</div>
      ),
    },
    {
      dataIndex: "title",
      render: (_, record) => <div>{record.chefDtoGetTop5?.name}</div>,
    },
    {
      dataIndex: "title",
      render: (_, record) => (
        <div>
          <h1 className="font-bold text-sm text-black">{record.title}</h1>
        </div>
      ),
    },
    {
      dataIndex: "price",
      render: (_, record) => (
        <div className="flex flex-row gap-3 justify-between">
          <p className="font-bold text-sm">{record.orderTimes}</p>
          <FontAwesomeIcon icon={faNewspaper} color="#F0E901" />
        </div>
      ),
    },
  ];
  const renderTimelineItems = (transactions) => {
    return transactions?.map((transaction) => (
      <Timeline.Item key={transaction.id}>
        <p
          className="text-sm font-bold text-amber-400 underline hover:cursor-pointer hover:text-zinc-400"
          onClick={() => {
            // handleUserTimelineClick(
            //   transaction.walletDtoGetAllTransaction?.userDtoGetAllTransaction
            //     ?.userId
            // );
          }}
        >
          {"User #" + transaction.user}
        </p>
        <p className="font-bold">{transaction.status}</p>
        <p className="font-bold"> - #{transaction.order}</p>
      </Timeline.Item>
    ));
  };
  return (
    <div className="w-full h-full p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Business Summary</h1>
        </div>
      </div>
      <div className=" xl:flex mt-5 justify-between  md:items-start lg:flex lg:flex-row lg:justify-between md:grid md:grid-cols-2">
        {card.map((item) => (
          <div
            className={`lg:w-[30%] w-full h-[120px] bg-bgColorBtn flex justify-start items-center box__shadow rounded-lg text-white md:w-[80%] my-5 `}
          >
            <div className={`p-3 border rounded-xl m-5 ${item.bgCard}`}>
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-base">{item.title}</p>
              <p className="font-bold text-base">{item.number}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:w-full lg:flex lg:flex-row lg:justify-between lg:p-4 md:flex md:flex-col">
        <div className="lg:w-[70%] lg:flex lg:flex-col md:w-full">
          <div className="overflow-scroll h-full lg:w-full lg:flex lg:flex-col lg:justify-start bg-white rounded-lg p-4 lg:overflow-auto lg:no-scrollbar md:overflow-auto md:no-scrollbar md:w-full">
            <h1 className="my-5">Revenue Statictical</h1>
            <LineChart
              className="w-full "
              width={800}
              height={400}
              data={money}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="linear" // Set interpolation type to "linear" for straight lines
                dataKey="money"
                name="Money"
                stroke="rgba(75, 192, 192, 0.8)"
              />
            </LineChart>
          </div>
          <div className="lg:w-full lg:flex lg:flex-row lg:justify-between  my-5 lg:gap-3 md:flex-col md:gap-3">
            <div className="lg:w-[45%] h-full bg-white rounded-lg  md:w-full">
              <div className="account-search h-[10%] flex items-center  justify-end mb-3">
                <div className="h-[40%] add-btn flex flex-col justify-between items-center w-full p-3">
                  <div className="my-3">
                    <h1>Top Customer</h1>
                  </div>
                  <div className="w-full h-full no-scrollbar p-1">
                    <ConfigProvider
                      theme={{
                        components: {
                          Table: {
                            headerBorderRadius: 8,
                            headerSplitColor: "none",
                            fontSize: 20,
                            fontWeightStrong: 700,
                          },
                        },
                      }}
                    >
                      <Table
                        showHeader={false}
                        dataSource={topCustomer}
                        loading={loading}
                        columns={columns1}
                        pagination={{ pageSize: 5, hideOnSinglePage: true }}
                        rowClassName={(record, index) =>
                          `custom-row ${
                            index % 2 === 0 ? "even-row" : "odd-row"
                          }`
                        }
                        footer={false}
                      ></Table>
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[45%] h-full bg-white rounded-lg  md:w-full">
              <div className="account-search h-[10%] flex items-center  justify-end mb-3 p-3">
                <div className="h-[40%]  add-btn flex flex-col justify-between items-center w-full">
                  <div className="my-3">
                    <h1>Top Branch</h1>
                  </div>
                  <div className="w-full h-full  no-scrollbar p-1">
                    <ConfigProvider
                      theme={{
                        components: {
                          Table: {
                            headerBorderRadius: 8,
                            headerSplitColor: "none",
                            fontSize: 20,
                            fontWeightStrong: 700,
                          },
                        },
                      }}
                    >
                      <Table
                        showHeader={false}
                        dataSource={kitchen}
                        loading={loading}
                        columns={columnsKitchen}
                        pagination={{ pageSize: 5, hideOnSinglePage: true }}
                        rowClassName={(record, index) =>
                          `custom-row ${
                            index % 2 === 0 ? "even-row" : "odd-row"
                          }`
                        }
                        footer={false}
                      ></Table>
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[25%] lg:h-full lg:bg-white lg:rounded-lg lg:p-4 w-full h-[100px] bg-white rounded-lg">
          <h1>Recently Activities</h1>
          <div className="my-4">
            <Timeline>{renderTimelineItems(transaction)}</Timeline>
          </div>
        </div>
      </div>
      <div className="recentOrder mt-10 lg:overflow-auto md:overflow-auto md:w-full lg:w-full">
        <Table
          dataSource={data?.slice(0, 5)}
          columns={columns}
          loading={loading}
          className=""
        ></Table>
      </div>
    </div>
  );
};

export default DashboardPage;
