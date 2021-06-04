import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Loader = ({ value = 10 }) => {
  return (
    <div
      style={{
        width: 100,
        height: 100,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      }}
    >
      <CircularProgressbar value={value} text={`${value} %`} />
    </div>
  );
};

export default Loader;
