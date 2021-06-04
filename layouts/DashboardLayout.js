import React from "react";
import SideBar from "../components/Sidebar/SideBar";

const DashboardLayout = ({ children }) => {
  return <SideBar>{children}</SideBar>;
};
export default DashboardLayout;
