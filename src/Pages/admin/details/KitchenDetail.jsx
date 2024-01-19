import {
  Button,
  Input,
  Row,
  Col,
  Divider,
  Tabs,
  Select,
  Tag,
  Space,
  DatePicker,
} from "antd";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table } from "antd";
import ProductList from "../../../Components/ProductList";
import {
  getAllDistrict,
  getAllFeedbackByKitchenId,
  getAllMealByKitchenId,
  getAllMealSessionByKitchenId,
  getAllTransactionByUserId,
  getKitchenByKitchenId,
  getKitchenByUserId,
  getOrderByKitchenId,
  getSingleMealSessionById,
} from "../../../API/Admin";
import { showDrawer } from "../../../redux/ToggleDrawerMealSlice.js";
import { direction } from "../../../API/Direction";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../../Components/MealDrawer";
import { formatMoney } from "../../../API/Money.js";
const datePart = (string) => {
  const newString = string || "";
  return newString.split(" ")[0];
};
const KitchenDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  const [meal, setMeal] = useState();
  const [kitchen, setKitchen] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [districtArray, setDistrictArray] = useState();
  const [drawerData, setDrawerData] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [newData, setNewData] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const { name, address } = kitchen || {};
  const { districtName } = kitchen?.districtDtoGetKitchen || {};
  const { email, phone, userId } = kitchen?.userDtoKitchenResponseModel || {};
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [newOrderData, setNewOrderData] = useState([]);
  const [newMealSessionData, setNewMealSessionData] = useState([]);
  const [newTransactionData, setNewTransactionData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format(dateFormatList[2])
  );
  const fetchKitchenByUserId = () => {
    setLoading(true);
    getKitchenByUserId(id).then((res) => {
      setUser(res);
      setKitchen(res);
      getAllMealSessionByKitchenId(res.kitchenId).then((res) => {
        setMeal(res.slice().reverse());
        setNewData(
          res
            .slice()
            .reverse()
            .filter((item) => {
              return item.createDate.includes(selectedDate);
            })
        );
      });
      // getKitchenByKitchenId(res?.kitchenId).then((res) => {
      //   console.log(res);
      //   setKitchen(res);
      // });
      getAllDistrict().then((res) => setDistrictArray(res));
      getOrderByKitchenId(res?.kitchenId).then((res) => {
        setOrder(res);
        setNewOrderData(
          res?.filter((item) => {
            return datePart(item.time) === selectedDate;
          })
        );
      });
      getAllFeedbackByKitchenId(res?.kitchenId).then((res) =>
        setFeedback(res.slice().reverse())
      );
      getAllTransactionByUserId(id).then((res) => {
        setTransaction(res.slice().reverse());
      });
      setLoading(false);
    });
  };

  const { balance } =
    kitchen?.userDtoKitchenResponseModel?.walletDtoKitchenResponseModel || {};
  const toggleDrawerType2 = async (mealSessionId) => {
    await getSingleMealSessionById(mealSessionId)
      .then((res) => setDrawerData(res))
      .catch((error) => console.log(error));
    dispatch(showDrawer(mealSessionId));
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
        <p className="font-bold">{record.customer.name}</p>
      ),
    },
    {
      title: "Product",
      dataIndex: "meal",
      render: (_, record) => {
        return (
          <p className="font-bold">
            {record.mealSession?.mealDtoOrderResponse?.name}
          </p>
        );
      },
    },
    {
      title: "Create At",
      dataIndex: "time",
      render: (text) => <p className="font-bold">{text}</p>,
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        // Convert the date strings to JavaScript Date objects for comparison
        const dateA = new Date(
          a.time.replace(
            /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/,
            "$3-$2-$1T$4:$5"
          )
        );
        const dateB = new Date(
          b.time.replace(
            /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/,
            "$3-$2-$1T$4:$5"
          )
        );

        return dateA - dateB;
      },
    },
    {
      title: "Price/VND",
      dataIndex: "totalPrice",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (text) => <p className="font-bold">{text}</p>,
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
    },
  ];
  // const mealColumns = [
  //   {
  //     title: "Meal ID",
  //     dataIndex: "mealSessionId",
  //     render: (text) => <div className="font-bold">{text}</div>,
  //   },
  //   {
  //     title: "Thumbnail",
  //     dataIndex: "image",
  //     render: (_, record) => (
  //       <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
  //         <img
  //           src={record?.mealDtoForMealSession?.image}
  //           className="w-[100px] h-[100px]"
  //         ></img>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Title",
  //     dataIndex: "name",
  //     render: (_, record) => (
  //       <div className="min-w-[80px] font-bold">
  //         {record?.mealDtoForMealSession?.name}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Amount/VND",
  //     dataIndex: "price",
  //     render: (text) => <div className="min-w-[100px]">{text}</div>,
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space
  //         size="middle"
  //         className="p-1 border rounded-md hover:border-gray-600"
  //       >
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           class="w-6 h-6"
  //           onClick={() => toggleDrawerType2(record.mealSessionId)}
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
  //           />
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
  //           />
  //         </svg>
  //       </Space>
  //     ),
  //   },
  // ];
  const mealColumns = [
    {
      title: "Menu",
      dataIndex: "image",
      render: (_, record) => (
        <div className="lg:w-full md:w-[100px] h-[120px] p-1 flex justify-center items-center">
          <img
            className="!rounded-2xl box__shadow bg-yellow-50 hover:scale-110 transition-all duration-500 h-full w-[120px] "
            src={record.mealDtoForMealSession.image}
          ></img>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Divider type="vertical" className="h-[70px] bg-slate-300" />
      ),
    },
    {
      dataIndex: "name",
      render: (_, record) => (
        <div className="flex  justify-between items-center">
          <div>
            <h1>
              {record.mealDtoForMealSession?.name} #{record.mealSessionId}
            </h1>
            <p>Create At :{record.createDate}</p>
            <p>{record.mealDtoForMealSession?.description}</p>
          </div>
          <div>
            <Tag
              className="p-2 shadow-md min-w-[100px] text-center"
              color={`${
                record.status.includes("PROCESSING")
                  ? "blue"
                  : record.status.includes("APPROVED")
                  ? "green"
                  : "red"
              }`}
            >
              <span className="font-bold">{record.status}</span>
            </Tag>
          </div>
        </div>
      ),
      // defaultSortOrder: "descend",
      // sorter: (a, b) => {
      //   const dateA = new Date(a.createDate);
      //   const dateB = new Date(b.createDate);

      //   return dateA - dateB;
      // },
      filters: [
        { text: "PROCESSING", value: "PROCESSING" },
        { text: "APPROVED", value: "APPROVED" },
        { text: "REJECTED", value: "REJECTED" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      // filterDropdownVisible: false,
    },

    {
      dataIndex: "",
      render: (_, record) => (
        <Divider type="vertical" className="h-[70px] bg-slate-300" />
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className=" hover:border-gray-600 flex flex-col  w-[150px]"
        >
          <h1>{formatMoney(record.price)} VND</h1>
          {/* <Link to={`/dashboard/account/${record.id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link> */}
          <div
            onClick={() => console.log(record)}
            className="flex justify-between w-[50px] items-center hover:cursor-pointer"
          >
            <AiTwotoneEdit
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn "
              onClick={() => toggleDrawerType2(record.mealSessionId)}
            />
            <AiFillDelete
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn"
              onClick={confirm}
            />
          </div>
        </Space>
      ),
      sorter: (a, b) => a.price - b.price,
    },
  ];
  const feedbackColumns = [
    {
      title: "Meal ID",
      dataIndex: "feedbackId",
      render: (text) => <div className="font-bold">{text}</div>,
    },
    {
      title: "Customer",
      dataIndex: "image",
      render: (_, record) => (
        <div className="">
          <p className="font-bold text-xl">
            {record?.customerDtoFeedbackReponseModel?.name}
          </p>
        </div>
      ),
    },
    {
      title: "Feedback Title",
      dataIndex: "description",
      render: (text) => <div className="min-w-[80px] font-bold">{text}</div>,
    },
    {
      title: "Create At",
      dataIndex: "createDate",
      render: (text) => <div className="min-w-[100px]">{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          className="p-1 border rounded-md hover:border-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
            onClick={() => toggleDrawerType2(record.mealSessionId)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Space>
      ),
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
          text: "Total Transfer",
          value: "TT",
        },
        {
          text: "Fined",
          value: "FINED",
        },
        {
          text: "Recharge",
          value: "RECHARGED",
        },
      ],
      onFilter: (value, record) => record.transactionType === value,
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
  const items = [
    {
      key: "1",
      label: "Orders",
      children: (
        <div>
          <DatePicker
            // value={selectedDate}
            defaultValue={dayjs()}
            format="DD-MM-YYYY"
            onChange={(date, dateString) => {
              setSelectedDate(dateString);
            }}
            className="box__shadow !h-[50px] my-5 w-full md:w-[30%] lg:w-[30%] md:ml-2 lg:ml-2"
          />

          <Table
            columns={columns}
            dataSource={newOrderData}
            bordered
            loading={loading}
            className="overflow-x-auto"
          ></Table>
        </div>
      ),
    },
    {
      key: "4",
      label: "Transaction",
      children: (
        <div>
          <DatePicker
            // value={selectedDate}
            defaultValue={dayjs()}
            format="DD-MM-YYYY"
            onChange={(date, dateString) => {
              setSelectedDate(dateString);
            }}
            className="box__shadow !h-[50px] my-5 w-full md:w-[30%] lg:w-[30%] md:ml-2 lg:ml-2"
          />
          <div>
            <h1 className="text-red-400">TT : Total Transfer</h1>
          </div>
          <Table
            dataSource={newTransactionData}
            columns={transactionColumns}
            className="w-full overflow-auto"
          />
          ,
        </div>
      ),
    },
    {
      key: "2",
      label: "Meal",
      children: (
        <div>
          <DatePicker
            // value={selectedDate}
            defaultValue={dayjs()}
            format="DD-MM-YYYY"
            onChange={(date, dateString) => {
              setSelectedDate(dateString);
            }}
            className="box__shadow !h-[50px] my-5 w-full md:w-[30%] lg:w-[30%] md:ml-2 lg:ml-2"
          />
          <Table
            dataSource={newMealSessionData}
            columns={mealColumns}
            className="overflow-auto"
          />
          ,
        </div>
      ),
    },
    {
      key: "3",
      label: "Feedback",
      children: (
        <Table
          dataSource={feedback}
          columns={feedbackColumns}
          className="overflow-auto"
        />
      ),
    },
  ];
  const onHandleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    fetchKitchenByUserId();
  }, [id]);
  useEffect(() => {
    setLoading(true);
    getAllMealSessionByKitchenId(user?.kitchenId).then((res) => {
      setMeal(res);
      const reverseData = res?.slice().reverse();
      setNewData(
        reverseData?.filter((item) => {
          return item.createDate.includes(selectedDate);
        })
      );
      setLoading(false);
    });
  }, [selectedDate, refresh]);

  useEffect(() => {
    let filterOrder = order;
    let filterTransaction = transaction;
    let filterMeal = meal;

    if (selectedDate) {
      filterOrder = filterOrder?.filter((item) => {
        return datePart(item.time) === selectedDate;
      });
      filterTransaction = filterTransaction?.filter((item) => {
        return datePart(item.date) === selectedDate;
      });
      filterMeal = filterMeal?.filter((item) => {
        return item.createDate === selectedDate;
      });
    }
    setNewOrderData(filterOrder);
    setNewMealSessionData(filterMeal);
    setNewTransactionData(filterTransaction);
  }, [selectedDate]);
  return (
    <div className="w-full h-full p-4 overflow-x-auto">
      <CustomDrawer meal={drawerData || {}} />
      <div className="account-search h-[10%] flex items-center  justify-end mb-3">
        <div className="h-[40%] add-btn flex justify-between items-center w-full">
          <h1>Kitchen Information View</h1>
          {/* <Link to={`/${direction.dashboard}/${direction.kitchen}`}>
            <Button className="border-none mr-3">Leave</Button>
          </Link> */}
          <Button
            className="border-none mr-3"
            onClick={() => {
              onHandleBack();
            }}
          >
            Leave
          </Button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg flex flex-col justify-between w-full h-[70%] md:flex md:flex-row">
        <div className="w-full md:w-[70%] lg:w-[70%] h-full overflow-y-auto">
          <Divider orientation="left">Kitchen Information</Divider>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={23}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Kitchen Name
                </label>
                <Input className="box__shadow" classNames="mt-2" value={name} />
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px] gap-5 ">
            <Col className="" xs={23} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  District
                </label>
                <Select className="w-full" value={districtName}>
                  {districtArray?.map((item, index) => (
                    <Select.Option key={index}>
                      {item.districtName}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col className="" xs={23} md={11} lg={11}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Area
                </label>
                <Input
                  className="box__shadow"
                  classNames="mt-2"
                  value={kitchen?.areaDtoGetKitchen?.areaName}
                />
              </div>
            </Col>
          </Row>
          <Row className="flex justify-around my-4 h-[80px] mt-20 md:mt-0 lg:mt-0">
            <Col span={23}>
              <div>
                <label htmlFor="" className=" flex justify-start pb-2">
                  Balance
                </label>
                <Input
                  className="box__shadow"
                  value={formatMoney(balance) + " VND"}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="w-full md:w-[30%] lg:w-[30%]">
          <Divider orientation="left">Chef Information</Divider>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={24}>
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
          </Row>
          <Row className="flex justify-around my-4 h-[80px]">
            <Col className="" span={24}>
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
        </div>
      </div>
      <div className="w-[100%] h-[30%] my-2 overflow-x-auto">
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={items}
          className="min-h-[300px] overflow-x-auto"
        />
      </div>
    </div>
  );
};

export default KitchenDetail;
