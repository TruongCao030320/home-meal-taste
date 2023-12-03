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
  Form,
  Row,
  Col,
} from "antd";
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import CustomDrawer from "../../Components/MealDrawer";
import ModalConfirm from "../../Components/ModalConfirm";
import { TiTick, TiDelete } from "react-icons/ti";
import { TbSearch } from "react-icons/tb";
import {
  getAllArea,
  getAllDistrict,
  getAllDishType,
  createNewArea,
  deleteArea,
  deleteDishType,
  updateArea,
  createNewDishType,
} from "../../API/Admin";

const DishType = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [dishTypeId, setDishTypeId] = useState();
  const [district, setDistrict] = useState([]);
  const [dishType, setDishType] = useState([]);

  const [defaultItem, setDefaultItem] = useState({});
  const showLargeDrawer = (id) => {
    dispatch(showDrawer(id));
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseAddAreaForm = () => {
    console.log("vào đây sao kh reset form");
    setShowAddForm(false);
    form.resetFields();
  };
  const fetchAllDishType = () => {
    setLoading(true);
    getAllDishType()
      .then((res) => {
        setDishType(res);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  const onAddNewDishType = (values) => {
    console.log("values là", values);
    createNewDishType(values, toast)
      .then((res) => {
        fetchAllDishType();
        form.resetFields();
        toast.success("Add new dish type completed.");
      })
      .catch((res) => console.log(res));
    setShowAddForm(false);
  };
  const onDeleteDishType = () => {
    deleteDishType(dishTypeId)
      .then((res) => {
        fetchAllDishType();
        handleClose(true);
        toast.success("Delete successfully.");
      })
      .catch((error) => {
        handleClose(true);
        toast.error("Can not delete dish type.");
      });
  };
  useEffect(() => {
    fetchAllDishType();
    // fetchData();
  }, []);
  const handleShow = (id) => {
    setDishTypeId(id);
    setShow(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "dishTypeId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Type Name",
      dataIndex: "name",
      render: (text) => {
        return <div className="font-bold py-2 px-6">{text}</div>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        return <div className="font-bold py-2 px-6">{text}</div>;
      },
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
              className="w-6 h-6 z-[999999]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("default item", record);
                setDefaultItem(record);
                handleShow(record.dishTypeId);
              }}
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
            options={area?.map((item, index) => ({
              value: index,
              label: item.address,
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
            options={area?.map((item, index) => ({
              value: index,
              label: item.area,
            }))}
          ></Select>
        </div>
      </div>
    </div>
  );
  // useEffect(() => {

  // });

  const { RangePicker } = DatePicker;
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer />
      <div className="account-search flex items-center  justify-end ">
        <div className="w-full h-[40%] add-btn flex justify-between items-center mb-3">
          <h1>Dish Type Management</h1>
          <Link to="">
            <button
              className="btn rounded-xl py-3 bg-bgBtnColor"
              onClick={() => setShowAddForm(true)}
            >
              Add Dish Type
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-end mb-5 w-[100%]  lg:flex md:w-full md:grid md:grid-cols-2 md:gap-3 lg:w-[100%]"></div>
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
              loading={loading}
              dataSource={dishType}
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
        onOk={onDeleteDishType}
        onCancel={handleClose}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>Are you sure to delete this record?</p>
      </Modal>
      <Modal
        title="Add New Dish Type"
        open={showAddForm}
        onOk={() => form.submit()}
        onCancel={handleCloseAddAreaForm}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} onFinish={(values) => onAddNewDishType(values)}>
          <Row className="flex justify-between">
            <Col span={24}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter type name!" }]}
              >
                <Input placeholder="Dish type name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DishType;
