import DashboardLayout from "../../layouts/DashboardLayout";
import React, { useState, useCallback } from "react";
import {
  Col,
  Divider,
  Row,
  Form,
  Input,
  DatePicker,
  Button,
  Checkbox,
} from "antd";
import style from "./styles.module.css";
// import { ResourcePicker, useAppBridge } from "@shopify/app-bridge-react";
// import { getSessionToken } from "@shopify/app-bridge-utils";
// import { Frame, Page, Toast } from "@shopify/polaris";
import Toast from "../../components/Toast";
import moment from "moment";
const lColProps = {
  sm: 24,
  md: 24,
  lg: 7,
  xs: 24,
};
const rColProps = {
  sm: 24,
  md: 24,
  lg: 17,
  xs: 24,
};
const CreateDiscount = (props) => {
  // const app = useAppBridge();
  const [pickerIsOpen, setPicker] = useState(false);
  const [resources, setResources] = useState([]);
  const [form] = Form.useForm();
  //===
  const [activeToast, setActiveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => {
      return parseInt(product.id.split("Product/")[1]);
    });
    setResources(idsFromResources);
  };

  const dispatchData = async (payLoad) => {
    // const token = await getSessionToken(app);
    const token = 1234;
    const json = JSON.stringify(payLoad);
    const response = await (
      await fetch(
        "https://strong-turtle-14.loca.lt/api/discount/createDiscount",
        {
          method: "POST",
          headers: {
            shopifysessiontoken: token,
            "Content-Type": "application/json",
          },
          body: json,
        }
      )
    ).json();

    if (!response.error) {
      form.resetFields();
      setToastMessage("Discount Added");
      setActiveToast(true);
    } else {
      setToastMessage("Discount could not be added");
      setActiveToast(true);
    }

    console.log(response);
  };

  const sendRequest = async (data) => {
    console.log(Date.now());
    if (data.percentage > 100 || data.percentage < 0) {
      setToastMessage("Please give discount percentage within 1-100");
      setActiveToast(true);
      return;
    }

    if (!moment(data.startDate).isAfter(Date.now())) {
      setToastMessage("Start date could not be in past");
      setActiveToast(true);
      return;
    }
    if (resources.length <= 0) {
      setToastMessage("Please select products");
      setActiveToast(true);
      return;
    }
    const payLoad = {
      shop: props.shopOrigin,
      accessToken: "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",
      title: data.discountCode,
      value: data.percentage,
      products: resources,
      startDate: data.startDate,
    };
    console.log(data);
    dispatchData(payLoad);
  };

  return (
    <DashboardLayout>
      {/* <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={pickerIsOpen}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setPicker(false)}
      /> */}
      <Row>
        <Col span={1}></Col>
        <Col span={21}>
          <Row>
            <Col span={24}>
              <h1 className={style.heading}>Create Discount Codes</h1>
              <p className={style.intro}>
                This is where you create discount codes to work with recurring
                orders.
              </p>
            </Col>
          </Row>
          <Divider />
          <Row gutter={40} align="left">
            <Col {...lColProps} className={style.mb2}>
              <h1 className={style.createDiscountHeading}>
                Create a new discount code!
              </h1>
              <p className={style.discountDescreption}>
                Generally you want to mimic active discount codes you have in
                your Shopify admin, but if you want, you can also create codes
                to just work with recurring orders.
              </p>
              <div className={style.leftBox}>
                <p className={style.notesHead}>
                  Discount codes will work only with prepaid subscriptions
                </p>
                {/* <div className={style.notesContainer}>
                  <p className={style.pointDetail}>
                    <span className={style.pointHead}>Free Shipping codes</span>
                    <br />
                    Will give the customer free shipping on every order during
                    the prepaid period
                  </p>
                  <p className={style.pointDetail}>
                    <span className={style.pointHead}>% off codes</span>
                    <br />
                    Will take a % off the total of all prepaid orders combined.
                  </p>
                  <p className={style.pointDetail}>
                    <span className={style.pointHead}>$ off codes</span>
                    <br />
                    Will take a set amount off of the initial order.
                  </p>
                </div> */}
              </div>
            </Col>
            <Col {...rColProps} className={style.rightCol + " " + style.pb5}>
              <Form
                size={"large"}
                layout="vertical"
                onFinish={(data) => sendRequest(data)}
                form={form}
              >
                <div className={style.card + " " + style.pb5}>
                  <p className={style.pointHead}>Create a New Discount Code</p>
                  <p>
                    Create your discount code, and specify the usage limit. You
                    can also choose whether or not this discount code will only
                    apply to the first purchase, or all future recurring orders.
                  </p>
                  <Form.Item
                    label="Discount Code:"
                    name="discountCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter discount code!",
                        whitespace: false,
                      },
                    ]}
                  >
                    <Input placeholder="e.g AWESOME2021" value="Lets help" />
                  </Form.Item>
                  <Form.Item
                    label="Discount Percentage:"
                    name="percentage"
                    key="%age"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Discount",
                      },
                      {
                        type: "number",
                        min: 1,
                        max: 3,
                        message:
                          "Please enter discount percentage between 0-100",
                      },
                    ]}
                  >
                    <Input placeholder="10%" type="number" max={100} />
                  </Form.Item>
                  <Form.Item
                    label="Start Date:"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: "Date is required.",
                      },
                    ]}
                  >
                    <Input placeholder="10%" type="date" />
                  </Form.Item>
                  <Button
                    onClick={() => {
                      console.log("Called", pickerIsOpen);
                      setPicker(true);
                    }}
                  >
                    Select Products for Discount
                  </Button>
                  <button
                    type="button"
                    class="ro-subscribe-btn"
                    onclick="window.location='https://demo-commersys.myshopify.com/tools/checkout/buy_button/add_to_cart?p=4528450502742&v=31839224102998&g=0&fn=1&ft=2&dp=$96.00&rdp=0.8&rup=9600&bp='"
                  >
                    Subscribe Now!
                  </button>
                </div>

                <Row>
                  <Col>
                    <Button type="submit" htmlType="submit">
                      Submit
                    </Button>
                    <Button>Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Toast
              message={toastMessage}
              active={activeToast}
              setActive={setActiveToast}
            />
          </Row>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default CreateDiscount;
