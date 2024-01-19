import {
  faBowlFood,
  faCookie,
  faHomeLg,
  faNewspaper,
  faPlateWheat,
  faSearch,
  faUser,
  faUtensilSpoon,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { setCurrentArea } from "../redux/directionSlice";
import { direction } from "../API/Direction";
import { TbFilterFilled } from "react-icons/tb";
import {
  Tag,
  Space,
  Table,
  ConfigProvider,
  Input,
  Select,
  Button,
  Popover,
} from "antd";
import { LuChefHat } from "react-icons/lu";
import { formatMoney } from "../API/Money";
import {
  cancelOrder,
  getAllKitchenBySessionId,
  getAllMealSessionBySessionId,
  getAllOrderBySessionId,
  getAllSessionAreaBySessionId,
} from "../API/Admin";
import moment from "moment";
import { toast } from "react-toastify";

const OrderCard = ({ sessionId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [order, setOrder] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [firstValueObject, setFirstValueObject] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [mealSession, setMealSession] = useState([]);
  const [chefValue, setChefValue] = useState(null);
  const [sessionValue, setSessionValue] = useState(null);
  const [areaValue, setAreaValue] = useState(null);
  const [mealSessionValue, setMealSessionValue] = useState();
  const [selectedRowIsActive, setSelectedRowIsActive] = useState(false);
  const [newOrder, setNewOrder] = useState(order || []);
  const [kitchen, setKitchen] = useState([]);
  const [sessionArea, setSessionArea] = useState([]);
  const fetchAllMealSessionBySessionId = () => {
    getAllMealSessionBySessionId(sessionId).then((res) => {
      setMealSession(res);
    });
  };
  const fetchAllChefBySessionId = () => {
    getAllKitchenBySessionId(sessionId).then((res) => {
      setKitchen(res);
    });
  };
  const fetchAllSessionAreaBySessionId = () => {
    getAllSessionAreaBySessionId(sessionId).then((res) => {
      setSessionArea(res);
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "orderId",
      render: (text) => (
        <div className="">
          <p className="">{text}</p>
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
            {record.customerDtoForGetAllOrderBySessionId?.phone}
          </p>
        </div>
      ),
    },
    {
      title: "Meal Session",
      dataIndex: "meal",
      render: (_, record) => (
        <p className="">
          {
            record.mealSessionDtoGetAllOrderBySessionId
              ?.mealDtoForGetAllOrderBySessionId?.name
          }
        </p>
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
      render: (text) => <p className="">{text}</p>,
    },
    {
      title: "Slot",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text) => <p className="">{text}</p>,
    },
    {
      title: "Price/VND",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.price - b.price,
      render: (text) => <p className="">{formatMoney(text)}</p>,
    },
    {
      title: selectedRowIsActive ? (
        <Select
          className="min-w-[100px]"
          options={[
            {
              value: "COMPLETED",
              label: "Complete",
            },
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
        const finalText = text?.toUpperCase();
        return (
          <Tag color="green" className="px-4 py-1">
            <p className="">{finalText}</p>
          </Tag>
        );
      },
      filters: [
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "Cancelled",
          value: "CANCELLED",
        },
        {
          text: "Paid",
          value: "PAID",
        },
        {
          text: "Accepted",
          value: "ACCEPTED",
        },
      ],
      onFilter: (value, record) => record.status.toUpperCase().includes(value),
    },
  ];
  const fetchAllOrderBySessionId = () => {
    setLoading(true);
    getAllOrderBySessionId(sessionId)
      .then((res) => {
        setOrder(res);
        setNewData(res);
      })
      .finally(() => setLoading(false));
  };

  const onHandleCancelOrder = () => {
    cancelOrder(selectedRowKeys)
      .then((res) => {
        toast.success("Cancel Order Completed.");
        fetchAllOrderBySessionId();
      })
      .catch(() => {
        toast.warning("Can Not Cancel Order.");
      })
      .finally(() => {
        setSelectedRows([]);
        setSelectedRowKeys([]);
        setFirstValueObject({});
        setSelectedRowIsActive(false);
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
  const handleResetFilters = () => {
    setAreaValue(null);
    setSessionValue(null);
    setChefValue(null);
    setMealSessionValue(null);
  };
  const content = (
    <div className="grid min-w-[300px] gap-8">
      <div className="flex flex-row justify-between w-full items-center">
        <div className="w-[20%]">
          <label htmlFor="">Area</label>
        </div>
        <div className="w-[80%]">
          <Select
            className=" mt-[-5px] w-full"
            placeholder="Select Area..."
            options={sessionArea?.map((item) => ({
              value: item.areaDtoForSessionArea?.areaId,
              label: item.areaDtoForSessionArea?.areaName,
            }))}
            value={areaValue}
            onChange={(item) => setAreaValue(item)}
          ></Select>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <div className="w-[20%]">
          <label htmlFor="">Chef</label>
        </div>
        <div className="w-[80%]">
          <Select
            className=" mt-[-5px] w-full"
            placeholder="Select Chef..."
            options={kitchen?.map((item) => ({
              value: item.kitchenId,
              label: item.name,
            }))}
            value={chefValue}
            onChange={(item) => setChefValue(item)}
          ></Select>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full items-center">
        <div className="w-[20%]">
          <label htmlFor="">Meal Session</label>
        </div>
        <div className="w-[80%]">
          <Select
            className=" mt-[-5px] w-full"
            placeholder="Select Chef..."
            options={mealSession?.map((item) => ({
              value: item.mealSessionId,
              label: item.mealDtoForMealSession?.name,
            }))}
            value={mealSessionValue}
            onChange={(item) => setMealSessionValue(item)}
          ></Select>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
  useEffect(() => {
    let filteredArray = order;
    if (search) {
      filteredArray = filteredArray?.filter((meal) => {
        return meal.customerDtoForGetAllOrderBySessionId?.phone.includes(
          search
        );
      });
    }
    if (chefValue) {
      filteredArray = filteredArray?.filter((order) => {
        return (
          order.mealSessionDtoGetAllOrderBySessionId
            ?.mealDtoForGetAllOrderBySessionId
            ?.kitchenDtoForGetAllOrderBySessionIdenId?.kitchenId === chefValue
        );
      });
    }

    if (areaValue) {
      console.log("areaValue là", areaValue);
      filteredArray = filteredArray?.filter((order) => {
        return (
          order.mealSessionDtoGetAllOrderBySessionId
            ?.areaDtoForGetAllOrderBySessionId?.areaId === areaValue
        );
      });
    }
    if (mealSessionValue) {
      filteredArray = filteredArray?.filter((order) => {
        return (
          order.mealSessionDtoGetAllOrderBySessionId?.mealSessionId ===
          mealSessionValue
        );
      });
    }
    setNewData(filteredArray);
  }, [search, chefValue, areaValue, mealSessionValue]);
  // useEffect(() => {
  //   let filterArray = order;
  //   if (search) {
  //     filterArray = filterArray.filter((item) => {
  //       return item.customerDtoForGetAllOrderBySessionId?.phone.includes(
  //         search
  //       );
  //     });
  //   }
  //   setNewData(filterArray);
  // }, [search]);
  useEffect(() => {
    fetchAllMealSessionBySessionId();
    fetchAllSessionAreaBySessionId();
    fetchAllChefBySessionId();
  }, [sessionId]);
  useEffect(() => {
    fetchAllOrderBySessionId();
  }, []);
  return (
    <div className={` min-h-[500px] w-full flex flex-col`}>
      <div className="my-5 w-[50%] flex flex-row justify-between items-center  ">
        <div>
          <Input
            className="box__shadow"
            placeholder="Enter Customer's Number Phone"
            prefix={<FontAwesomeIcon icon={faSearch} />}
            onChange={(text) => setSearch(text.target.value)}
          ></Input>{" "}
        </div>
        <div>
          <Popover
            className="h-[50px]"
            title="Filters"
            trigger="click"
            placement="bottomRight"
            content={content}
          >
            <Button className="py-5 px-5 flex justify-center items-center box__shadow">
              <TbFilterFilled />
              <span>Filter</span>
            </Button>
          </Popover>
        </div>
      </div>
      <div className="w-full h-full overflow-auto no-scrollbar ">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#F7F5FF",
                headerBorderRadius: 8,
                headerSplitColor: "none",
                fontSize: 15,
                fontWeightStrong: 700,
                footerBg: "black",
                bodySortBg: "transparent",
                headerSortActiveBg: "#F7F5FF",
              },
            },
          }}
        >
          <Table
            dataSource={newData}
            columns={columns}
            loading={loading}
            pagination={{ pageSize: 5 }}
            rowClassName={(record, index) =>
              `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
            }
            rowKey={(order) => order.orderId}
            rowSelection={rowSelection}
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
  );
};

export default OrderCard;
