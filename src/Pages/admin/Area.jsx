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
} from "../../API/Admin";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const Area = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [areaId, setAreaId] = useState();
  const [district, setDistrict] = useState([]);
  const [defaultItem, setDefaultItem] = useState({});
  const [areaDefault, setAreaDefault] = useState();
  const [areaValue, setAreaValue] = useState();
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
    console.log("vào đc đây");
    updateArea(updateItem).then((res) => {
      fetchAllArea();
      toast.success("Update completed.");
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
  const onAddNewArea = (values) => {
    console.log("values là", values);
    createNewArea(values, toast)
      .then((res) => {
        fetchAllArea();
        form.resetFields();
      })
      .catch((res) => console.log(res));
    setShowAddForm(false);
  };
  const onDeleteArea = () => {
    deleteArea(areaId)
      .then((res) => {
        fetchAllArea();
        handleClose(true);
        toast.success("Delete successfully.");
      })
      .catch((error) => toast.error("Something wrong ! Try again."));
  };
  useEffect(() => {
    fetchAllArea();
    fetchAllDistrict();
    // fetchData();
  }, []);
  const handleShow = (id) => {
    setAreaId(id);
    setShow(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "areaId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Area Name",
      dataIndex: "areaName",
      render: (text) => {
        return <div className="font-bold py-2 px-6">{text}</div>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text) => {
        return <div className="font-bold py-2 px-6">{text}</div>;
      },
    },
    {
      title: "District",
      dataIndex: "district",
      render: (_, record) => (
        <div className="min-w-[80px] font-bold">
          {record?.districtDtoAreaResponseModel?.districtName}
        </div>
      ),
      filters: district.map((item) => ({
        text: item.districtName,
        value: item.districtId,
      })),
      onFilter: (value, record) =>
        record?.districtDtoAreaResponseModel?.districtId == value,
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
                handleShow(record.areaId);
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
  const newData = area.filter((area) => {
    const searchNormalize = normalizeString(search);
    const areaNormalize = normalizeString(area.areaName);
    return areaNormalize.includes(searchNormalize);
  });
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer />
      <div className="account-search flex items-center justify-end ">
        <div className="w-full h-[40%] add-btn flex justify-between items-center mb-3">
          <h1>Area Management</h1>
          <Link to="">
            <button
              className="btn rounded-xl py-3 bg-bgBtnColor"
              onClick={() => setShowAddForm(true)}
            >
              Add Area
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search lg:flex items-center justify-between mb-5 lg:w-[100%] md:w-full md:grid md:grid-cols-2 md:gap-3">
          <div className="my-2">
            <Input
              placeholder="Enter area name want to find..."
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
              dataSource={newData ? newData : area}
              onRow={(record) => {
                return {
                  onClick: () => {
                    console.log("record ne", record);
                    setAvailableDistrict(
                      record.districtDtoAreaResponseModel?.districtId
                    );
                    setUpdateItem({
                      ...record,
                      districtId:
                        record.districtDtoAreaResponseModel.districtId,
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
        title="Add New Area"
        open={showAddForm}
        onOk={() => form.submit()}
        onCancel={handleCloseAddAreaForm}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} onFinish={(values) => onAddNewArea(values)}>
          <Row className="flex justify-between">
            <Col span={11}>
              <Form.Item
                name="areaName"
                rules={[{ required: true, message: "Please enter Area Name!" }]}
              >
                <Input placeholder="Area Name" />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="districtId"
                rules={[{ required: true, message: "Please select District!" }]}
              >
                <Select
                  defaultValue={district[0]?.districtId}
                  options={district.map((item) => ({
                    value: item.districtId,
                    label: item.districtName,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please select Address!" }]}
          >
            <Input.TextArea placeholder="Area's Address" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Area"
        open={showUpdateForm}
        onOk={() => form2.submit()}
        onCancel={handleCloseUpdateForm}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form2}
          onFinish={handleUpdateModal}
          initialValues={updateItem}
        >
          <Form.Item name="areaId">
            <Input value={updateItem?.areaId} disabled />
            <Input value={updateItem?.areaId} hidden />
          </Form.Item>
          <Row className="flex justify-between">
            <Col span={11}>
              <Form.Item
                name="areaName"
                rules={[{ required: true, message: "Please enter Area Name!" }]}
              >
                <Input
                  placeholder="Area Name"
                  value={updateItem.areaName}
                  onChange={(e) =>
                    setUpdateItem({ ...updateItem, areaName: e.target.value })
                  }
                />
                <Input placeholder="Area Name" value={updateItem.name} hidden />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                name="districtDtoAreaResponseModel"
                rules={[{ required: true, message: "Please select District!" }]}
              >
                <Select
                  options={district.map((item) => ({
                    value: item?.districtId,
                    label: item?.districtName,
                  }))}
                  value={updateItem.districtId}
                  onChange={(value) => {
                    setUpdateItem({
                      ...updateItem,
                      districtId: value,
                    });
                  }}
                ></Select>
                <Select
                  hidden
                  defaultValue={updateItem.district}
                  options={district.map((item) => ({
                    value: item.districtName,
                    label: item.districtName,
                  }))}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please select Address!" }]}
          >
            <Input.TextArea
              placeholder="Area's Address"
              value={updateItem.address}
              onChange={(e) =>
                setUpdateItem({ ...updateItem, address: e.target.value })
              }
            />
            <Input.TextArea placeholder="Area's Address" hidden />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Area;
