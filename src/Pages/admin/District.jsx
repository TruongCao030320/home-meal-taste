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
  getAllSession,
  getAllSessionByAreaId,
  patchSessionStatus,
  createNewArea,
  deleteArea,
  updateArea,
  updateDistrict,
  addNewDistrict,
  deleteDistrict,
} from "../../API/Admin";
const normalizeString = (str) => {
  const string = str || "";
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const District = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateItem, setUpdateItem] = useState({
    districtId: null,
    districtName: "",
  });
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [district, setDistrict] = useState([]);
  const [defaultItem, setDefaultItem] = useState({});
  const [areaDefault, setAreaDefault] = useState();
  const [areaValue, setAreaValue] = useState();
  const [disableUpdateSaveButton, setDisableUpdateSaveButton] = useState(true);
  const [firstValueUpdate, setFirstValueUpdate] = useState({
    districtId: null,
    districtName: "",
  });
  const [availableDistrict, setAvailableDistrict] = useState();
  const [search, setSearch] = useState("");

  const showLargeDrawer = (id) => {
    dispatch(showDrawer(id));
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };
  const handleCloseAddAreaForm = () => {
    console.log("vào đây sao kh reset form");
    setShowAddForm(false);
    form.resetFields();
  };
  const handleUpdateModal = () => {
    updateDistrict(updateItem).then((res) => {
      fetchAllDistrict();
      toast.success("Update completed.");
      setDisableUpdateSaveButton(true);
    });
    setShowUpdateForm(false);
    form2.resetFields();
  };
  const fetchAllDistrict = () => {
    setLoading(true);
    getAllDistrict()
      .then((res) => {
        setDistrict(res);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  const onClickToOpenUpdateModal = async (record) => {
    console.log("record ne", record);
    setAvailableDistrict(record.districtDtoAreaResponseModel?.districtId);
    setUpdateItem(record);
    setShowUpdateForm(true);
  };
  const fetchAllArea = () => {
    setLoading(true);
    getAllArea()
      .then((res) => {
        setArea(res);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const onAddNewDistrict = (values) => {
    addNewDistrict(values, toast)
      .then((res) => {
        fetchAllDistrict();
        form.resetFields();
      })
      .catch((res) => console.log(res));
    setShowAddForm(false);
  };
  const onDeleteArea = () => {
    deleteDistrict(districtId)
      .then((res) => {
        fetchAllDistrict();
        handleClose(true);
        toast.success("Delete successfully.");
      })
      .catch((error) => {
        toast.error("Can not delete this district !");
        handleClose(true);
      });
  };
  useEffect(() => {
    fetchAllArea();
    fetchAllDistrict();
    // fetchData();
  }, []);
  const handleShow = (id) => {
    setDistrictId(id);
    setShow(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "districtId",
      render: (text) => <div className="font-bold">{text}</div>,
      width: "40%",
    },
    {
      title: "District Name",
      dataIndex: "districtName",
      render: (text) => {
        return <div className="font-bold py-2">{text}</div>;
      },
      width: "50%",
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
                handleShow(record.districtId);
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
  const { RangePicker } = DatePicker;
  const newData = district?.filter((district) => {
    const searchNormalize = normalizeString(search || "");
    const areaNormalize = normalizeString(district?.districtName);
    return areaNormalize.includes(searchNormalize);
  });
  // useEffect(() => {
  //   const handleUpdateDisable = () => {
  //     setDisableUpdateSaveButton(false);
  //   };
  //   handleUpdateDisable();
  //   console.log("Đổi", disableUpdateSaveButton);
  // }, [updateItem.areaName]);
  const onHandleDisableUpdateForm = () => {
    console.log(firstValueUpdate?.districtName, updateItem?.districtName);
    if (
      normalizeString(firstValueUpdate?.districtName?.trim() || "") ===
      normalizeString(updateItem?.districtName?.trim() || "")
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
  }, [updateItem?.districtName]);
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer />
      <div className="account-search flex items-center justify-end ">
        <div className="w-full h-[40%] add-btn flex justify-between items-center mb-3">
          <h1>District Management</h1>
          <Link to="">
            <button
              className="btn rounded-xl py-3 bg-bgBtnColor"
              onClick={() => setShowAddForm(true)}
            >
              Add District
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search lg:flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
          <div className="my-2">
            <Input
              placeholder="Enter district name want to find..."
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
              dataSource={newData ? newData : district}
              onRow={(record) => {
                return {
                  onClick: () => {
                    setFirstValueUpdate(record);
                    setUpdateItem({
                      districtId: record.districtId,
                      districtName: record.districtName,
                    });
                    form2.setFieldsValue({
                      districtId: record.districtId,
                      districtName: record.districtName,
                    });
                    setShowUpdateForm(true);
                  },
                };
              }}
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
        onOk={onDeleteArea}
        onCancel={handleClose}
        okText="Ok"
        cancelText="Cancel"
      >
        <p>Are you sure to delete this record?</p>
      </Modal>
      <Modal
        title="Add New District"
        open={showAddForm}
        onOk={() => form.submit()}
        onCancel={handleCloseAddAreaForm}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} onFinish={(values) => onAddNewDistrict(values)}>
          <Row className="flex justify-between">
            <Col span={24}>
              <Form.Item
                name="districtName"
                rules={[
                  { required: true, message: "Please enter District Name!" },
                ]}
              >
                <Input placeholder="District Name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Update District"
        open={showUpdateForm}
        onOk={() => form2.submit()}
        onCancel={handleCloseUpdateForm}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          disabled: disableUpdateSaveButton,
        }}
      >
        <Form
          form={form2}
          onFinish={handleUpdateModal}
          initialValues={updateItem}
        >
          <Form.Item name="districtId">
            <Input value={updateItem?.districtId} disabled />
          </Form.Item>
          <Row className="flex justify-between">
            <Col span={24}>
              <Form.Item
                name="districtName"
                rules={[
                  { required: true, message: "Please enter District Name!" },
                ]}
              >
                <Input
                  placeholder="District Name"
                  value={updateItem?.districtName}
                  onChange={(e) => {
                    console.log(
                      "doi update item",
                      e.target.value,
                      firstValueUpdate.districtName
                    );
                    setUpdateItem({
                      ...updateItem,
                      districtName: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default District;
