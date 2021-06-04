import { Col, Divider, Row } from "antd";
import React from "react";
import CartModeCard from "../../components/Cards/CartModeCard/CartModeCard";
import DashboardLayout from "../../layouts/DashboardLayout";

const CartMode = () => {
  return (
    <DashboardLayout>
      <section>
        <Row>
          <Col lg={20} sm={24} md={15}>
            <h2 style={styles.heading}>Recurring Cart Settings</h2>
            <p style={styles.para}>
              Everything in your store can be purchased in a recurring fashion.
              The recurring options will appear on the cart page for the
              customer to select. Below you can choose which intervals you would
              like to offer and set a percentage discount if auto-replenishment
              is selected. Product Swap will not be an option in Recurring Cart
              mode. The option to swap will be hidden in the 'Manage
              Subscription' page. Customers can still add and delete products
              from their subscriptions.
            </p>
          </Col>
        </Row>
      </section>
      <Divider />
      <Row>
        <Col>
          <CartModeCard />
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default CartMode;
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
  },
};
