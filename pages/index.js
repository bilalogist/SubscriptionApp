import { Col, Divider, Row } from "antd";
import React, { useContext, useEffect } from "react";
import OrderCard from "../components/Cards/OrdersCard";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardRouteCard from "../components/Cards/DashboardRouteCard/DashboardRouteCard";

import { DashboardRouteCardData } from "../data/dashboardRouteCards";

import LineChart from "../components/Charts/LineChart";

const Dashboard = ({ shopOrigin }) => {
  console.log("in dashboard");
  const ColProps = {
    sm: 24,
    md: 7,
    lg: 4,
    xs: 24,
  };
  const ColPropsRoutes = {
    sm: { span: 24, offset: 1 },
    md: { span: 11, offset: 1 },
    lg: 4,
    xs: 24,
  };
  const UpperContent = () => (
    <Row
      justify="center"
      align="center"
      gutter={[1, 0]}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Col {...ColProps} style={styles.upperCol}>
        <OrderCard
          category="week"
          money={"$1.01"}
          text="Orders scheduled for the next 7 days"
        />
      </Col>
      <Col {...ColProps} style={styles.upperCol}>
        {" "}
        <OrderCard
          category="month"
          money={"$1.01"}
          text="Orders scheduled for the next 30 days"
        />
      </Col>
      <Col {...ColProps} style={styles.upperCol}>
        {" "}
        <OrderCard
          category="year"
          money={"$1.01"}
          text="Orders scheduled for the next 365 days"
        />
      </Col>

      <Col
        style={{
          display: "flex",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LineChart
          xAxisTitle="Years"
          yAxisTitle="Number of Subscribers"
          width={500}
          graphTitle={"Subscriber Trend"}
          xAxisDataArray={[
            1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
          ]}
          yAxisDataArray={[30, 40, 45, 50, 49, 60, 70, 91]}
        />
      </Col>
    </Row>
  );
  const LowerContent = () => (
    <Row
      gutter={[1, 0]}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {DashboardRouteCardData.map((v, i) => {
        return (
          <Col
            {...ColPropsRoutes}
            key={i}
            style={{
              alignItems: "center",
              display: "flex",
              height: 140,
              justifyContent: "center",
              minWidth: 300,
              maxWidth: 350,
              flexDirection: "column",
            }}
          >
            <DashboardRouteCard
              icon={v.icon}
              description={v.description}
              heading={v.heading}
            />
          </Col>
        );
      })}
    </Row>
  );
  useEffect(() => {
    //setShopDetails({ ...ShopDetails, shopOrigin });
  }, []);
  return (
    <DashboardLayout>
      <UpperContent />
      <Divider />

      <LowerContent />
    </DashboardLayout>
  );
};
export default Dashboard;

const styles = {
  upperCol: {
    alignItems: "center",
    display: "flex",
    height: 140,
    justifyContent: "center",
    minWidth: 300,
    flexDirection: "column",
  },
};
