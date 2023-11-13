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
import { getAllOrder } from "../../API/Admin";
const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [data5, setData5] = useState();
  const chartData = [
    { name: "Feb", Customer: 10, Order: 150 },
    { name: "Jan", Customer: 15, Order: 200 },
    { name: "March", Customer: 7, Order: 200 },
    { name: "April", Customer: 22, Order: 200 },
    { name: "May", Customer: 22, Order: 200 },
    { name: "June", Customer: 22, Order: 300 },
    { name: "July", Customer: 22, Order: 300 },
    { name: "Aug", Customer: 22, Order: 300 },
    { name: "Sep", Customer: 22, Order: 300 },
    { name: "Oct", Customer: 22, Order: 300 },
    { name: "Nov", Customer: 22, Order: 300 },
    { name: "Dec", Customer: 22, Order: 300 },
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
      number: 18000,
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
      title: "Expense",
      number: 18000,
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
      number: 18000,
      bgColor: "bg-blue-300",
      bgCard: "bg-light-400",
    },
  ];
  useEffect(() => {
    getAllOrder().then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);
  //   const { id, description, price, thumbnail } = data;
  const columns = [
    {
      title: <p className="font-bold text-xl">Recent Orders</p>,
      dataIndex: "thumbnail",
      render: (_, record, index) => (
        <div className=" w-[100px] h-[100px] rounded-full overflow-hidden">
          <img src={record.meal.image} className="w-full h-[100%]"></img>
        </div>
      ),
    },
    {
      dataIndex: "title",
      render: (_, record, index) => (
        <div className="leading-7 md:overflow-auto md:w-[200px]">
          <h1 className="font-normal">{record.meal.name}</h1>
          <p className="text-gray-400">{record.description}</p>
          <p className="font-bold text-2xl">#{index + 1}</p>
          <p className="font-bold">{record.date}</p>
        </div>
      ),
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      dataIndex: "title",
      render: (_, record) => (
        <div className="md:w-[200px]">
          <h1 className="font-normal">{record.customer.name}</h1>
        </div>
      ),
    },
    {
      dataIndex: "price",
      render: (_, record) => (
        <div className="">
          <p className="font-bold">{record.promotionPrice}VND</p>
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
      dataIndex: "id",
      render: (text) => <div className="text-red-600">#{text}</div>,
    },
    {
      dataIndex: "title",
      render: (_, record) => (
        <div>
          <img
            src={record.thumbnail}
            className="w-[60px] h-[60px] rounded-full"
          ></img>
        </div>
      ),
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
        <div>
          <p className="font-thin text-sm">{record.price} VND</p>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full h-full p-4">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Business Summary</h1>
        </div>
      </div>
      <div className=" xl:flex mt-5 justify-between md:flex-col md:items-start lg:flex lg:flex-row lg:justify-between">
        {card.map((item) => (
          <div
            className={`lg:w-[30%] w-[30%] h-[120px] bg-bgColorBtn flex justify-start items-center box__shadow rounded-lg text-white md:w-[80%] md:my-5`}
          >
            <div className={`p-3 border rounded-xl m-5 ${item.bgCard}`}>
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-base">{item.title}</p>
              <p className="font-bold text-base">{item.number} VND</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between p-4">
        <div className="w-[70%] flex flex-col">
          <div className="h-full lg:w-full lg:flex lg:flex-col lg:justify-start bg-white rounded-lg p-4 lg:overflow-auto lg:no-scrollbar md:overflow-auto md:no-scrollbar md:w-full sm:overflow-auto sm:no-scrollbar">
            <h1>Revenue Statictical</h1>
            <LineChart
              className="w-full"
              width={800}
              height={400}
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="linear" // Set interpolation type to "linear" for straight lines
                dataKey="Customer"
                name="Customer"
                stroke="rgba(75, 192, 192, 0.8)"
              />
              <Line
                type="linear" // Set interpolation type to "linear" for straight lines
                dataKey="Order"
                name="Order"
                stroke="rgba(75, 0, 192, 0.8)"
              />
            </LineChart>
          </div>
          <div className="lg:w-full lg:flex lg:flex-row lg:justify-between  my-5 lg:gap-3 md:flex-col md:gap-3">
            <div className="lg:w-[45%] h-full bg-white rounded-lg mr-5  md:w-full">
              <div className="account-search h-[10%] flex items-center  justify-end mb-3">
                <div className="h-[40%] add-btn flex flex-col justify-between items-center w-full p-3">
                  <div className="my-3">
                    <h1>Top Customer</h1>
                  </div>
                  <div className="w-full h-full overflow-auto no-scrollbar p-1">
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
                        dataSource={data}
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
                    <h1>Top Selling Food</h1>
                  </div>
                  <div className="w-full h-full overflow-auto no-scrollbar p-1">
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
                        dataSource={data5}
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
          </div>
        </div>
        <div className="w-[25%] h-full bg-white rounded-lg p-4">
          <h1>Recently Activities</h1>
          <div className="my-4">
            <Timeline
              items={[
                {
                  children: "Create a services site 2015-09-01",
                },
                {
                  children: "Solve initial network problems 2015-09-01",
                },
                {
                  children: "Technical testing 2015-09-01",
                },
                {
                  children: "Network problems being solved 2015-09-01",
                },
              ]}
            />
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
