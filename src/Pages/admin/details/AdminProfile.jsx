import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Input } from "antd";
import { Row, Col } from "antd";
const AdminProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setImage(data.image);
        setDescription(data.description);
        console.log(data);
      });
  }, [id]);
  const { username, gender, phone } = data;
  const { address } = data.address || {};

  return (
    <div className="w-full h-full p-4 rounded-lg">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Admin's Account</h1>
          <div>
            <Link to="/dashboard">
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
        <div className="w-[25%] border-r-2 flex flex-col justify-center items-center">
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden border shadow">
            <img src={image}></img>
          </div>
          <div className="userName">
            <label htmlFor="">Name</label>
            <Input value={username}></Input>
          </div>
        </div>
        <div className="w-[70%]">
          <Row className="flex justify-between">
            <Col span={11}>
              <label htmlFor="">Email</label>
              <Input className="box__shadow"></Input>
            </Col>
            <Col span={11}>
              <label htmlFor="">Phone</label>
              <Input className="box__shadow"></Input>
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
    </div>
  );
};

export default AdminProfile;
