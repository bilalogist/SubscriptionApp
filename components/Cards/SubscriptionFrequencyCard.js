import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import React, { useState } from "react";

import FrequencyForm from "../forms/FrequencyForm";

const SubscriptionFrequencyCard = ({ item, delItem }) => {
  const [editClicked, setEditClicked] = useState(false);

  return (
    <>
      <FrequencyForm
        object={item}
        onCancel={() => {
          setEditClicked(false);
        }}
        visible={editClicked}
        closeModal={() => {
          setEditClicked(false);
        }}
      />
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {" "}
        <div style={{ flex: 0.9, display: "flex", flexDirection: "column" }}>
          <p style={{ color: "silver", fontSize: 13, fontWeight: "bold" }}>
            {item.name}
          </p>
          <p style={{ fontSize: 14 }}>
            {item.interval === "MONTH"
              ? `${item.intervalCount} month`
              : item.interval === "YEAR"
                ? `${item.intervalCount} Year`
                : `${item.intervalCount} Week`}
          </p>
          <span style={{ fontSize: 14 }}>On the {item.day}</span>
        </div>
        <div
          style={{
            flex: 0.1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <EditOutlined
            onClick={() => setEditClicked(true)}
            style={{ fontSize: 20, color: "royalblue" }}
          />
          <DeleteOutlined
            style={{ fontSize: 20, color: "red" }}
            onClick={() => delItem(item.name)}
          />
        </div>
      </div>
    </>
  );
};

export default SubscriptionFrequencyCard;
