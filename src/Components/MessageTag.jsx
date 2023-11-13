import React from "react";
import avt from "../assets/images/avatar01.png";
import { toast } from "react-toastify";
const MessageTag = () => {
  const successToast = () => {
    toast.error("Lỗi nè");
  };
  return (
    <div className="h-60 w-52 bg-white absolute top-7 right-2 shadow rounded-lg z-[9999]">
      <h2 className="font-semibold text-center my-2">Notification</h2>
      <div className="noti-list w-full">
        <div className="noti-item flex w-full justify-around items-center hover:bg-slate-200 hover:cursor-pointer">
          <div className=" rounded-full overflow-hidden w-[25%] h-full">
            <img src={avt} alt="" className="w-full h-full" />
          </div>
          <div
            className="w-[60%] flex flex-col justify-center "
            onClick={successToast}
          >
            <h2 className="font-semibold">Tuanung</h2>
            <p className="text-gray-500 text-[9px]  w-full">
              Chào admin! Em muốn rút tiền
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageTag;
