import React, { useEffect, useState, createContext, useRef } from "react";
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
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { showDrawer, hideDrawer } from "../../redux/ToggleDrawerSlice";
import CustomDrawer from "../../Components/Drawer";
import ModalConfirm from "../../Components/ModalConfirm";
import { TiTick, TiDelete } from "react-icons/ti";
import { TbSearch } from "react-icons/tb";
import { getAllDistrict, getAllSession } from "../../API/Admin";
const Session = () => {
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState();
  const [product, setProduct] = useState({});
  const [session, setSession] = useState();
  const toggleRef = useRef();
  const toggleRef2 = useRef();

  const toggle = () => {
    if (toggleRef.current) {
      toggleRef.current.classList.toggle("hidden");
      toggleRef2.current.classList.toggle("hidden");
    }
  };
  const showLargeDrawer = (id) => {
    dispatch(showDrawer(id));
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setShow(false);
    toast.success("Delete successfully.");
  };
  const updateStatus = () => {
    toast.success("Update status successfully.");
    return <ModalConfirm status={true} />;
  };
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const toggleDrawerType1 = () => {
    dispatch({
      type: showDrawer,
      payload: {
        type: 1,
      },
    });
  };
  const [detailData, setDetailData] = useState([]);
  const columns = [
    {
      title: "Title",
      dataIndex: "type",
      key: "title",
      render: (_, record) => <div>{record.session.type}</div>,
    },
    {
      title: "Status",
      key: "price",
      render: (_, record, index) => {
        console.log(record.session.status);
        const status =
          record.session.status === true ? "Pending..." : "Finished";
        const color = record.session.status === true ? "green" : "gray";
        return (
          <Tag color={color} className="shadow-sm py-2 px-6">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Is Active",
      key: "price",
      render: (_, record, index) => {
        console.log(record.session.status);
        const status = record.session.status === true ? "Inactive" : "Active";
        const color = status === "true" ? "green" : "gray";
        return (
          <Tag
            color={color}
            className="shadow-sm hover:cursor-pointer hover:opacity-40 py-2 px-6"
            onClick={() => updateStatus()}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Create At",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px]">{record.session.createdDate}</div>
      ),
    },
    {
      title: "Start time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px]">{record.session.startTime}</div>
      ),
    },
    {
      title: "End time",
      dataIndex: "session",
      key: "birthDate",
      render: (_, record) => (
        <div className="min-w-[80px]">{record.session.endTime}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
        >
          <Link to="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => handleShow()}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </Link>
        </Space>
      ),
    },
  ];
  const detailColumns = [
    {
      title: "Avatar",
      dataIndex: "thumbnail",
      render: (text) => (
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
          <img src={text} className="w-full h-full"></img>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "title",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Status",
      dataIndex: "price",
      key: "price",
      render: (_, record, index) => {
        const even = index % 2 === 0;
        const color = even ? "green" : "red";
        const status = even ? (
          <span className="flex items-center justify-center">
            Approved <TiTick />
          </span>
        ) : (
          <span className="flex items-center justify-center">
            Cancelled <TiDelete />
          </span>
        );
        return (
          <Tag className={`min-w-[90px] text-center p-1`} color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Create At",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (text) => <Tag className="min-w-[80px]">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 cursor-pointer"
            onClick={() => showLargeDrawer(record.id)}
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
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  const content = (
    <div className="w-[300px]">
      <div className="flex w-full justify-between items-center">
        <div className="w-[20%]">
          <h2>District</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            options={district?.map((item, index) => ({
              value: index,
              label: item.districtName,
            }))}
          ></Select>
        </div>
      </div>
    </div>
  );
  const content2 = (
    <div className="min-w-[300px] grid gap-5">
      <div className="flex w-full justify-between items-center gap-5">
        <div className="w-[20%]">
          <h2>District</h2>
        </div>
        <div className="w-[70%]">
          <Select
            className="w-full"
            defaultValue="hehe"
            options={district?.map((item, index) => ({
              value: index,
              label: item.districtName,
            }))}
          ></Select>
        </div>
      </div>
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
            defaultValue="hehe"
            options={district?.map((item, index) => ({
              value: index,
              label: item.districtName,
            }))}
          ></Select>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setData(res.products);
        setLoading(false);
      });
    getAllDistrict().then((res) => {
      setDistrict(res);
    });
    getAllSession().then((res) => {
      console.log(res);
      setSession(res);
    });
  }, []);
  const { RangePicker } = DatePicker;
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer />
      <div className="account-search flex items-center  justify-end ">
        <div className="w-full h-[40%] add-btn flex justify-between items-center mb-3">
          <h1>Session Management</h1>
          <Link to="">
            <button
              className="btn rounded-xl py-3 bg-bgBtnColor"
              onClick={toggleDrawerType1}
            >
              Add Session
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-end mb-5 w-[100%]  lg:flex md:w-full md:grid md:grid-cols-2 md:gap-3 lg:w-[100%]">
          <div>
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
          </div>
        </div>
        <div className="w-full overflow-auto">
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
              columns={columns}
              expandable={{
                expandedRowRender: (record, index) => (
                  <div className="overflow-auto w-full p-2 bg-white rounded-lg">
                    <div className="account-search h-[10%] flex items-center  justify-end mb-3">
                      <div className="h-[40%] add-btn flex justify-between items-center w-full py-3">
                        <h1>Product In Session</h1>
                      </div>
                    </div>
                    <div className="account-search flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:gap-3 ">
                      <div className="">
                        <Input
                          placeholder="Enter data to find...."
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
                    <Table
                      columns={detailColumns}
                      dataSource={search ? newData : data}
                      pagination={{ pageSize: 5 }}
                    ></Table>
                  </div>
                ),
                rowExpandable: (record) => record.expandable !== "title",
              }}
              loading={loading}
              dataSource={session}
              rowKey={(record) => record.id}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
              }
              pagination={{ pageSize: 5 }}
            ></Table>
          </ConfigProvider>
        </div>
      </div>
      <Modal
        title="Confirmation"
        open={show}
        onOk={handleClose}
        onCancel={handleClose}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>Are you sure to delete this record?</p>
      </Modal>
    </div>
  );
};

export default Session;
