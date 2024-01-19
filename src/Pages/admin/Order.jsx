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
import {
  getAllArea,
  getAllKitchen,
  getAllOrder,
  getAllSession,
} from "../../API/Admin";
import { direction } from "../../API/Direction";
import { formatMoney } from "../../API/Money";
import dayjs from "dayjs";
const Order = () => {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [firstValueObject, setFirstValueObject] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);
  const [genderSelected, setGenderSelected] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [sessionIdValue, setSessionIdValue] = useState(null);
  const [areaIdValue, setAreaIdValue] = useState(null);
  const [chefIdValue, setChefIdValue] = useState(null);
  const [session, setSession] = useState([]);
  const [area, setArea] = useState([]);
  const [chef, setChef] = useState([]);
  const [newData, setNewData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("DD-MM-YYYY")
  );
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
        <div className="flex flex-col">
          <p className="font-bold">{record.customerDto1?.name}</p>
          <p className="font-bold">{record.customerDto1?.phone}</p>
        </div>
      ),
    },
    {
      title: "Store",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="font-bold">
          {record.mealSessionDto1.mealDto1?.kitchenDto1?.name}
        </p>
      ),
    },
    {
      title: "Product",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="font-bold">{record.mealSessionDto1?.mealDto1?.name}</p>
      ),
    },
    {
      title: "Create At",
      dataIndex: "time",
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
      sorter: (a, b) => a.price - b.price,
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },
    {
      title: selectedRowIsActive ? (
        <Select
          className="min-w-[100px]"
          options={[
            {
              value: "COMPLETED",
              label: "Complete",
            },
            {
              value: "CANCELLED",
              label: "Cancel",
            },
          ]}
        ></Select>
      ) : (
        "Status"
      ),
      dataIndex: "status",
      render: (text, record, index) => {
        const finalText = text.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="font-bold">{finalText}</p>
          </Tag>
        );
      },
      filters: [
        {
          text: "Complete",
          value: "COMPLETED",
        },
        {
          text: "Cancel",
          value: "CANCELLED",
        },
        {
          text: "Paid",
          value: "PAID",
        },
        {
          text: "Accept",
          value: "ACCEPTED",
        },
        {
          text: "Ready",
          value: "READY",
        },
      ],
      onFilter: (value, record) => record.status.toUpperCase().includes(value),
    },
  ];
  useEffect(() => {
    setLoading(true);
    getAllOrder()
      .then((res) => {
        setData(res.slice().reverse());
        setNewData(res.slice().reverse());
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
    setAreaIdValue(null);
    setSessionIdValue(null);
    setChefIdValue(null);
    fetchAllSession();
    getAllOrder()
      .then((res) => {
        setNewData(res.slice().reverse());
      })
      .catch((error) => console.log(error));
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
      setSelectedRowIsActive(false);
    }
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled:
        record.status === "CANCELLED" ||
        record.status === "COMPLETED" ||
        record.status === "NOTEAT",
    }),
  };
  const content2 = (
    <Form
      className="min-w-[400px] grid gap-5"
      name="filterForm"
      // onFinish={onFinish}
    >
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Session</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={session.map((item) => ({
                value: item.sessionId,
                label: item.sessionName,
              }))}
              value={sessionIdValue}
              onChange={setSessionIdValue}
            ></Select>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Area</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={area.map((item) => ({
                value: item.areaId,
                label: item.areaName,
              }))}
              value={areaIdValue}
              onChange={(value) => setAreaIdValue(value)}
            ></Select>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Chef</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={chef.map((item) => ({
                value: item.kitchenId,
                label: item.name,
              }))}
              value={chefIdValue}
              onChange={setChefIdValue}
            ></Select>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="w-full flex justify-end gap-2">
          <Button onClick={resetFilter}>Reset</Button>
        </div>
      </Form.Item>
    </Form>
  );
  const fetchAllSession = () => {
    getAllSession().then((res) => {
      setSession(
        res?.filter((item) => {
          return item.endDate === selectedDate;
        })
      );
    });
  };
  const fetchAllArea = () => {
    getAllArea().then((res) => {
      setArea(res);
    });
  };
  const fetchAllChef = () => {
    getAllKitchen().then((res) => {
      setChef(res);
    });
  };
  useEffect(() => {
    let fillteredArray = data;
    if (selectedDate) {
      fillteredArray = fillteredArray.filter((item) => {
        return item.time?.split(" ")[0].includes(selectedDate);
      });
    }
    if (search) {
      fillteredArray = fillteredArray.filter((item) => {
        return item.customerDto1?.phone.includes(search);
      });
    }
    if (sessionIdValue) {
      console.log("SessionIdValue", sessionIdValue);
      fillteredArray = fillteredArray.filter((item) => {
        return item.mealSessionDto1?.sessionDto1?.sessionId === sessionIdValue;
      });
    }
    if (areaIdValue) {
      console.log("areaIdValue", areaIdValue);
      fillteredArray = fillteredArray.filter((item) => {
        console.log(item.mealSessionDto1?.mealDto1?.kitchenDto1?.areaId);
        return (
          item.mealSessionDto1?.mealDto1?.kitchenDto1?.areaId === areaIdValue
        );
      });
    }
    if (chefIdValue) {
      console.log("chefIdvalue", chefIdValue);
      fillteredArray = fillteredArray.filter((item) => {
        return (
          item.mealSessionDto1?.mealDto1?.kitchenDto1?.kitchenId === chefIdValue
        );
      });
    }
    setNewData(fillteredArray);
    fetchAllSession();
  }, [search, selectedDate, sessionIdValue, chefIdValue, areaIdValue]);
  useEffect(() => {
    fetchAllSession();
    fetchAllArea();
    fetchAllChef();
  }, []);
  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
          <h1>Order Management</h1>
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        <div className="account-search flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:gap-3">
          <div className="account-search lg:flex items-center justify-start mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
            <div className="my-2">
              <Input
                placeholder="Enter Phone"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="box__shadow"
                suffix={<TbSearch />}
              />
            </div>
            <div>
              <DatePicker
                className="box__shadow !h-[50px]"
                defaultValue={dayjs()}
                format="DD-MM-YYYY"
                onChange={(date, dateString) => {
                  setSelectedDate(dateString);
                }}
              ></DatePicker>
            </div>
            <div className="my-2">
              <Popover
                className="h-[50px]"
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
              // dataSource={search ? newData : data}
              dataSource={newData}
              columns={columns}
              loading={loading}
              pagination={{ pageSize: 5 }}
              rowKey={(order) => order.orderId}
              rowSelection={rowSelection}
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
