import Icon from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
// import weekIcon from "../../assets/icons/week.png";
// import monthIcon from "../../assets/icons/month.png";
// import yearIcon from "../../assets/icons/year.png";
const OrderCard = ({ money, text, category }) => {
  return (
    <div style={styles.mainDiv}>
      {/* <Image
        preview={false}
        src={
          category === "week"
            ? weekIcon
            : category === "month"
            ? monthIcon
            : yearIcon
        }
        style={styles.image}
      /> */}
      <div style={{ flex: 0.75, display: "flex", flexDirection: "column" }}>
        <span style={styles.money}>{money}</span>
        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
};
export default OrderCard;

const styles = {
  mainDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    borderRadius: 10,
    background: "white",
    height: 110,
    width: 250,

    boxShadow: "1px 5px 10px 2px #ccc",
  },
  image: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  money: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Poppins",
  },
  text: {
    color: "grey",
    fontSize: "11pt",
    marginTop: 4,
    fontWeight: "bolder",
    fontFamily: "Poppins",
  },
};
