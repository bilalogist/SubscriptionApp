import React from "react";
import { Modal } from "antd";
const ReactModal = ({
  title,
  visible,
  handleOk,
  loading,
  handleCancel,
  okText,
  children,
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      okText={okText}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );
};

export default ReactModal;
