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
  Switch,
} from "antd";
import moment from "moment";
import toast from "react-hot-toast";
import { TbSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
import {
  getAllOrder,
  getAllTransaction,
  getAllTransactionOrdered,
  getAllTransactionRecharge,
} from "../../API/Admin";
import { direction } from "../../API/Direction";
import { formatMoney } from "../../API/Money";

const Transaction = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [SwitchTran, setSwitchTran] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [transaction, setTransaction] = useState([]);
  const [genderSelected, setGenderSelected] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [data, setData] = useState([]);
  const fetchAllTransaction = () => {
    setLoading(true);
    getAllTransaction().then((res) => {
      setTransaction(res);
      setLoading(false);
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "transactionId",
      render: (text) => (
        <div className="">
          <p className="font-bold">{text}</p>
        </div>
      ),
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      // render: (name) => `${name.first} ${name.last}`
      render: (_, record) => (
        <p className="font-bold">
          {record.orderDtoGetAllTransactions?.orderId}
        </p>
      ),
    },
    {
      title: "Description",
      // render: (name) => `${name.first} ${name.last}`
      render: (_, record) => <p className="text-xs">{record.description}</p>,
    },
    {
      title: "User",
      dataIndex: "walletDtoGetAllTransaction",
      render: (_, record) => (
        <div>
          <p className="font-bold">
            {record.userDtoGetAllTransactions?.username}
          </p>
          <p>{record.userDtoGetAllTransactions?.phone}</p>
        </div>
      ),
    },
    {
      title: "Create At",
      dataIndex: "date",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-")) || 0;
        const dateB = new Date(b.date.split("-").reverse().join("-")) || 0;

        return dateA - dateB;
      },
      render: (text) => <p className="font-bold">{text}</p>,
    },
    {
      title: "Amount/VNĐ",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        const finalText = text.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="font-bold">{finalText}</p>
          </Tag>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      render: (text) => {
        const finalText = text.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="font-bold">{finalText}</p>
          </Tag>
        );
      },
      filters: [
        {
          text: "RECEIVE REVENUE",
          value: "RR",
        },
        {
          text: "ORDERED",
          value: "ORDERED",
        },
        {
          text: "TOTAL TRANSFER",
          value: "TT",
        },
        {
          text: "REFUNDED",
          value: "REFUNDED",
        },
      ],
      onFilter: (value, record) =>
        record.transactionType.toUpperCase().includes(value),
    },
  ];
  const fetchAllTransactionRecharge = () => {
    getAllTransactionRecharge().then((res) => {
      setTransaction(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    // setLoading(true);
    // getAllTransactionOrdered()
    //   .then((res) => {
    //     setData(res);
    //     setLoading(false);
    //   })
    //   .catch((error) => console.log(error));
    // fetchAllTransactionRecharge();
    fetchAllTransaction();
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
    return item.walletDtoGetAllTransaction?.userDtoGetAllTransaction?.phone.includes(
      search
    );
  });
  const newData2 = transaction.filter((item) => {
    return item.walletDtoGetAllTransactionRECHARGED?.userDtoGetAllTransactionRECHARGED?.phone.includes(
      search
    );
  });
  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
          <h1>Transaction Management</h1>
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        <div className="account-search flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:gap-3">
          <div className="account-search lg:flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
            <div className="my-2 flex flex-row gap-2 justify-center items-center">
              <Input
                placeholder="...."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="box__shadow"
                suffix={<TbSearch />}
              />
              {/* <div>
                <Switch
                  className="shadow-lg bg-gray-400"
                  checkedChildren="Order"
                  unCheckedChildren="Recharge"
                  onChange={() => setSwitchTran(!SwitchTran)}
                ></Switch>
              </div> */}
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
        <div>
          <h1 className="text-red-400">RR : Receive Revenue</h1>
          <h1 className="text-red-400">TT : Total Transfer</h1>
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
                },
              },
            }}
          >
            <Table
              dataSource={transaction}
              columns={columns}
              loading={loading}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
              }
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
