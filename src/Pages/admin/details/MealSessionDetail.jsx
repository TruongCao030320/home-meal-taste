import React, { useEffect, useRef, useState } from "react";
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
  Spin,
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
  cancelOrder,
  getAllOrderByMealSessionId,
  getSingleMealSessionById,
  updateStatusMultiMealSession,
} from "../../../API/Admin";
import { Label } from "recharts";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { getAllCategories, getSingleProduct } from "../../../API/newApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faPercent,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const MealSessionDetail = () => {
  const navigate = useNavigate();
  const { mealSessionId } = useParams();
  const { RangePicker } = DatePicker;
  const currentRef = useRef(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [meal, setMeal] = useState({});
  const [genderSelected, setGenderSelected] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [order, setOrder] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [firstValueObject, setFirstValueObject] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);
  const [newOrder, setNewOrder] = useState(order || []);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    id: null,
    title: "",
    description: "",
    price: null,
    discountPercentage: null,
    rating: null,
    stock: null,
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  });
  const [reviewImg, setReviewImg] = useState();
  const fetchSingleProduct = () => {
    setLoading(true);
    getSingleProduct(mealSessionId).then((res) => {
      setProduct(res);
      getAllCategories().then((res) => {
        setCategories(res);
      });
      setLoading(false);
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
      setSelectedRowKeys([]);
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
        record.status === "NOTEAT",
    }),
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
      title: selectedRowIsActive ? (
        <Select
          className="min-w-[100px]"
          defaultValue="Status"
          options={[
            {
              value: "CANCELLED",
              label: "Cancel",
            },
          ]}
          onChange={() => {
            onHandleCancelOrder();
          }}
        ></Select>
      ) : (
        "Status"
      ),
      dataIndex: "status",
      render: (text, record, index) => {
        const finalText = text.toUpperCase();
        return <Tag className="px-5 py-1">{finalText}</Tag>;
      },
    },
  ];
  useEffect(() => {
    fetchSingleProduct();
  }, [mealSessionId]);

  useEffect(() => {
    console.log(typeof search);
  }, [search]);
  const navigatePage = (id) => {
    navigate(`/${direction.dashboard}/${direction.order}/${id}`);
  };
  const resetFilter = () => {
    setFilteredData();
    setGenderSelected();
    setSelectedDateRange();
  };

  const onHandleBack = () => {
    navigate(-1);
  };

  const newData = data?.filter((item) => {
    if (search) {
      // Check if the phone number exists and includes the search string
      return item.customerDto1?.phone.includes(search);
    }
  });
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setReviewImg(fileUrl);
    }
  };
  return (
    <div className="w-full h-full p-4 rounded-lg min-h-[100vh]">
      {loading ? (
        <Spin
          className="fixed left-[55%] top-[50%] bottom-[50%]"
          size="large"
        ></Spin>
      ) : (
        <div>
          <div className="account-search h-[10%] flex items-center  justify-end mb-3">
            <div className="h-[40%] add-btn flex justify-between items-center w-full py-3 ">
              <h1>
                {product?.category} #{product?.id}
              </h1>
              <div className="flex gap-4">
                <Button onClick={onHandleBack}>Leave</Button>
                <Button
                  onClick={() => {
                    toast.success("Update completed.");
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white  p-4 rounded-lg ">
            <div className="w-full overflow-auto no-scrollbar flex flex-row justify-between ">
              <div className="w-[30%] p-5">
                <div className="w-full border-2 rounded-3xl p-5 box__shadow">
                  <h1>Thumbnail</h1>
                  <div
                    className="w-full border-dashed  border-2 p-2 rounded-lg my-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    <input
                      type="file"
                      ref={currentRef}
                      hidden
                      id="choose"
                      onChange={handleFileChange}
                    />

                    <img
                      src={reviewImg ? reviewImg : product?.thumbnail}
                      className="h-full w-[100%] max-h-[200px] rounded-lg"
                      onClick={() => {
                        currentRef.current.click();
                      }}
                    ></img>
                  </div>
                </div>

                <div className="w-full border-2 rounded-3xl p-5 box__shadow my-5">
                  <div className="w-full flex flex-col lg:flex lg:flex-row justify-between items-center">
                    <h1>Status</h1>
                    <div
                      style={{
                        fontWeight: 500,
                        color: meal?.status?.includes("APPROVED")
                          ? "green"
                          : meal?.status?.includes("CANCELLED")
                          ? "gray"
                          : meal?.status?.includes("COMPLETED")
                          ? "orangered"
                          : "",
                      }}
                    >
                      Available
                    </div>
                  </div>
                  <Divider></Divider>
                  <Select
                    disabled={
                      meal?.status === "COMPLETED" ||
                      meal?.status === "CANCELLED" ||
                      meal?.status === "REJECTED"
                        ? true
                        : false
                    }
                    className="w-full"
                    options={[
                      {
                        value:
                          meal?.status === "PROCESSING"
                            ? "APPROVED"
                            : "COMPLETED",
                        label: "Sold Out",
                      },
                      {
                        value:
                          meal?.status === "APPROVED"
                            ? "CANCELLED"
                            : "REJECTED",
                        label: "Available",
                      },
                      // {
                      //   value: "COMPLETED",
                      //   label: "Complete",
                      //   disabled: meal?.status?.includes("COMPLETED"),
                      // },
                    ]}
                    onChange={(value) => {
                      onHandleUpdateStatusMultiMealSession(value);
                    }}
                  ></Select>
                </div>
              </div>
              <div className="w-[70%] h-full min-h-[200px]  p-5  flex flex-col justify-around ">
                <div className="w-full h-full min-h-[200px]  rounded-3xl p-5 border-2 flex flex-col justify-around box__shadow">
                  <h1>General</h1>
                  <Divider className="w-full" orientationMargin={50}></Divider>
                  <div className="w-full my-2">
                    <Row className="flex flex-row justify-between w-full gap-4">
                      <Col xs={23} md={11} lg={11}>
                        <label>Title</label>
                        <Input
                          value={product?.title}
                          className="box__shadow"
                          onChange={(e) => {
                            setProduct({ ...product, title: e.target.value });
                          }}
                        />
                      </Col>
                      <Col xs={23} md={11} lg={11}>
                        <label>Stock</label>
                        <Input
                          type="number"
                          value={product?.stock}
                          className="box__shadow"
                          onChange={(e) => {
                            setProduct({ ...product, stock: e.target.value });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="flex flex-row justify-between w-full my-5">
                      <Col span={24}>
                        <label>Description</label>
                        <TextArea
                          className="box__shadow w-full"
                          value={product?.description}
                          onChange={(e) => {
                            setProduct({
                              ...product,
                              description: e.target.value,
                            });
                          }}
                        ></TextArea>
                      </Col>
                    </Row>
                    <Row className="flex flex-row justify-between w-full my-5">
                      <Col xs={23} md={11} lg={11}>
                        <label>Discount (Percent)</label>
                        <Input
                          type="number"
                          value={product?.discountPercentage}
                          suffix={<FontAwesomeIcon icon={faPercent} />}
                          className="box__shadow"
                          onChange={(e) => {
                            setProduct({
                              ...product,
                              discountPercentage: e.target.value,
                            });
                          }}
                        />
                      </Col>

                      <Col xs={23} md={11} lg={11}>
                        <label>Price</label>
                        <Input
                          value={formatMoney(product?.price)}
                          suffix={<FontAwesomeIcon icon={faDollar} />}
                          className="box__shadow"
                          onChange={(e) => {
                            setProduct({ ...product, price: e.target.value });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="flex flex-row justify-between w-full my-5">
                      <Col xs={23} md={11} lg={11}>
                        <label>Category</label>

                        <Select
                          value={product?.category}
                          options={categories.map((item) => ({
                            value: item,
                            label: item,
                          }))}
                          onChange={(value) => {
                            setProduct({
                              ...product,
                              category: value,
                            });
                          }}
                        ></Select>
                      </Col>
                      <Col xs={23} md={11} lg={11} hidden>
                        <label>Remain Quantity (Slot)</label>
                        <Input
                          value={meal?.remainQuantity}
                          className="box__shadow"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <h1>Collections</h1>
                      <Divider
                        className="w-full"
                        orientationMargin={50}
                      ></Divider>
                      <div className="grid md:grid-cols-2  lg:grid-cols-2 grid-cols-1 gap-2 p-4 bg-colorBg rounded-lg w-full">
                        {product?.images?.map((item) => (
                          <div className="flex flex-col lg:flex-row md:flex-row items-center gap-2 bg-white border w-[100%] p-2 rounded-lg">
                            <img
                              src={item}
                              className="w-[100px] h-[100px] rounded-full box__shadow border"
                            ></img>
                            <div></div>
                          </div>
                        ))}
                        <div
                          className="flex flex-col lg:flex-row md:flex-row items-center gap-2 bg-white border w-[100%] p-2 rounded-lg cursor-pointer"
                          onClick={() => {
                            document.getElementById("choose2").click();
                          }}
                        >
                          <input
                            type="file"
                            hidden
                            id="choose2"
                            onChange={(e) => {
                              product?.images?.push(
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                          />
                          <FontAwesomeIcon icon={faPlusCircle} size="xl" />
                          <h1>Add more...</h1>
                        </div>
                      </div>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {/* <div className=" h-full min-h-[200px] overflow-scroll no-scrollbar rounded-3xl p-5 border-2 flex flex-col justify-around box__shadow my-5">
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
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSessionDetail;
