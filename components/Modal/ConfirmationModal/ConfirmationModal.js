import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const ConfirmationModal = ({ title, open, onOk, onCancel, children }) => {
  function confirm() {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Hi",
      okText: "Ok",
      cancelText: "Cancel",
    });
  }
  return (
    <Modal
      title={title}
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Ok"
      cancelText="Cancel"
    >
      {children}
    </Modal>
  );
};

export default ConfirmationModal;
