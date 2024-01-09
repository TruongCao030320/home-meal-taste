import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  changeStatusOfMultiBookingSlot,
  changeStatusOfMultiRegisterForMeal,
} from "../API/Admin";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { refresh } from "../redux/ToggleDrawerMealSlice.js";

const ConfirmModal = ({ isModalOpen, type, message, array }) => {
  const dispatch = useDispatch();
  // console.log("ismodalopen lấy đcn là", isModalOpen, array);
  const [modalOpen, setModalOpen] = useState(isModalOpen);

  const updateMultiBookingSlotStatus = () => {
    changeStatusOfMultiBookingSlot(array)
      .then((res) => {
        setModalOpen(false);
        dispatch(refresh());
        toast.success("Change Booking Time Status Completed.");
      })
      .catch((error) => {
        toast.error("Loi64");
        console.log(error);
      });
  };
  const updateMultiStatusRegisterForMeal = () => {
    changeStatusOfMultiRegisterForMeal(array)
      .then((res) => {
        setModalOpen(false);
        dispatch(refresh());
        toast.success("Change Register For Meal Status Completed.");
      })
      .catch((error) => {
        toast.error("Loi64");
        console.log(error);
      });
  };
  const onHandleOffModal = () => {
    setModalOpen(false);
    dispatch(refresh());
  };
  const onHandleOk = () => {
    if (type == 2) {
      updateMultiBookingSlotStatus();
    } else {
      updateMultiStatusRegisterForMeal();
    }
  };
  useEffect(() => {
    setModalOpen(isModalOpen);
  }, [isModalOpen]);
  return (
    <div>
      <Modal
        open={modalOpen}
        title="Confirm"
        onOk={onHandleOk}
        onCancel={() => onHandleOffModal()}
      >
        {type == 2
          ? "Want To Modified Booking Order Status"
          : "Want To Modified Register For Meal Status?"}
      </Modal>
    </div>
  );
};

export default ConfirmModal;
