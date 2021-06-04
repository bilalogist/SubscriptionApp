import { TextField } from "@shopify/polaris";
import React from "react";

const AnnotatedInput = ({ left, label, value, onChange, right }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <div>
        <TextField
          label={label}
          value={value}
          onChange={onChange}
          connectedLeft={
            left && (
              <span
                style={{
                  background: "silver",
                  borderRadius: 10,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  padding: 9,
                  position: "relative",
                  top: 12,
                  right: -1,
                  color: "white",
                }}
              ></span>
            )
          }
          connectedRight={
            <span
              style={{
                background: "silver",
                borderRadius: 10,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                padding: 8.5,
                position: "relative",
                top: 7,
                left: -6,
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {right}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default AnnotatedInput;
