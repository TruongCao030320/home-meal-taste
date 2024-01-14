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
  Row,
  Col,
  Divider,
} from "antd";
import moment from "moment";
import { toast } from "react-toastify";

import { TbSearch } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FilterFilled } from "@ant-design/icons";
// import { getAllOrder } from "../../API/Admin";
import { direction } from "../../../API/Direction";
import { formatMoney } from "../../../API/Money";
import {
  getAllOrderByMealSessionId,
  getSingleMealSessionById,
  updateStatusMultiMealSession,
} from "../../../API/Admin";
import { Label } from "recharts";
import TextArea from "antd/es/input/TextArea";

const MealSessionDetail = () => {
  const navigate = useNavigate();
  const { mealSessionId } = useParams();
  console.log("mealsessionid là", mealSessionId);
  const { RangePicker } = DatePicker;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [meal, setMeal] = useState({});
  const { dishesDtoMealSession } = meal?.mealDtoForMealSessions || {};
  const [genderSelected, setGenderSelected] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [order, setOrder] = useState([]);
  const [data, setData] = useState([]);
  const fetchSingleMealSession = () => {
    setLoading(true);
    getSingleMealSessionById(mealSessionId)
      .then((res) => {
        console.log(res);
        setMeal(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const fetchAllOrderByMealSesionId = () => {
    getAllOrderByMealSessionId(mealSessionId).then((res) => {
      setOrder(res);
    });
  };
  const confirmMealSession = (status) => {
    updateStatusMultiMealSession(status, mealSessionId)
      .then((res) => {
        toast.success("Update status successfully.");
      })
      .catch((error) =>
        toast.error("Can Not Update Status Because This Meal Is Already Over!")
      );
  };
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
          <p className="font-bold">
            {record.cutomerDtoGetAllOrderByMealSessionId?.name}
          </p>
          <p className="font-bold">
            {record.cutomerDtoGetAllOrderByMealSessionId?.phone}
          </p>
        </div>
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
      dataIndex: "totalPrice",
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        const finalText = text.toUpperCase();
        return (
          <Select
            className="min-w-[100px]"
            options={[
              {
                value: "CANCEL",
                label: "Cancel",
              },
              {
                value: "COMPLETE",
                label: "Complete",
              },
            ]}
            value={finalText}
          ></Select>
        );
      },
    },
  ];
  useEffect(() => {
    setLoading(true);
    // getAllOrder()
    //   .then((res) => {
    //     setData(res.slice().reverse());
    //     setLoading(false);
    //   })
    //   .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    console.log(typeof search);
  }, [search]);
  const navigatePage = (id) => {
    navigate(`/${direction.dashboard}/${direction.order}/${id}`);
  };
  useEffect(() => {
    fetchSingleMealSession();
    fetchAllOrderByMealSesionId();
  }, [mealSessionId]);
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
  const onHandleBack = () => {
    navigate(-1);
  };
  const newData = data?.filter((item) => {
    if (search) {
      // Check if the phone number exists and includes the search string
      return item.customerDto1?.phone.includes(search);
    }
  });
  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full py-3 ">
          <h1>
            {meal?.mealDtoForMealSessions?.name} #{meal?.mealSessionId}
          </h1>
          <Button onClick={onHandleBack}>Leave</Button>
          {/* <Space className="w-full flex flex-row">
            <Tag color="cyan-inverse" className="p-1 ">
              {meal?.status}
            </Tag>
            <Button
              className="bg-red-600"
              onClickCapture={() => confirmMealSession("CANCELLED")}
              disabled={meal?.status?.includes("CANCELLED")}
            >
              <span className="text-white">CANCEL</span>
            </Button>
            <Button
              className="bg-green-700 "
              onClickCapture={() => confirmMealSession("Approved")}
              disabled={meal?.status?.includes("APPROVED")}
            >
              <span className="text-white">APPROVE</span>
            </Button>

          </Space> */}
          {/* <Tag className="p-1">{meal?.status}</Tag> */}
        </div>
      </div>
      <div className="bg-white  p-4 rounded-lg ">
        <div className="w-full overflow-auto no-scrollbar flex flex-row justify-between ">
          <div className="w-[30%] p-5">
            <div className="w-full border-2 rounded-3xl p-5 box__shadow">
              <h1>Thumbnail</h1>
              <div className="w-full border-dashed  border-2 p-2 rounded-lg my-2">
                <img
                  src={meal?.mealDtoForMealSessions?.image}
                  className="h-full w-[100%] max-h-[200px] rounded-lg"
                ></img>
              </div>
            </div>
            <div className="w-full border-2 rounded-3xl p-5 box__shadow my-2">
              <div className="w-full flex flex-row justify-between items-center">
                <h1>Status</h1>
                <div
                  style={{
                    fontWeight: 500,
                    color: meal?.status?.includes("APPROVED")
                      ? "green"
                      : "yellow",
                  }}
                >
                  {meal?.status}
                </div>
              </div>
              <Divider></Divider>
              <Select
                className="w-full"
                options={[
                  {
                    value: "APPROVED",
                    label: "APPROVE",
                  },
                  {
                    value: "CANCELLED",
                    label: "CANCEL",
                  },
                ]}
              ></Select>
            </div>
          </div>
          <div className="w-[70%] h-full min-h-[200px]  p-5  flex flex-col justify-around ">
            <div className="w-full h-full min-h-[200px]  rounded-3xl p-5 border-2 flex flex-col justify-around box__shadow">
              <h1>General</h1>
              <Divider className="w-full" orientationMargin={50}></Divider>
              <div className="w-full my-2">
                <Row className="flex flex-row justify-between w-full">
                  <Col span={11}>
                    <label>Kitchen</label>
                    <Input
                      value={meal?.kitchenDtoForMealSessions?.name}
                      className="box__shadow"
                    />
                  </Col>
                  <Col span={11}>
                    <label>Price</label>
                    <Input
                      value={formatMoney(meal?.price) + "  " + "VND"}
                      className="box__shadow"
                    />
                  </Col>
                </Row>
                <Row className="flex flex-row justify-between w-full my-5">
                  <Col span={24}>
                    <label>Description</label>
                    <TextArea
                      className="box__shadow"
                      value={meal?.mealDtoForMealSessions?.description}
                    ></TextArea>
                  </Col>
                </Row>
                <Row className="flex flex-row justify-between w-full my-5">
                  <Col span={11}>
                    <label>Session</label>
                    <Input
                      value={meal?.sessionDtoForMealSessions?.sessionName}
                      className="box__shadow"
                    />
                  </Col>
                  <Col span={11}>
                    <label>Area</label>
                    <Input
                      value={meal?.areaDtoForMealSessions?.areaName}
                      className="box__shadow"
                    />
                  </Col>
                </Row>
                <Row className="flex flex-row justify-between w-full my-5">
                  <Col span={11}>
                    <label>Quantity (Slot)</label>
                    <Input value={meal?.quantity} className="box__shadow" />
                  </Col>
                  <Col span={11}>
                    <label>Remain Quantity (Slot)</label>
                    <Input
                      value={meal?.remainQuantity}
                      className="box__shadow"
                    />
                  </Col>
                </Row>
                <Row>
                  <h1>Dishes In Meal</h1>
                  <Divider className="w-full" orientationMargin={50}></Divider>
                  <div className=" grid grid-cols-2 gap-2 p-4 bg-colorBg rounded-lg w-full">
                    {dishesDtoMealSession?.map((item) => (
                      <div className="flex items-center gap-2 bg-white border w-[100%] p-2 rounded-lg shadow-inner">
                        <img
                          src={item.image}
                          className="w-[50px] h-[50px] rounded-full box__shadow border"
                        ></img>
                        <div>
                          <div className="py-1 px-1">
                            <span className="font-bold">Dish's Name:</span>{" "}
                            {item.name}
                          </div>
                          <div className="py-1 px-1">
                            <span className="font-bold">Dish's Type:</span>{" "}
                            <Tag>{item.dishTypeDtoMealSession?.name}</Tag>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Row>
              </div>
            </div>
            <div className="w-full h-full min-h-[200px]  rounded-3xl p-5 border-2 flex flex-col justify-around box__shadow my-5">
              <h1 className="my-2">Orders</h1>
              <Divider></Divider>
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
                  dataSource={order}
                  columns={columns}
                  loading={loading}
                  pagination={{ pageSize: 5 }}
                  rowClassName={(record, index) =>
                    `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
                  }
                  // onRow={(record, index) => {
                  //   return {
                  //     onClick: (event) => {
                  //       navigatePage(record.orderId);
                  //     },
                  //   };
                  // }}
                ></Table>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSessionDetail;
