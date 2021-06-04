import { Card, Divider } from "antd";
import React from "react";
import styles from "./CartModeCard.module.css";
import { HiShoppingCart } from "react-icons/hi";
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";
const CartModeCart = ({ selected }) => {
  return (
    <>
      <ConfirmationModal title="HI Modal" />
      <Card style={{ borderRadius: 10 }}>
        <div className={styles.cartMode_Card}>
          <span className={styles.cartMode_heading}>Recurring Cart</span>
          <HiShoppingCart size={70} color="grey" />
          <Divider dashed />
        </div>
      </Card>
    </>
  );
};

export default CartModeCart;
