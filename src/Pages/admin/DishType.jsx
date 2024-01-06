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
  updateDishType,
} from "../../API/Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const DishType = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateItem, setUpdateItem] = useState({
    dishTypeId: null,
    name: "",
    description: "",
  });
  const [firstValueUpdate, setFirstValueUpdate] = useState({
    dishTypeId: null,
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [dishTypeId, setDishTypeId] = useState();
  const [district, setDistrict] = useState([]);
  const [dishType, setDishType] = useState([]);
  const [disableUpdateSaveButton, setDisableUpdateSaveButton] = useState(true);

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
  const handleCloseUpdateDishTypeForm = () => {
    setShowUpdateForm(false);
  };
  const fetchAllDishType = () => {
    setLoading(true);
    getAllDishType()
      .then((res) => {
        setDishType(res.slice().reverse());
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
  const onHandleShowUpdate = (record) => {
    console.log("update record là", record);
    setShowUpdateForm(true);
    setUpdateItem({
      dishTypeId: record.dishTypeId,
      name: record.name,
      description: record.description,
      dishes: null,
    });
    setFirstValueUpdate({
      dishTypeId: record.dishTypeId,
      name: record.name,
      description: record.description,
    });
    form2.setFieldsValue({
      id: record.dishTypeId,
      name: record.name,
      description: record.description,
    });
  };
  const onHandleUpdateDishType = () => {
    setLoading(true);
    console.log("on handle update dishtype", updateItem);
    updateDishType(updateItem)
      .then((res) => {
        fetchAllDishType();
        toast.success("Update Dish Type Success");
      })
      .finally(() => {
        setShowUpdateForm(false);
        setLoading(false);
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
          <Button onClick={() => onHandleShowUpdate(record)}>
            <FontAwesomeIcon icon={faEdit} fontSize={18} />
          </Button>
          <Button>
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
          </Button>
        </Space>
      ),
    },
  ];

  const onHandleDisableUpdateForm = () => {
    if (
      normalizeString(firstValueUpdate?.name.trim() || "") ===
        normalizeString(updateItem?.name.trim() || "") &&
      normalizeString(firstValueUpdate?.description.trim() || "") ===
        normalizeString(updateItem?.description.trim() || "")
    ) {
      console.log("Strings are equal name");
      setDisableUpdateSaveButton(true);
    } else {
      console.log("Strings are not equal name");
      setDisableUpdateSaveButton(false);
    }
  };
  useEffect(() => {
    onHandleDisableUpdateForm();
  }, [updateItem?.name, updateItem?.description]);

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
      <Modal
        title="Update Dish Type"
        open={showUpdateForm}
        onOk={() => form2.submit()}
        onCancel={handleCloseUpdateDishTypeForm}
        okText="Save"
        okButtonProps={{
          disabled: disableUpdateSaveButton,
        }}
        cancelText="Cancel"
      >
        <Form form={form2} onFinish={(values) => onHandleUpdateDishType()}>
          <Row className="flex justify-between">
            <Col xs={24} md={11} lg={11}>
              <Form.Item
                name="id"
                // rules={[{ required: true, message: "Please enter type name!" }]}
              >
                <Input disabled={true} value={updateItem?.dishTypeId} />
                {/* 
                <Input
                  disabled={true}
                  value={updateItem?.dishTypeId}
                  className="hidden"
                /> */}
              </Form.Item>
            </Col>
            <Col xs={24} md={11} lg={11}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter name!",
                  },
                  {
                    pattern: /^[\p{L}\s]+$/u,
                    message: "Only letters are allowed in the address field",
                  },
                ]}
              >
                <Input
                  placeholder="Dish type name"
                  value={updateItem.name}
                  onChange={(text) =>
                    setUpdateItem({
                      ...updateItem,
                      name: text.target.value,
                    })
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter name!",
              },
              {
                pattern: /^[\p{L}\s]+$/u,
                message: "Only letters are allowed in the address field",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Description"
              value={updateItem?.description}
              onChange={(text) =>
                setUpdateItem({ ...updateItem, description: text.target.value })
              }
            />
            {/* <Input.TextArea
              className="hidden"
              placeholder="Description"
              value={updateItem.description}
            /> */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DishType;
