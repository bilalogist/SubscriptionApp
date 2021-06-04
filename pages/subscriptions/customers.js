import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Row, Col, Card } from "antd";
import Buttons from "../../components/Button/Button";
import { Button, Select, TextField } from "@shopify/polaris";
const Customers = ({ shopOrigin }) => {
  const DisplayOrder = ({ money, text }) => (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span style={styles.money}>{money}</span>
      <p style={styles.OrderDesc}>{text}</p>
    </div>
  );
  let custStatus = [
    { label: "All Subscribers", value: "all" },
    { label: "Active Subscribers", value: "active" },
    { label: "Inactive Subscribers", value: "inactive" },
  ];
  let subsStatus = [
    { label: "All Subscriptions", value: "all" },
    { label: "Active Subscriptions", value: "active" },
    { label: "Paused Subscribers", value: "paused" },
  ];
  return (
    <DashboardLayout>
      <section>
        <Row>
          <Col lg={20} sm={24} md={15}>
            <h2 style={styles.heading}>Customers</h2>
            <p style={styles.para}>
              Here's a list of all your customers with recurring subscription
              orders. Click the Edit button to view and edit the details of the
              customer or their orders. Your customers can access their order
              management when logged in by going to:
            </p>
            {/* <a
              target="_blank"
              href={`https://${shopOrigin}/tools/checkout`}
            >{`https://${shopOrigin}/tools/checkout`}</a> */}
          </Col>
          <Col lg={2} />
          <Col lg={2} md={10} sm={24}>
            <Buttons text="Export" />
          </Col>
        </Row>
      </section>
      <section style={styles.spacing}>
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            <DisplayOrder
              money={"$0.01"}
              text="Orders scheduled for the next 7 days"
            />
            <DisplayOrder
              money={"$0.01"}
              text="Orders scheduled for the next 30 days"
            />
            <DisplayOrder
              money={"$0.01"}
              text="Orders scheduled for the next 365 days"
            />
          </div>
        </Card>
      </section>
      <section style={styles.spacing}>
        <Card>
          <TextField
            placeholder="E.g. #3578, johndoe@gmail.com, COFFEECLUB"
            label="Search by customer, subscription ID or product"
            connectedRight={<Button>Search</Button>}
          />
          <Row style={styles.spacing}>
            <Col
              sm={24}
              md={10}
              lg={11}
              style={{ marginRight: 10, minWidth: 300 }}
            >
              <Select label="Filter by customer status" options={custStatus} />
            </Col>
            <Col sm={24} md={10} lg={11} style={{ minWidth: 300 }}>
              <Select
                label="Filter by subscription status"
                options={subsStatus}
              />
            </Col>
          </Row>
          <div style={styles.lastDiv}>
            <span
              style={{
                fontWeight: "bolder",
                fontSize: 15,
              }}
            >
              Looks like you don't have any orders yet. Hopefully soon :-)
            </span>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
};

export default Customers;
const styles = {
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  para: {
    color: "grey",
    fontSize: 16,
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  stepHeading: {
    fontWeight: "bold",
    fontSize: 17,
    fontFamily: "Poppins",
  },
  stepPara: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
  money: {
    fontWeight: "bold",
    fontSize: 22,
    fontFamily: "Poppins",
  },
  OrderDesc: {},
  spacing: {
    marginTop: 10,
  },
  row: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",

    flexWrap: "wrap",
  },
  lastDiv: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
