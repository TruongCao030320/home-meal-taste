import React, { useEffect, useState, createContext, useRef } from "react";
import {
  Table,
  Tag,
  Space,
  Input,
  Select,
  DatePicker,
  Button,
  Modal,
  ConfigProvider,
  Drawer,
  Dropdown,
  Popover,
  Form,
  Row,
  Col,
  Divider,
  Breadcrumb,
} from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import { FilterFilled } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "../../../Components/MealDrawer.jsx";
import { TiTick, TiDelete } from "react-icons/ti";
import { Title } from "chart.js";
import { useForm } from "antd/es/form/Form";
import ExpandedContent from "../../../Components/ExpandedContent.jsx";
import { direction } from "../../../API/Direction.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import {
  faDeleteLeft,
  faEdit,
  faHome,
  faKitchenSet,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllMealSessionByKitchenId,
  getAllMealSessionByKitchenInSession,
  getAllMealSessionInSessionByAreaAndKitchenId,
  getKitchenByKitchenId,
  getSingleArea,
  getSingleMealSessionById,
  getSingleSessionById,
  getTotalInSessionOfSingleKitchen,
} from "../../../API/Admin.js";
import { showDrawer } from "../../../redux/ToggleDrawerMealSlice.js.js";
import { formatMoney } from "../../../API/Money.js";
const { RangePicker } = DatePicker;
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const ManageMealSessionInKitchen = () => {
  const { kitchenId } = useParams();
  // const sessionId = useSelector((state) => state.directionSlice.currentSession);
  // const areaId = useSelector((state) => state.directionSlice.currentArea);
  const sessionId = localStorage.getItem("sessionId");
  const areaId = localStorage.getItem("areaId");
  // console.log("sessionId và areaId", sessionId, areaId, kitchenId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { infor } = useParams();
  const [form] = useForm();
  const [showAddForm, setShowAddForm] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [drawerData, setDrawerData] = useState({});
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  // function section
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [rowDataExpand, setRowDataExpand] = useState({});
  const [mealSessionIdIsChange, setMealSessionIdIsChange] = useState(null);
  const [mealSessionOfKitchen, setMealSessionOfKitchen] = useState([]);
  const [totalInSessionOfKitchen, setTotalInSessionOfKitchen] = useState();
  const [kitchen, setKitchen] = useState({});
  const [session, setSession] = useState({});
  const [search, setSearch] = useState("");
  const [area, setArea] = useState();
  const [newData, setNewData] = useState([]);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("DD-MM-YYYY")
  );
  const handleExpand = (expanded, record) => {
    if (expanded) {
      setMealSessionIdIsChange(record.mealSessionId);
      setExpandedRowKeys([...expandedRowKeys, record.mealSessionId]);
    } else {
      setExpandedRowKeys(
        expandedRowKeys.filter((key) => key !== record.mealSessionId)
      );
    }
  };
  const onRowClick = (record) => {
    console.log("record gui di la", record);
    navigate(`${direction.chefInSession}/${record.sessionId}`);
  };
  const onHandleShowModalDeleteSession = (id) => {
    setShow(true);
    setId(id);
  };
  // const fetchAllMealSessionByKitchenId = () => {
  //   setLoading(true);
  //   getAllMealSessionByKitchenInSession(kitchenId, sessionId).then((res) => {
  //     setMealSessionOfKitchen(res.slice().reverse());
  //     setNewData(
  //       res
  //         .slice()
  //         .reverse()
  //         .filter((item) => {
  //           return item.createDate.includes(selectedDate);
  //         })
  //     );
  //     setLoading(false);
  //   });
  // };
  const fetchKitchenByKitchenId = () => {
    getKitchenByKitchenId(kitchenId).then((res) => {
      setKitchen(res);
    });
  };
  const fetchTotalInSessionOfKitchen = () => {
    getTotalInSessionOfSingleKitchen(sessionId, kitchenId).then((res) => {
      setTotalInSessionOfKitchen(res);
    });
  };
  const fetchSingleSessionById = () => {
    getSingleSessionById(sessionId).then((res) => {
      setSession(res);
      // setArea(res.areaDtoGetSingleSessionBySessionId);
    });
  };
  const fetchSingleArea = () => {
    getSingleArea(areaId).then((res) => {
      setArea(res);
    });
  };
  const fetchAllMealSessionInSessionByAreaAndKitchenId = () => {
    setLoading(true);
    getAllMealSessionInSessionByAreaAndKitchenId(areaId, sessionId, kitchenId)
      .then((res) => {
        setMealSessionOfKitchen(res);
        setNewData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onHandleNavigateToKitchenInformation = () => {
    navigate(
      `/${direction.dashboard}/${direction.kitchen}/${kitchen?.userDtoKitchenResponseModel?.userId}`
    );
  };
  const toggleDrawerType2 = async (mealSessionId) => {
    if (mealSessionId !== null) {
      await getSingleMealSessionById(mealSessionId)
        .then((res) => setDrawerData(res))
        .catch((error) => console.log(error));
      dispatch(showDrawer(mealSessionId));
    } else {
      return;
    }
  };
  const columns = [
    {
      title: "Menu",
      dataIndex: "image",
      render: (_, record) => (
        <div className="lg:w-full md:w-[100px] h-[120px] p-1 flex justify-center items-center">
          <img
            className="!rounded-2xl box__shadow bg-yellow-50 hover:scale-110 transition-all duration-500 h-full w-[120px] "
            src={record.mealDtoForMealSession?.image}
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
                record.status?.includes("PROCESSING")
                  ? "blue"
                  : record.status?.includes("APPROVED")
                  ? "green"
                  : record.status?.includes("COMPLETED")
                  ? "blue"
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
            className="flex justify-between w-[50px] items-center "
          >
            <AiTwotoneEdit
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn "
              onClick={() => toggleDrawerType2(record.mealSessionId)}
            />
            {/* <AiFillDelete
              size={20}
              className="text-bgBtnColor hover:text-bgColorBtn"
              onClick={confirm}
            /> */}
          </div>
        </Space>
      ),
      sorter: (a, b) => a.price - b.price,
    },
  ];
  // content section
  // end content section

  useEffect(() => {
    // fetchAllMealSessionByKitchenId();
    fetchKitchenByKitchenId();
    fetchTotalInSessionOfKitchen();
    fetchAllMealSessionInSessionByAreaAndKitchenId();
  }, [kitchenId, refresh]);
  useEffect(() => {
    fetchSingleSessionById();
    fetchSingleArea();
    fetchAllMealSessionInSessionByAreaAndKitchenId();
  }, []);
  useEffect(() => {
    fetchAllMealSessionInSessionByAreaAndKitchenId();
  }, [5000]);
  useEffect(() => {
    let filteredData = [...mealSessionOfKitchen];
    if (search) {
      filteredData = filteredData.filter((item) => {
        const inforNormalize = normalizeString(
          item?.mealDtoForMealSession?.name
        );
        const searchNormalize = normalizeString(search);
        return inforNormalize.includes(searchNormalize);
      });
    }
    if (selectedDate) {
      filteredData = filteredData?.filter((item) => {
        return item.createDate.includes(selectedDate);
      });
    }
    setNewData([...filteredData]);
  }, [search, selectedDate]);
  return (
    <div className="w-full h-full p-4">
      <CustomDrawer meal={drawerData || {}} />
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={`/${direction.dashboard}/${direction.sessionArea}`}>
                <p className="font-bold text-black underline">Session-Area</p>
              </Link>
            ),
          },
          {
            title: (
              <Link
                to={`/${direction.dashboard}/${direction.sessionArea}/${direction.manageChefInArea}/${areaId}`}
              >
                <p className="font-bold text-black underline">
                  {area?.areaName}
                </p>
              </Link>
            ),
          },
        ]}
      />
      <div className="account-search flex items-center  justify-end ">
        <div className="w-full h-[40%] add-btn flex justify-between items-center mb-3">
          <div className="flex flex-row justify-center items-center gap-2">
            <FontAwesomeIcon icon={faKitchenSet} fontSize={25} />
            <h1
              onClick={onHandleNavigateToKitchenInformation}
              className="hover:cursor-pointer hover:text-bgBtnColor"
            >
              {kitchen?.name}
            </h1>
          </div>
          <div className="my-2 flex flex-row  justify-between">
            <h1 className="underline">
              Total Revenue In Session :{formatMoney(totalInSessionOfKitchen)}{" "}
              VND
            </h1>
          </div>
          {/* <Link
            to={`/${direction.dashboard}/${direction.session}/${direction.chefInSession}/${sessionId}`}
          >
            <Button
              // onClick={() => setShowAddForm(true)}
              className="hidden md:hidden lg:hidden"
            >
              Leave
            </Button>
          </Link> */}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="account-search flex items-center justify-between mb-5 w-[100%]  lg:flex md:w-full md:grid md:grid-cols-2 md:gap-3 lg:w-[100%]">
          <div className="my-2 flex flex-row w-[40%] justify-between">
            <Input
              placeholder="Enter meal's name..."
              onChange={(e) => setSearch(e.target.value)}
              className="box__shadow"
              suffix={<FontAwesomeIcon icon={faSearch} />}
            />
            {/* <DatePicker
              // value={selectedDate}
              format="DD-MM-YYYY"
              defaultValue={dayjs()}
              onChange={(date, dateString) => {
                setSelectedDate(dateString);
              }}
              className="box__shadow !h-[50px] mx-3 !w-[300px]"
            /> */}
          </div>
        </div>

        <div className="w-full overflow-auto">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#F7F5FF",
                  headerBorderRadius: 8,
                  headerSplitColor: "none",
                  fontSize: 16,
                  fontWeightStrong: 700,
                  footerBg: "black",
                  bodySortBg: "transparent",
                  headerSortActiveBg: "#F7F5FF",
                },
              },
            }}
          >
            <Table
              columns={columns}
              expandable={{
                expandedRowKeys: expandedRowKeys,
                expandedRowRender: (record, index) => {
                  // const [search, setSearch] = useState("");
                  // const dataExpand = rowDataExpand[record.mealSessionId] || [];
                  return (
                    <div>
                      <ExpandedContent mealSessionId={record.mealSessionId} />
                    </div>
                  );
                },
                // rowExpandable: (record) => record.expandable !== "title",
                onExpand: handleExpand,
              }}
              loading={loading}
              dataSource={newData}
              rowKey={(record) => record.mealSessionId}
              rowClassName={(record, index) =>
                `custom-row ${index % 2 === 0 ? "even-row" : "odd-row"}`
              }
              pagination={{ pageSize: 5 }}
            ></Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ManageMealSessionInKitchen;
