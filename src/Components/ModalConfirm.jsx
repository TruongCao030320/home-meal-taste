import React from "react";
import { useState } from "react";
import { Modal, Button } from "antd";
const ModalConfirm = ({ status }) => {
  const [show, setShow] = useState(status);
  const handleClose = () => {
    setShow(false);
    toast.success("Delete successfully.");
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      {" "}
      <Modal
        show={status}
        onHide={handleClose}
        className="absolute bg-white z-[999] p-10 leading-7 rounded shadow-2xl"
      >
        <Modal.Header closeButton className="">
          <Modal.Title className="flex justify-between">
            Delete Warning!!{" "}
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
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>You really want to delete this record!</Modal.Body>
        <Modal.Footer className="mt-5 flex justify-end ">
          <Button variant="secondary " onClick={handleClose} className="mx-4">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose} className="mx-4">
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
