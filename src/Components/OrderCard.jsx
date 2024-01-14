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
import { Tag, Space, Table, ConfigProvider, Input } from "antd";
import { LuChefHat } from "react-icons/lu";
import { formatMoney } from "../API/Money";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  console.log("AreaCard", order);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState([]);
  const [newOrder, setNewOrder] = useState(order || []);
  // const {
  //   // areaId,
  //   // address,
  //   // areaName,
  //   status,
  //   districtId,
  //   totalMealSessions,
  //   totalOrders,
  //   totalChefs,
  // } = area || {};
  // const { areaId, address, areaName } = area?.areaDtoForSessionArea || {};
  //   const onHandleNavigateToAreaDetail = () => {
  //     navigate(`${direction.mealSessionInKitchen}/${record.kitchenId}`, {
  //       kitchenId: 2,
  //     });
  //   };
  const onHandleNavigateToAreaDetail = () => {
    // dispatch(setCurrentArea(areaId));
    // localStorage.setItem("areaId", areaId);
    // navigate(`${direction.manageChefInArea}/${areaId}`, {
    //   areaId: areaId,
    // });
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
      title: "Product",
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
      title: "Price/VND",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.price - b.price,
      render: (text) => <p className="">{formatMoney(text)}</p>,
    },
    {
      title: "Status",
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
  useEffect(() => {
    console.log("vào đây nhé");

    let filterArray = newOrder;
    console.log("filteraarray", newOrder);
    if (search) {
      filterArray = filterArray.filter((item) => {
        return item.customerDtoForGetAllOrderBySessionId?.phone.includes(
          search
        );
      });
    }
    setNewData(filterArray);
  }, [search]);
  return (
    <div className="min-h-[500px] w-full flex flex-col ">
      <div className="my-5 w-[30%]">
        <Input
          placeholder="Enter Customer's Number Phone"
          prefix={<FontAwesomeIcon icon={faSearch} />}
          onChange={(text) => setSearch(text.target.value)}
        ></Input>
      </div>
      <div className="w-full h-full overflow-auto no-scrollbar">
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
