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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import alternateImage from "../assets/images/buncha.png";
import { formatMoney } from "../API/Money.js";
import { useEffect } from "react";
import { hideDrawer, refresh } from "../redux/ToggleDrawerMealSlice.js";
import { toast } from "react-toastify";
import {
  getDishByMealId,
  getSingleMealSessionById,
  updateStatusMealSession,
  updateStatusMultiMealSession,
} from "../API/Admin.js";
import { MdFeaturedPlayList } from "react-icons/md";
const { TextArea } = Input;
const CustomDrawer = () => {
  const dispatch = useDispatch();
  const [meal1, setMeal1] = useState({});
  const { price, remainQuantity, quantity, status, createDate } = meal1 || {};
  const { name, image, description, mealId, dishesDtoMealSession } =
    meal1?.mealDtoForMealSessions || {};
  const { areaName } =
    meal1?.sessionDtoForMealSessions?.areaDtoForMealSessions || {};

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
    getSingleMealSessionById(mealsessionIDGetFromRedux).then((res) => {
      console.log(res);
      setMeal1(res);
    });
  };
  useEffect(() => {
    // getDishByMealId(mealId).then((res) => {
    //   setDishes(res?.dishDto);
    // });
    if (mealsessionIDGetFromRedux) {
      fetchSingleMeal();
    }
  }, [mealsessionIDGetFromRedux, refresh2]);
  const confirmMealSession = (status) => {
    updateStatusMultiMealSession(status, [mealsessionIDGetFromRedux])
      .then((res) => {
        dispatch(refresh());
        toast.success("Update status successfully.");
      })
      .catch((error) =>
        toast.error("Can Not Update Status Because This Meal Is Already Over!")
      );
  };

  return (
    <div>
      {" "}
      <Drawer
        title={name}
        placement="right"
        size="large"
        onClose={onClose}
        open={visible}
        extra={
          <Space>
            <Tag color="cyan-inverse" className="p-1 ">
              {status}
            </Tag>

            <Button
              onClick={onClose}
              className="bg-red-600"
              onClickCapture={() => confirmMealSession("Rejected")}
              disabled={status?.includes("REJECTED")}
            >
              <span className="text-white">Reject</span>
            </Button>
            <Button
              onClick={onClose}
              className="bg-green-700 "
              onClickCapture={() => confirmMealSession("Approved")}
              disabled={status?.includes("APPROVED")}
            >
              <span className="text-white">Approve</span>
            </Button>
          </Space>
        }
      >
        <form action="" className="p-5 grid gap-5">
          <div className="form-item w-[100%] flex justify-center">
            <img
              src={image ? image : alternateImage}
              alt=""
              className="rounded-lg shadow-md mb-3 w-[450px] h-[300px]"
            />
          </div>
          <div className="form-item flex flex-row justify-between">
            <div className="w-[45%]">
              <label htmlFor="">Title</label>
              <Input className="my-2 box__shadow h-[40px]" value={name} />
            </div>
            <div className="w-[45%]">
              <label htmlFor="">Create Date</label>
              <Input className="my-2 box__shadow h-[40px]" value={createDate} />
            </div>
          </div>

          <div className="form-item">
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
          </div>
          <div className="form-item">
            {}
            <Row className="w-full flex justify-between">
              <Col span={24}>
                <label htmlFor="">Price (VND)</label>
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
                <label htmlFor="">Selling Slot</label>
                <Input
                  className="my-2 box__shadow h-[40px]"
                  type="number"
                  min={1}
                  max={8}
                  defaultValue={1}
                  value={quantity}
                />
              </Col>
              <Col span={11}>
                <label htmlFor="">Remain Slot</label>
                <Input
                  className="my-2 box__shadow h-[40px]"
                  value={remainQuantity}
                />
              </Col>
            </Row>
          </div>
          <div className="form-item">
            <label htmlFor="">Kitchen</label>
            <Input
              className="my-2 box__shadow h-[40px]"
              value={meal1?.kitchenDtoForMealSessions?.name}
            />
          </div>
          <div className="form-item">
            <label htmlFor="">Area</label>
            <Input className="my-2 box__shadow h-[40px]" value={areaName} />
          </div>
          <div className="form-item">
            <label htmlFor="">Description</label>
            <TextArea className="box__shadow h-[40px]" value={description} />
          </div>
        </form>
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
