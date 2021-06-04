import React from "react";
import { Table } from "antd";
const ReactTable = ({ columns, data, loading, className }) => {
  return (
    <Table
      key="Table"
      columns={columns}
      dataSource={data}
      bordered
      scroll={{ x: 400 }}
      loading={loading}
      className={className}
    />
  );
};

export default ReactTable;
