import { Button } from "antd";
import React from "react";
import { TiTickOutline } from "react-icons/ti";
const CheckIcon = () => (
  <TiTickOutline size={22} style={{ alignSelf: "center" }} />
);
const GroupButton = ({ clicked, value, onClick }) => {
  const commonStyles = {
    width: "120px",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Button
      onClick={onClick}
      style={
        clicked
          ? { ...commonStyles, ...styles.btnChecked }
          : { ...commonStyles, ...styles.btnUnChecked }
      }
    >
      {clicked && <CheckIcon />}
      {value}
    </Button>
  );
};
const styles = {
  btnChecked: {
    backgroundColor: "#09c",
    color: "white",
  },
  btnUnChecked: {
    backgroundColor: "white",
    color: "black",
  },
};
export default GroupButton;
