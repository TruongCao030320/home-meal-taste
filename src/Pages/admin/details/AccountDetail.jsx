import { Button, Input, Row, Col, Divider, message, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table } from "antd";
import { toast } from "react-toastify";
import {
  changeIsActive,
  getAllTransactionByUserId,
  getOrderByUserId,
  getSingleUser,
} from "../../../API/Admin";
import { direction } from "../../../API/Direction";
import { formatMoney } from "../../../API/Money";
// import { filter } from "fontawesome";
import { useSelector } from "react-redux";
const AccountDetail = () => {
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userSlice.user);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [countOrder, setCountOrder] = useState();
  const navigate = useNavigate();
  const fetchAllTransaction = () => {
    getAllTransactionByUserId(id).then((res) => {
      setTransaction(res.slice().reverse());
    });
  };
  useEffect(() => {
    const fetch = async () => {
      const user = await getSingleUser(id, navigate);
      if (user) {
        setData(user);
      }
    };
    fetch();
  }, [id]);
  useEffect(() => {
    getOrderByUserId(id)
      .then((res) => {
        setOrder(res.slice().reverse());
        setCountOrder(res.length);
      })
      .catch((error) => console.log(error));
    fetchAllTransaction();
  }, []);
  const { username, email, phone, address, districtId, roleId } = data || {};
  const { districtName } = data?.districtDto || {};
  const { balance } = data?.walletDto || {};
  // const columns = [
  //   {
  //     title: "Order number",
  //     dataIndex: "orderId",
  //     render: (text) => (
  //       <div className="rounded-full  flex justify-center items-center font-bold">
  //         {text}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Products",
  //     dataIndex: "meal",
  //     render: (_, record, index) => (
  //       <div className="w-[300px] h-[100px] flex justify-between items-center">
  //         <img
  //           src={record.mealSessionDto2?.mealDto2?.image}
  //           className="w-[80px] h-[80px] rounded-full border"
  //         ></img>
  //         <p className="font-bold text-xl">
  //           {record.mealSessionDto2?.mealDto2?.name}
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     render: (text) => (
  //       <Tag color="geekblue" className="font-bold">
  //         Paid
  //       </Tag>
  //     ),
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "totalPrice",
  //     render: (text) => <div className="font-bold">{text}</div>,
  //     defaultSortOrder: "descend",
  //     sorter: (a, b) => a.price - b.price,
  //   },
  //   {
  //     title: "Chef",
  //     dataIndex: "meal",
  //     render: (_, record, index) => (
  //       <div className="min-w-[100px] font-bold">
  //         {record.mealSessionDto2?.mealDto2?.kitchenDto2?.name}
  //       </div>
  //     ),
  //   },

  //   {
  //     title: "Create At",
  //     dataIndex: "time",
  //     render: (text) => <div className="min-w-[80px] font-bold">{text}</div>,
  //   },
  // ];
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
          <p className="font-bold">{record.customerDto2?.name}</p>
          <p className="font-bold">{record.customerDto2?.phone}</p>
        </div>
      ),
    },
    {
      title: "Store",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="font-bold">
          {record.mealSessionDto2?.mealDto2?.kitchenDto2?.name}
        </p>
      ),
    },
    {
      title: "Product",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="font-bold">{record.mealSessionDto2?.mealDto2?.name}</p>
      ),
    },
    {
      title: "Create At",
      dataIndex: "time",
      // sorter: (a, b) => {
      //   const dateA = moment(a.time, "DD-MM-YYYY HH:mm");
      //   const dateB = moment(b.time, "DD-MM-YYYY HH:mm");
      //   return dateA - dateB;
      // },
      render: (text) => <p className="font-bold">{text}</p>,
    },

    {
      title: "Price/VND",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },
    {
      title: "Quantity/Slot",
      dataIndex: "quantity",
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record, index) => {
        const finalText = text.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="font-bold">{finalText}</p>
          </Tag>
        );
      },
      filters: [
        {
          text: "DONE",
          value: "DONE",
        },
        {
          text: "CANCELLED",
          value: "CANCELLED",
        },
        {
          text: "PAID",
          value: "PAID",
        },
      ],
      onFilter: (value, record) => record.status.toUpperCase().includes(value),
    },
  ];
  const transactionColumns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      render: (text) => <div className="font-bold">{text}</div>,
    },

    {
      title: "Title",
      dataIndex: "description",
      render: (text) => <div className="min-w-[80px] font-bold">{text}</div>,
    },
    {
      title: "Create At",
      dataIndex: "date",
      render: (text) => <div className="min-w-[100px] font-bold">{text}</div>,
    },
    {
      title: "Amount/VNĐ",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (text) => <p className="font-bold">{formatMoney(text)}</p>,
    },

    {
      title: "Type",
      dataIndex: "transactionType",
      render: (text) => (
        <Tag color="green" className="px-4 py-1">
          <p className="font-bold">{text}</p>
        </Tag>
      ),
      filters: [
        {
          text: "RECHARGE",
          value: "RECHARGE",
        },
        {
          text: "ORDERED",
          value: "ORDERED",
        },
      ],
      onFilter: (value, record) => record.transactionType.includes(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        const finalText = text.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="font-bold">{finalText}</p>
          </Tag>
        );
      },
    },
  ];
  return (
    <div className="w-full h-full p-4 ">
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Customer Information View</h1>
          <Link to={`/${direction.dashboard}/${direction.user}`}>
            <Button className="border-none mr-3">Cancel</Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg flex justify-between w-full h-full">
        <div className="w-[25%] h-full rounded-lg shadow-lg bg-white flex flex-col  items-center p-4">
          <div className="">
            <img
              src={image}
              className="w-[200px] h-[200px] rounded-full border shadow-lg"
            ></img>
          </div>
          <div className=" flex flex-col items-center w-full h-full   mt-5">
            <div className="gender h-[15%] flex w-[90%] justify-between items-center ">
              <p>Role</p>{" "}
              <span>
                {roleId === 1 ? "Admin" : roleId === 2 ? "Customer" : "Chef"}
              </span>
            </div>
            {/* <div className="gender h-[15%] flex w-[90%] justify-between items-center">
              <p>Rank</p> <Tag className="m-0">Classic</Tag>
            </div> */}
            <div className="gender h-[15%] flex w-[90%] justify-between items-center">
              <p>Total Order</p> <span>{countOrder}</span>
            </div>
            <div className="gender h-[15%] flex w-[90%] justify-between items-center">
              <p>Balance</p> <span>{formatMoney(balance)} VND</span>
            </div>
          </div>
        </div>
        <div className="w-[70%]">
          <Divider orientation="left">General Information</Divider>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={23}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Name
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={username}
                />
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Email
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={email}
                />
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Phone Number
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={phone}
                />
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Address
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={address}
                />
              </div>
            </Col>
            <Col className="" span={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  District
                </label>
                <Input value={districtName} className="w-full"></Input>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="w-[100%] h-[30%]">
        <h1 className="my-3">Orders</h1>
        <Table
          dataSource={order}
          columns={columns}
          bordered
          loading={loading}
        ></Table>
      </div>
      <div className="w-[100%] h-[30%]">
        <h1 className="my-3">Transactions</h1>
        <Table
          dataSource={transaction}
          columns={transactionColumns}
          bordered
          loading={loading}
        ></Table>
      </div>
    </div>
  );
};

export default AccountDetail;
