import { Input, Checkbox, Button, Spin, Select, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { resetAreaKey, setSelectedKey } from "../redux/SelectecedKeySlice";
import { useDispatch, useSelector } from "react-redux";
import AreaCard from "./AreaCard";
import {
  changeStatusSessionArea,
  getAllInformationInSession,
  getSingleArea,
} from "../API/Admin";
import { toast } from "react-toastify";
import { getAllUsers } from "../API/newApi";
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
const AreaComponent = ({ sessionId }) => {
  const dispatch = useDispatch();
  const selectedRowKeys =
    useSelector((state) => state.selectedSlice.areaKeys) || [];
  const refreshed = useSelector((state) => state.mealDrawer.refresh);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);
  const [checkboxCheck, setCheckboxCheck] = useState(["OPEN"]);
  const [newAreaData, setNewAreaData] = useState([]);

  const fetchAllSessionAreaBySessionId = () => {
    setLoading(true);
    // getAllSessionAreaBySessionId(sessionIdValue)
    getAllUsers()
      .then((res) => {
        console.log("Users dummyjson", res.users);
        setNewAreaData(res.users);
        console.log("Goi5 thi2 d9", res.users);

        // setInformation(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const SwitchCaseOffSessionArea = (value) => {
  //   switch (value) {
  //     case "FINISHED":
  //       changeStatusSessionArea(selectedRowKeys?.flat(), value)
  //         .then((res) => {
  //           toast.success("Change Status Session-Area Completed.");
  //           fetchAllSessionAreaBySessionId();
  //         })
  //         .catch(() => {
  //           toast.warning("Can Not Change Session-Area Status!");
  //         });
  //       break;
  //     case "CANCELLED":
  //       changeStatusSessionArea(selectedRowKeys?.flat(), value)
  //         .then((res) => {
  //           toast.success("Change Status Session-Area Completed.");
  //           fetchAllSessionAreaBySessionId();
  //         })
  //         .catch(() => {
  //           toast.warning("Can Not Change Session-Area Status!");
  //         });
  //       break;
  //     default:
  //       break;
  //   }
  // };
  const onChange = (list) => {
    setCheckboxCheck(list);
  };
  useEffect(() => {
    fetchAllSessionAreaBySessionId();
  }, []);
  useEffect(() => {
    dispatch(resetAreaKey());
  }, []);
  useEffect(() => {
    // Replace this with your array of areaIDs
    // Use map to create an array of promises
    // let promises = selectedRowKeys
    //   .flat()
    //   .map((areaID) => getSingleArea(areaID));
    // // Use Promise.all to wait for all promises to resolve
    // Promise.all(promises)
    //   .then((results) => {
    //     console.log(results); // Array of areas corresponding to areaIDs
    //   })
    //   .catch((error) => {
    //     console.error(error); // Handle any errors that occurred during the async calls
    //   });
    // console.log(selectedRowKeys.flat());
  }, [selectedRowKeys]);
  // useEffect(() => {
  //   let filteredData = area;
  //   if (search) {
  //     filteredData = filteredData.filter((area) => {
  //       const searchNormalize = normalizeString(search);
  //       const areaNormalize = normalizeString(area.areaName);
  //       return areaNormalize.includes(searchNormalize);
  //     });
  //   }
  //   if (checkboxCheck) {
  //     filteredData = filteredData.filter((area) => {
  //       return checkboxCheck.includes(area.status);
  //     });
  //   }
  //   // setNewAreaData(filteredData);
  // }, [search, checkboxCheck]);
  return (
    <div className="w-full h-full  min-h-[500px] relative ">
      {loading ? (
        <Spin size="large" className=" absolute top-[50%] left-[50%]"></Spin>
      ) : (
        <div>
          <div className={`flex flex-col w-full justify-between `}>
            <div className="w-full lg:w-full flex flex-row justify-between items-center ">
              <Input
                placeholder="Enter area name want to find..."
                className="box__shadow w-full lg:w-[40%] my-2 p-1"
                suffix={<TbSearch size={15} className="p-0" />}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Checkbox.Group
                className="flex flex-row  w-[40%]"
                defaultValue={["OPEN"]}
                onChange={onChange}
                options={[
                  {
                    value: "OPEN",
                    label: "Open",
                  },
                  {
                    value: "FINISHED",
                    label: "Finish",
                  },
                  {
                    value: "CANCELLED",
                    label: "Cancel",
                  },
                ]}
              ></Checkbox.Group>
            </div>
            {/* <div className="w-[70vw] min-h-[500px] flex justify-center items-center ">
                    <Spin tip="Loading" size="large" />
                  </div> */}
            <div
              className={` flex flex-row justify-start items-center  lg:w-[30%]`}
            >
              <div className={`font-bold flex flex-row  justify-start my-5`}>
                <Checkbox
                  // checked={selectedRowKeys.length === area.length}
                  onClick={(e) => {
                    const areaIds = area
                      .map((item) => {
                        if (
                          item.status !== "FINISHED" &&
                          item.status !== "CANCELLED"
                        ) {
                          return item.sessionAreaId;
                        }
                      })
                      .filter((item) => item !== undefined);
                    if (e.target.checked) {
                      console.log(
                        "areaIds bên Area component",
                        areaIds.map((item) => item)
                      );
                      if (areaIds.length > 0) {
                        dispatch(resetAreaKey());
                        console.log("Trước khi gửi đi", areaIds);
                        dispatch(setSelectedKey(areaIds));
                      }
                    } else {
                      dispatch(resetAreaKey());
                    }
                  }}
                />
                <span className="mx-2">All</span>
              </div>
              <div
                className={`${
                  selectedRowKeys?.length > 0 ? "block" : "hidden"
                } flex flex-row gap-2`}
              >
                <div
                  className=""
                  onClick={() => {
                    SwitchCaseOffSessionArea("FINISHED");
                  }}
                >
                  <Button className="bg-green-400 text-white">Finish</Button>
                </div>
                <div
                  className=""
                  onClick={() => {
                    SwitchCaseOffSessionArea("CANCELLED");
                  }}
                >
                  <Button className="bg-gray-400 text-white">Cancel</Button>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <Spin></Spin>
          ) : (
            <div className=" h-full min-h-[800px] w-full flex flex-col justify-around relative">
              <div className="w-full absolute top-0 bottom-0 h-full overflow-auto no-scrollbar">
                <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {newAreaData?.map((branch, index) => (
                    <AreaCard branch={branch} key={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AreaComponent;
