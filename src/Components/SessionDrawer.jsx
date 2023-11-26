import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
const { TextArea } = Input;
import { hideDrawer } from "../redux/ToggleDrawerSessionSlice";
const SessionDrawer = ({ session }) => {
  const dispatch = useDispatch();
  //   const { title } = session;
  const [value, setValue] = useState(1);

  const visible = useSelector((state) => state.sessionDrawer.visible);
  console.log("visible session drawer", visible);
  const [sessionValue, setSessionValue] = useState({
    userId: localStorage.getItem("userId"),
    sessionType: "",
  });
  const addNewSession = () => {
    createNewSession(sessionValue, toast);
    dispatch(hideDrawer());
  };
  const onClose = () => {
    dispatch(hideDrawer());
  };
  return (
    <div>
      <Drawer
        title="Create New Session"
        placement="right"
        size="large"
        onClose={onClose}
        open={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={addNewSession}>
              Add
            </Button>
          </Space>
        }
      >
        <form action="" className="p-5 grid gap-5">
          <div className="form-item">
            <label htmlFor="">Title</label>
            {/* <Input className="my-2 box__shadow h-[40px]" value={title} /> */}
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
      </Drawer>
    </div>
  );
};

export default SessionDrawer;
