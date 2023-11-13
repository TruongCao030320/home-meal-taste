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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { hideDrawer } from "../redux/ToggleDrawerSlice";
import { toast } from "react-toastify";
import { createNewSession } from "../API/Admin";
const { TextArea } = Input;
const CustomDrawer = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.drawer.visible);
  const id = useSelector((state) => state.drawer.productId);
  const type = useSelector((state) => state.drawer.type);
  console.log("bao nhiu", localStorage.getItem("userId"));
  const [sessionValue, setSessionValue] = useState({
    userId: localStorage.getItem("userId"),
    sessionType: "",
  });
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({});
  const [mainImage, setMainImage] = useState();
  const [value, setValue] = useState(1);
  const { title, description, thumbnail, images, price } = data;
  const onClose = () => {
    dispatch(hideDrawer());
  };
  const addNewSession = () => {
    createNewSession(sessionValue, toast);
    dispatch(hideDrawer());
  };
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, [id]);
  return (
    <div>
      {" "}
      <Drawer
        title={title}
        placement="right"
        size="large"
        onClose={onClose}
        open={visible}
        extra={
          type?.type === 1 ? (
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" onClick={addNewSession}>
                Add
              </Button>
            </Space>
          ) : (
            <Space>
              <Button onClick={onClose} className="bg-red-500 text-white">
                Reject
              </Button>
              <Button type="primary" onClick={onClose} className="bg-green-400">
                <span className="text-white">Approve</span>
              </Button>
            </Space>
          )
        }
      >
        {type?.type === 1 ? (
          <div>
            <h1>Add New Session</h1>
            <form action="" className="p-5 grid gap-5">
              <div className="form-item">
                <label htmlFor="">Title</label>
                <Input className="my-2 box__shadow h-[40px]" value={title} />
              </div>
              <div className="form-item">
                <Row className="w-full flex justify-between">
                  <Col span={11}>
                    <label htmlFor="">Timeline</label>
                    <TimePicker.RangePicker className="my-2" />
                  </Col>
                </Row>
              </div>
              <div className="form-item">
                <label htmlFor="">Chef</label>
                <Input className="my-2 box__shadow h-[40px]" />
              </div>
              <div className="form-item">
                <Row className="w-full flex justify-between items-center">
                  <Col span={11}>
                    <label htmlFor="">Type</label>
                    <Select
                      options={[
                        { value: "Lunch", label: "Lunch" },
                        { value: "Dinner", label: "Dinner" },
                      ]}
                      className="mx-2 min-w-[100px]"
                      onChange={(value) => {
                        setSessionValue({
                          ...sessionValue,
                          sessionType: value,
                        });
                      }}
                    />
                  </Col>
                  <Col span={11}>
                    <Radio.Group
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      <Radio value={1}>Active</Radio>
                      <Radio value={2}>Inactive</Radio>
                    </Radio.Group>
                  </Col>
                </Row>
              </div>
              <div className="form-item"></div>
            </form>
          </div>
        ) : (
          <form action="" className="p-5 grid gap-5">
            <div className="form-item w-[70%]">
              <img
                src={mainImage ? mainImage : thumbnail}
                alt=""
                className="rounded-lg shadow-md mb-3 w-[450px] h-[300px]"
              />
              <div className="flex justify-between">
                {images?.map((item, index) => (
                  <img
                    className="w-[50px] h-[50px] max-h-[50px] rounded-lg hover:cursor-pointer hover:animate-wiggle hover:shadow-md"
                    src={item}
                    key={index}
                    onMouseEnter={() => setMainImage(item)}
                  ></img>
                ))}
              </div>
            </div>
            <div className="form-item">
              <label htmlFor="">Title</label>
              <Input className="my-2 box__shadow h-[40px]" value={title} />
            </div>
            <div className="form-item">
              <Row className="w-full flex justify-between">
                <Col span={11}>
                  <label htmlFor="">Selling quantity</label>
                  <Input
                    className="my-2 box__shadow h-[40px]"
                    type="number"
                    min={1}
                    max={8}
                    defaultValue={1}
                  />
                </Col>
                <Col span={11}>
                  <label htmlFor="">Price</label>
                  <Input className="my-2 box__shadow h-[40px]" value={price} />
                </Col>
              </Row>
            </div>
            <div className="form-item">
              <label htmlFor="">Chef</label>
              <Input className="my-2 box__shadow h-[40px]" />
            </div>
            <div className="form-item">
              <label htmlFor="">Address</label>
              <Input className="my-2 box__shadow h-[40px]" />
            </div>
            <div className="form-item">
              <label htmlFor="">Description</label>
              <TextArea className="box__shadow h-[40px]" value={description} />
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
};

export default CustomDrawer;
