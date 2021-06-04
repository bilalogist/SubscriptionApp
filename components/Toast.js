import { Frame, Toast } from "@shopify/polaris";
import React, { useCallback } from "react";

const ToastMarkup = (props) => {
  const toggleActive = useCallback(
    () => props.setActive((active) => !active),
    []
  );

  return props.active ? (
    <Toast content={props.message} onDismiss={toggleActive} />
  ) : (
      ""
    );
};
export default ToastMarkup;
