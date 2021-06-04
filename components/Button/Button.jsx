import React from "react";
import { Button } from "antd";
const Buttons = ({ color, loading, text, style, ...props }) => {
  return (
    <Button
      loading={loading}
      type="primary"
      style={{
        borderRadius: 10,
        height: 45,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        ...style,
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default Buttons;
