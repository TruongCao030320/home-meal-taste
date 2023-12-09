import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Input,
  DatePicker,
  Select,
  Button,
  ConfigProvider,
  Popover,
  Form,
} from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import { TbSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import { getAllOrder } from "../../API/Admin";
import { direction } from "../../API/Direction";
import { formatMoney } from "../../API/Money";

const Order = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();

  const [genderSelected, setGenderSelected] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "orderId",
      render: (text) => (
        <div className="">
          <p className="font-bold">{text}</p>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "customer",
      // render: (name) => `${name.first} ${name.last}`
      render: (_, record) => (
        <p className="font-bold">{record.customerDto1.name}</p>
      ),
    },
    {
      title: "Store",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="font-bold">
          {record.mealSessionDto1.mealDto1.kitchenDto1.name}
        </p>
      ),
    },
    {
      title: "Product",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="font-bold">{record.mealSessionDto1.mealDto1.name}</p>
      ),
    },
    {
      title: "Create At",
      dataIndex: "time",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const dateA = moment(a.time, "DD-MM-YYYY HH:mm");
        const dateB = moment(b.time, "DD-MM-YYYY HH:mm");
        return dateA - dateB;
      },
      render: (text) => <p className="font-bold">{text}</p>,
    },
    {
      title: "Price/VND",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        const finalText = text.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="font-bold">{finalText}</p>
          </Tag>
        );
      },
    },
  ];
  useEffect(() => {
    setLoading(true);
    getAllOrder()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    console.log(typeof search);
  }, [search]);
  const navigatePage = (id) => {
    navigate(`/${direction.dashboard}/${direction.order}/${id}`);
  };
  const resetFilter = () => {
    setFilteredData();
    setGenderSelected();
    setSelectedDateRange();
  };
  const content2 = (
    <Form
      className="min-w-[300px] grid gap-5"
      name="filterForm"
      // onFinish={onFinish}
    >
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Status</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={[
                { value: "1", label: "PAID" },
                { value: "2", label: "CANCELLED" },
              ]}
            ></Select>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Kitchen</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
              value={genderSelected}
              onChange={(value) => setGenderSelected(value)}
            ></Select>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Create At</h2>
          </div>
          <div className="w-[70%]">
            <RangePicker onChange={(dates) => setSelectedDateRange(dates)} />
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="w-full flex justify-end gap-2">
          <Button onClick={resetFilter}>Reset</Button>
          <Button htmlType="submit">Filter</Button>
        </div>
      </Form.Item>
    </Form>
  );

  const newData = data?.filter((item) => {
    if (search.length > 2) {
      // Check if the phone number exists and includes the search string
      return item.customerDto1?.phone == search;
    } else {
      return item.orderId == search;
    }
  });
  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
          <h1>Order Management</h1>
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        <div className="account-search flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:gap-3">
          <div className="account-search lg:flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
            <div className="my-2">
              <Input
                placeholder="Enter Order ID or Phone"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
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
                  footerBg: "black",
                  bodySortBg: "transparent",
                  headerSortActiveBg: "#F7F5FF",
                },
              },
            }}
          >
            <Table
              dataSource={search ? newData : data}
              columns={columns}
              loading={loading}
              pagination={{ pageSize: 5 }}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
              }
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    navigatePage(record.orderId);
                  },
                };
              }}
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default Order;
