import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  ConfigProvider,
  Popover,
  Form,
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import { TbSearch } from "react-icons/tb";
import { changeIsActive, getAllUser } from "../../API/Admin";
import { render } from "react-dom";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { direction } from "../../API/Direction";
const { RangePicker } = DatePicker;

const Account = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [genderSelected, setGenderSelected] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [filterValue, setFilterValue] = useState();
  const [data, setData] = useState([]);
  const banAccount = (id) => {
    setLoading(true);
    changeIsActive(id, toast)
      .then((res) => {
        setData(res.slice().reverse());
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const onFinish = (values) => {
    const [startDate, endDate] = selectedDateRange || [];
    let filtered = data;
    if (genderSelected) {
      // Apply filtering based on the selected option
      filtered = data.filter((item) => item.gender === genderSelected); // Replace 'category' with your data field
    }

    if (startDate && endDate) {
      // Apply filtering based on the selected date range
      if (filtered) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.birthDate); // Replace 'date' with your date field name
          return itemDate >= startDate && itemDate <= endDate;
        });
      } else {
        filtered = data.filter((item) => {
          const itemDate = new Date(item.birthDate); // Replace 'date' with your date field name
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }
    if (search) {
      filtered = filtered?.filter((item) => {
        return item.username?.toLowerCase().includes(search.toLowerCase());
      });
    }
    setFilteredData(filtered);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    onFinish();
  }, [search, data]);
  const resetFilter = () => {
    setFilteredData();
    setGenderSelected();
    setSelectedDateRange();
  };
  const navigateToUserDetail = (id, roleId) => {
    if (roleId == 2) {
      navigate(`/${direction.dashboard}/${direction.user}/${id}`);
    } else {
      navigate(`/${direction.dashboard}/${direction.kitchen}/${id}`);
    }
  };
  const content2 = (
    <Form
      className="min-w-[300px] grid gap-5"
      name="filterForm"
      onFinish={onFinish}
    >
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Active</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={[
                { value: "1", label: "Yes" },
                { value: "2", label: "No" },
              ]}
            ></Select>
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="flex w-full justify-between items-center">
          <div className="w-[20%]">
            <h2>Role</h2>
          </div>
          <div className="w-[70%]">
            <Select
              className="w-full"
              options={[
                { value: "1", label: "Admin" },
                { value: "2", label: "Customer" },
                { value: "3", label: "Chef" },
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

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      render: (text) => (
        <div className="rounded-full overflow-hidden min-w-[120px] flex justify-start items-center font-bold">
          {text}
        </div>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      render: (text) => (
        <div className="rounded-full overflow-hidden min-w-[120px] flex justify-start items-center font-bold">
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "username",
      render: (text) => <div className="font-bold">{text}</div>,
    },

    {
      title: "Is Active",
      dataIndex: "status",
      render: (_, record, index) => {
        const color = record.status ? "gray" : "green";
        const valid = record.status === true ? "Inactive" : "Active";
        return (
          <Tag
            color={color}
            className="box__shadow min-w-[60px] text-center p-1 hover:opacity-50 active:shadow-inner"
            onClick={() => banAccount(record.userId)}
          >
            {valid}
          </Tag>
        );
      },
      filters: [
        { text: "Yes", value: true },
        { text: "No", value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Role",
      dataIndex: "roleId",
      render: (text) => {
        const roleName = text == 1 ? "Admin" : text == 2 ? "Customer" : "Chef";
        const roleColor = text == 1 ? "gray" : text == 2 ? "blue" : "green";
        return (
          <div className="min-w-[70px] p-1 font-bold" color={roleColor}>
            {roleName}
          </div>
        );
      },
      filters: [
        { text: "Chef", value: 3 },
        { text: "Customer", value: 2 },
      ],
      onFilter: (value, record) => record.roleId === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
          onClick={() => navigateToUserDetail(record.userId, record.roleId)}
        >
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
        </Space>
      ),
    },
  ];
  const newData = data.filter((item) => {
    return item.phone.includes(search);
  });
  useEffect(() => {
    setLoading(true);
    getAllUser(toast, navigate)
      .then((res) => {
        setData(res.slice().reverse());
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>User Management</h1>
          {/* <Link to="accountCreating"> */}
          <Link to={`${direction.accountCreating}`}>
            <button className="btn rounded-xl py-3 bg-bgBtnColor">
              Add New User
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <div className="account-search lg:flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
          <div className="my-2">
            <Input
              placeholder="Enter number phone want to find..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="box__shadow"
              suffix={<TbSearch />}
            />
          </div>
          {/* <div className="my-2">
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
          </div> */}
        </div>
        <div className="overflow-auto w-full md:overflow-auto">
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
              dataSource={newData ? newData : data}
              columns={columns}
              loading={loading}
              pagination={{ pageSize: 5 }}
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

export default Account;
