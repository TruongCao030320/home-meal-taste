import React, { useState } from "react";
import {
  Drawer,
  Space,
  Button,
  Input,
  Radio,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Select,
  Tag,
  Divider,
  ConfigProvider,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import alternateImage from "../assets/images/buncha.png";
import { formatMoney } from "../API/Money.js";
import { useEffect } from "react";
import { hideDrawer, refresh } from "../redux/ToggleDrawerMealSlice.js";
import { toast } from "react-toastify";
import {
  cancelOrder,
  getAllOrderByMealSessionId,
  getDishByMealId,
  getSingleMealSessionById,
  updateStatusMealSession,
  updateStatusMultiMealSession,
} from "../API/Admin.js";
import { MdFeaturedPlayList } from "react-icons/md";
import { getSingleProduct } from "../API/newApi.js";
const { TextArea } = Input;
const CustomDrawer = () => {
  const dispatch = useDispatch();
  const [meal1, setMeal1] = useState({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [firstValueObject, setFirstValueObject] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);
  const {
    title,
    id,
    thumbnail,
    description,
    category,
    price,
    rating,
    discountPercentage,
    stock,
    brand,
  } = meal1 || {};
  const { areaName } = meal1?.areaDtoForMealSessions || {};

  const mealsessionIDGetFromRedux = useSelector(
    (state) => state.mealDrawer.mealId
  );
  const visible = useSelector((state) => state.mealDrawer.visible);
  const [dishes, setDishes] = useState([]);
  const refresh2 = useSelector((state) => state.mealDrawer.refresh);
  const onClose = () => {
    dispatch(hideDrawer());
  };
  const fetchSingleMeal = () => {
    getSingleProduct(mealsessionIDGetFromRedux).then((res) => {
      console.log(res);
      setMeal1(res);
    });
  };
  const fetchAllOrderByMealSesionId = () => {
    getAllOrderByMealSessionId(mealsessionIDGetFromRedux).then((res) => {
      setOrder(res);
    });
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
        record.status === "NOTEAT" ||
        record.status === "CANCELLEDBYCUSTOMER",
    }),
  };
  const onHandleCancelOrder = () => {
    setLoading(true);
    cancelOrder(selectedRowKeys)
      .then((res) => {
        toast.success("Cancel Order Completed.");
        fetchSingleMeal();
        fetchAllOrderByMealSesionId();
        dispatch(refresh());
      })
      .catch(() => {
        toast.warning("Can Not Cancel Order");
      })
      .finally(() => {
        setSelectedRows([]);
        setSelectedRowKeys([]);
        setFirstValueObject({});
        setLoading(false);
        setSelectedRowIsActive(false);
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "orderId",
      render: (text) => (
        <div className="">
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "User",
      dataIndex: "customer",
      // render: (name) => `${name.first} ${name.last}`
      render: (_, record) => (
        <div className="flex flex-col">
          <p>{record.cutomerDtoGetAllOrderByMealSessionId?.name}</p>
          <p>{record.cutomerDtoGetAllOrderByMealSessionId?.phone}</p>
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
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Price/VND",
      dataIndex: "totalPrice",
      render: (text) => <p>{formatMoney(text)}</p>,
    },
    {
      title: selectedRowIsActive ? (
        <Select
          className="min-w-[100px]"
          defaultValue="Status"
          options={[
            // {
            //   value: "COMPLETED",
            //   label: "Complete",
            // },
            {
              value: "CANCELLED",
              label: "Cancel",
            },
          ]}
          onChange={() => onHandleCancelOrder()}
        ></Select>
      ) : (
        "Status"
      ),
      dataIndex: "status",
      render: (text, record, index) => {
        const finalText = text.toUpperCase();
        return (
          // <Select
          //   className="min-w-[100px]"
          //   options={[
          //     {
          //       value: "CANCEL",
          //       label: "Cancel",
          //     },
          //     {
          //       value: "APPROVED",
          //       label: "Approve",
          //     },
          //     {
          //       value: "COMPLETE",
          //       label: "Complete",
          //     },
          //   ]}
          //   value={finalText}
          //   onChange={onHandleSelectStatusToChange}
          // ></Select>
          <Tag className="px-5 py-1">{finalText}</Tag>
        );
      },
    },
  ];
  useEffect(() => {
    // getDishByMealId(mealId).then((res) => {
    //   setDishes(res?.dishDto);
    // });
    if (mealsessionIDGetFromRedux) {
      fetchSingleMeal();
      fetchAllOrderByMealSesionId();
    }
  }, [mealsessionIDGetFromRedux, refresh2]);
  const confirmMealSession = (status) => {
    updateStatusMultiMealSession([mealsessionIDGetFromRedux], status)
      .then((res) => {
        dispatch(refresh());
        toast.success("Update status successfully.");
      })
      .catch((error) => toast.error("Can Not Update Status Of This Meal!"));
  };
  useEffect(() => {}, []);
  return (
    <div>
      {" "}
      <Drawer
        title={`${title} #${id}`}
        placement="right"
        size="large"
        onClose={onClose}
        open={visible}
        extra={
          <Space>
            <Tag color="cyan-inverse" className="p-1 ">
              {brand}
            </Tag>
          </Space>
        }
      >
        <form action="" className="p-5 grid gap-5">
          <div className="form-item w-[100%] flex justify-center">
            <img
              src={thumbnail ? thumbnail : alternateImage}
              alt=""
              className="rounded-lg shadow-md mb-3 w-[450px] h-[300px]"
            />
          </div>
          <div className="form-item flex flex-row justify-between">
            <div className="w-[45%]">
              <label htmlFor="">Title</label>
              <Input className="my-2 box__shadow h-[40px]" value={title} />
            </div>
            <div className="w-[45%]">
              <label htmlFor="">Category</label>
              <Input className="my-2 box__shadow h-[40px]" value={category} />
            </div>
          </div>

          {/* <div className="form-item">
            <label htmlFor="">Meal include:</label>
            <div className=" grid grid-cols-2 gap-2 p-4 bg-colorBg rounded-lg w-full">
              {dishesDtoMealSession?.map((item) => (
                <div className="flex items-center gap-2 bg-white border w-[100%] p-2 rounded-lg shadow-inner">
                  <img
                    src={item.image}
                    className="w-[100px] h-[100px] rounded-full box__shadow border"
                  ></img>
                  <div>
                    <div className="py-1 px-1">
                      <span className="font-bold">Food's Name:</span>{" "}
                      {item.name}
                    </div>
                    <div className="py-1 px-1">
                      <span className="font-bold">Food's Type:</span>{" "}
                      <Tag>{item.dishTypeDtoMealSession?.name}</Tag>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="form-item">
            {}
            <Row className="w-full flex justify-between">
              <Col span={24}>
                <label htmlFor="">Price ($)</label>
                <Input
                  className="my-2 box__shadow h-[40px]"
                  value={formatMoney(price)}
                />
              </Col>
            </Row>
          </div>
          <div className="form-item">
            <Row className="w-full flex justify-between">
              <Col span={11}>
                <label htmlFor="">Remain In Stock</label>
                <Input
                  className="my-2 box__shadow h-[40px]"
                  type="number"
                  min={1}
                  max={8}
                  defaultValue={1}
                  value={stock}
                />
              </Col>
              <Col span={11}>
                <label htmlFor="">Discount percent (%)</label>
                <Input
                  className="my-2 box__shadow h-[40px]"
                  value={discountPercentage}
                />
              </Col>
            </Row>
          </div>
          {/* <div className="form-item">
            <Row className="flex flex-row justify-between">
              <Col span={11}>
                <label htmlFor="">Kitchen</label>
                <Input
                  className="my-2 box__shadow h-[40px]"
                  value={meal1?.kitchenDtoForMealSessions?.name}
                />
              </Col>
              <Col span={11}>
                <label htmlFor="">Area</label>
                <Input className="my-2 box__shadow h-[40px]" value={areaName} />
              </Col>
            </Row>
          </div> */}
          <div className="form-item">
            <label htmlFor="">Description</label>
            <TextArea className="box__shadow h-[40px]" value={description} />
          </div>
        </form>

        <h1 className="my-2">Orders</h1>
        <Divider></Divider>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#F7F5FF",
                headerBorderRadius: 8,
                headerSplitColor: "none",
                fontSize: 15,
                // fontWeightStrong: 700,
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
            rowSelection={rowSelection}
            rowKey={(item) => item.orderId}
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
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
