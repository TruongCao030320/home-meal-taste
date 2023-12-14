import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Input } from "antd";
import { FaRegUserCircle } from "react-icons/fa";
import { Row, Col, ConfigProvider, Tag } from "antd";
import { direction } from "../../../API/Direction";
import { getAllTransactionRecharge, getSingleUser } from "../../../API/Admin";
import { login } from "../../../API/Login";
import { formatMoney } from "../../../API/Money";
const AdminProfile = () => {
  const [data, setData] = useState({});
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [object, setObject] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form data to an API or perform other actions here
    console.log(formData);
  };
  const fetchAccount = () => {
    getSingleUser(id)
      .then((res) => {
        setObject(res);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getSingleUser(id).then((data) => {
      setData(data);
      console.log(data);
    });
    fetchAccount();
  }, []);
  const { username, email, phone } = object;

  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Admin's Account</h1>
          <div>
            <Link to={`/${direction.dashboard}`}>
              <Button className="border-none mr-3">Cancel</Button>
            </Link>
            <Link to="#">
              <button className="btn rounded-xl py-3 bg-bgBtnColor">
                Update
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg flex justify-around">
        <div className="w-[100%]">
          <Row className="flex justify-between my-2">
            <Col span={11}>
              <label htmlFor="">User name</label>
              <Input className="box__shadow" value={username}></Input>
            </Col>
            <Col span={11}>
              <label htmlFor="">Wallet</label>
              <Input
                className="box__shadow"
                value={`${formatMoney(data.walletDto?.balance)} VND`}
              ></Input>
            </Col>
          </Row>
          <Row className="flex justify-between">
            <Col span={11}>
              <label htmlFor="">Email</label>
              <Input className="box__shadow" value={email}></Input>
            </Col>
            <Col span={11}>
              <label htmlFor="">Phone</label>
              <Input className="box__shadow" value={phone}></Input>
            </Col>
          </Row>
        </div>
      </div>
      <div className="w-full h-full bg-white rounded-lg p-4 my-2">
        <h1 className="">Update Password</h1>
        <div className="profileForm h-full">
          <form className="" onSubmit={handleSubmit}>
            <Row className="my-2 gap-2">
              <Col span={11} className="">
                <label className="">Current Password</label>
                <Input.Password
                  className="box__shadow"
                  type="password"
                ></Input.Password>
              </Col>
            </Row>
            <Row className="flex justify-between">
              <Col span={11}>
                <label htmlFor="">New Password</label>
                <Input.Password className="box__shadow"></Input.Password>
              </Col>
              <Col span={11}>
                <label htmlFor="">Confirm New Password</label>
                <Input.Password className="box__shadow"></Input.Password>
              </Col>
            </Row>
          </form>
        </div>
      </div>
      {/* <div className="w-full h-full overflow-auto no-scrollbar">
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
              },
            },
          }}
        >
          <Table
            dataSource={transaction}
            columns={columns}
            loading={loading}
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
      </div> */}
    </div>
  );
};

export default AdminProfile;
