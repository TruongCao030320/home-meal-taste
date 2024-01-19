import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllKitchenBySessionId,
  getAllMealSessionBySessionId,
  getAllSessionAreaBySessionId,
  updateStatusMultiMealSession,
} from "../API/Admin";
import MealSessionCard from "./MealSessionCard";
import { Input, Checkbox, Button, Spin, Select, Popover } from "antd";
import { TbFilterFilled, TbSearch } from "react-icons/tb";
import {
  resetMealSessionKey,
  setSelectedMealSessionKey,
} from "../redux/SelectecedMealSessionKeySlice";
import { toast } from "react-toastify";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const MealSessionComponent = ({ sessionId }) => {
  const dispatch = useDispatch();
  const selectedRowKeys = useSelector(
    (state) => state.selectedMealSessionSlice.mealSessionKeys
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [kitchen, setKitchen] = useState([]);
  const [chefValue, setChefValue] = useState(null);
  const [sessionValue, setSessionValue] = useState(null);
  const [areaValue, setAreaValue] = useState(null);

  const [mealSession, setMealSession] = useState([]);
  const [newData, setNewData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [sessionArea, setSessionArea] = useState([]);
  const fetchAllMealSessionBySessionId = () => {
    setLoading(true);
    getAllMealSessionBySessionId(sessionId)
      .then((res) => {
        setMealSession(res);
        setNewData(res);
      })
      .finally(() => {
        setLoading(false);
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
  // const fetchAllAreaBySessionId = ()=>{
  //   getAllAreaBy
  // }
  const updateForSwitchCaseMultiStatus = (value) => {
    updateStatusMultiMealSession(selectedRowKeys, value)
      .then((res) => {
        toast.success("Change Status Meal Session Is Completed.");
        fetchAllMealSessionBySessionId();
      })
      .catch(() => {
        toast.warning("Can Not Change Status Of Meal Session");
        fetchAllMealSessionBySessionId();
      })
      .finally(() => {
        dispatch(resetMealSessionKey());
      });
  };
  const onHandleChangeMultiMealSessionStatus = (value) => {
    switch (value) {
      case "APPROVED":
        updateForSwitchCaseMultiStatus(value);
        break;
      case "REJECTED":
        updateForSwitchCaseMultiStatus(value);
        break;
      case "CANCELLED":
        updateForSwitchCaseMultiStatus(value);

        break;
      default:
        break;
    }
  };
  const handleResetFilters = () => {
    setAreaValue(null);
    setSessionValue(null);
    setChefValue(null);
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
            placeholder="Select Chef..."
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
      <div className="flex w-full justify-end">
        <Button onClick={handleResetFilters}>Reset Filters</Button>
      </div>
    </div>
  );
  const refresh = useSelector((state) => state.mealDrawer.refresh);
  useEffect(() => {
    fetchAllMealSessionBySessionId();
    fetchAllChefBySessionId();
    fetchAllSessionAreaBySessionId();
  }, [sessionId]);
  // useEffect(() => {
  //   const fetchMealSessions = () => {
  //     fetchAllMealSessionBySessionId();
  //     setTimeout(fetchMealSessions, 30000);
  //   };

  //   fetchMealSessions();
  //   // Clean up the interval when the component unmounts
  //   return () => clearTimeout(fetchMealSessions);
  // }, []);
  useEffect(() => {
    let filteredArray = mealSession;
    if (search) {
      filteredArray = filteredArray?.filter((meal) => {
        const searchNormalize = normalizeString(search);
        const areaNormalize = normalizeString(meal.mealDtoForMealSession?.name);
        return areaNormalize.includes(searchNormalize);
      });
    }
    if (chefValue) {
      filteredArray = filteredArray?.filter((meal) => {
        return meal.kitchenDtoForMealSession.kitchenId === chefValue;
      });
    }
    if (filterStatus) {
      filteredArray = filteredArray?.filter((meal) => {
        return meal.status === filterStatus;
      });
    }
    if (areaValue) {
      filteredArray = filteredArray?.filter((meal) => {
        return meal.areaDtoForMealSession?.areaId === areaValue;
      });
    }
    setNewData(filteredArray);
  }, [search, chefValue, areaValue, sessionId, filterStatus]);
  return (
    <div className="w-full h-full  min-h-[500px] relative">
      <div className={`${mealSession?.length > 0 ? "block" : "hidden"} `}>
        {loading ? (
          <Spin size="large" className=" absolute top-[50%] left-[50%]"></Spin>
        ) : (
          <div>
            <div className="flex flex-col w-full justify-start">
              <div className="w-full flex flex-row justify-start items-center">
                <Input
                  placeholder="Enter meal session name want to find..."
                  className="box__shadow w-full lg:w-[40%] mx-5"
                  // suffix={<TbSearch />}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <Input
                  placeholder="Enter meal session name want to find..."
                  className="box__shadow w-full lg:w-[40%] my-2"
                  suffix={<TbSearch />}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                /> */}

                <Popover
                  className=""
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
              <div className="flex justify-start items-center my-5">
                <div className="w-[20%] mx-5">
                  <Select
                    className="w-full"
                    placeholder="Status Filter"
                    options={[
                      {
                        value: "PROCESSING",
                        label: "Processing",
                      },
                      {
                        value: "APPROVED",
                        label: "Approve",
                      },
                      {
                        value: "MAKING",
                        label: "Making",
                      },
                      {
                        value: "COMPLETED",
                        label: "Complete",
                      },
                      {
                        value: "REJECTED",
                        label: "Reject",
                      },
                      {
                        value: "CANCELLED",
                        label: "Cancel",
                      },
                    ]}
                    onChange={(value) => {
                      setFilterStatus(value);
                    }}
                  ></Select>
                </div>
                <div className="flex justify-start items-center mx-5">
                  <span className="mx-2">All</span>
                  <Checkbox
                    // checked={!selectedRowKeys.length < 1}
                    onClick={(e) => {
                      const mealSessionIds = mealSession
                        .map((item) => {
                          if (
                            item.status === "APPROVED" ||
                            item.status === "PROCESSING" ||
                            item.status === "MAKING"
                          ) {
                            return item.mealSessionId;
                          }
                        })
                        .filter((item) => item !== undefined);

                      if (e.target.checked) {
                        if (mealSessionIds.length > 0) {
                          console.log(
                            "mealsessionIds bên mealsession component",
                            mealSessionIds.map((item) => item)
                          );
                          dispatch(resetMealSessionKey());
                          dispatch(setSelectedMealSessionKey(mealSessionIds));
                        }
                      } else {
                        dispatch(resetMealSessionKey());
                      }
                    }}
                  />
                </div>
                <div
                  className={`${
                    selectedRowKeys.length > 0 ? "flex" : "hidden"
                  }   flex-row justify-around items-center  lg:w-[50%]`}
                >
                  {/* <div className={`font-bold flex flex-row`}>asd</div> */}
                  <div
                    className={`${
                      mealSession?.some((item) => {
                        return item.status === "PROCESSING";
                      })
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <Button
                      className={`
                   bg-gray-400 text-white`}
                      onClick={() => {
                        onHandleChangeMultiMealSessionStatus("CANCELLED");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div
                    className={`${
                      mealSession?.some((item) => {
                        return (
                          item.status === "APPROVED" ||
                          item.status === "CANCELLED" ||
                          item.status === "COMPLETED"
                        );
                      })
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <Button
                      className="bg-green-500 text-white"
                      onClick={() => {
                        onHandleChangeMultiMealSessionStatus("APPROVED");
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                  <div
                    className={`${
                      mealSession?.some((item) => {
                        return (
                          item.status === "APPROVED" ||
                          item.status === "CANCELLED" ||
                          item.status === "COMPLETED"
                        );
                      })
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => {
                        console.log("Chạy hàm reject");
                        onHandleChangeMultiMealSessionStatus("REJECTED");
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" h-full min-h-[500px] w-full flex flex-col justify-around relative">
              <div className="w-full absolute top-0 h-full">
                <div className="w-full grid grid-cols-1 gap-5  md:grid-cols-2 lg:grid-cols-3 ">
                  {newData?.map((meal, index) => (
                    <MealSessionCard meal={meal} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    // <div className="min-h-[500px] w-full flex flex-row ">
    //   {loading ? (
    //     <div className="w-[70vw] min-h-[500px] flex justify-center items-center ">
    //       <Spin tip="Loading" size="large" />
    //     </div>
    //   ) : (

    //   )}
    // </div>
  );
};

export default MealSessionComponent;
