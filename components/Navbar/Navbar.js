import { Image } from "antd";
import React from "react";
import { appLogoURL } from "../../constants/AppConstants";

const Icon = () => {
  return (
    <Image
      preview={false}
      src={appLogoURL}
      style={{ paddingRight: 1, objectFit: "contain" }}
      width={30}
    />
  );
};
const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Icon />
      <span
        style={{
          marginLeft: 10,
          fontSize: 16,
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        Product Subscription App
      </span>
    </nav>
  );
};
export default Navbar;

// Styling
const styles = {
  nav: {
    height: 50,
    background: "",
    // background: "#096dd9",
    boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
};
