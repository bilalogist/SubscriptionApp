import DashboardLayout from "../../layouts/DashboardLayout";
import { Row, Col, Divider, Switch, Popconfirm } from "antd";
import { Button, Card } from "@shopify/polaris";
import Buttons from "../../components/Button/Button";
import ReactTable from "../../components/Table/Table";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { css } from "@emotion/css";
import React, { useState, useEffect } from "react";
import Toast from '../../components/Toast';
import Axios from 'axios'
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import cookies from "react-cookies"
import { useContext } from "react";
import { ShopDetailsContext } from "../../context/ShopDetailsContext";
const SubscriptionGroups = ({ shopOrigin }) => {
  console.log("Inside")
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const shopDetails = useContext(ShopDetailsContext)
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleClickDisable = (record) => {
    console.log(record);
  };
  const handleClickDel = async (record) => {
    setLoading(true);
    try {
      const response = await Axios.delete("http://localhost:7089/api/subscriptions/delete", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          shop: cookies.load("shopOrigin"),
          accessToken: cookies.load("accessToken"),
          id: record.node.id,
        },
      })

      console.log("The response is: ", response);

      let tempData = [...data];
      tempData = tempData.filter((data) => {
        return data.node.id !== record.node.id;
      });
      setData(tempData);
      setActiveToast(true);
      setToastMessage("Deleted")

    } catch (err) {
      console.log("[Error occured]", err);
      setActiveToast(true);
      setToastMessage("Error couldn't delete")
    }

    setLoading(false);
  };
  const handleSwitchChange = (record) => {
    console.log(record);
  };

  let columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return <Switch
          key={record.node.id + "status"}
          onChange={() => handleSwitchChange(record)}
          defaultChecked={true}
        />
      },
    },
    {
      title: "Name",
      dataIndex: ["node", "name"],
      key: "nodeName",
      responsive: ["md", "lg", "sm"],
    },
    {
      title: "Products Variants Count",
      dataIndex: ["node", "productVariantCount"],
      key: "code",
      responsive: ["md", "lg", "sm"],
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <div
            key={record.node.id + "action"}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",

              flexWrap: "wrap",
            }}
          >
            <Popconfirm
              key={record.node.id + "confirm"}
              title="Are you sure to delete this task?"
              onConfirm={() => handleClickDel(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button key={record.node.id + "delete"}>
                <RiDeleteBin7Line size={15} />
              </Button>
            </Popconfirm>
            <Button key={record.node.id + "edit"} onClick={() => {
              redirect.dispatch(Redirect.Action.APP, { url: url, id: 23 });

            }}>
              <FiEdit size={20} color={'white'} />
            </Button>
          </div>
        );
      },
      responsive: ["md", "lg", "sm"],
    },
  ];


  useEffect(() => {
    setLoading(true);
    console.log("Getting he response ");
    const getData = async () => {
      const response = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            shop: shopOrigin,
            accessToken: shopDetails.accessToken,
          }),
        })
      ).json();
      console.log("The response is: ", response);
      setLoading(false);
      setData(response.data);
    };

    getData();
  }, []);

  return (
    <DashboardLayout>
      <section>
        <Row>
          <Col lg={21} sm={24} md={14}>
            <h2 style={styles.heading}>Subscription Groups</h2>
            <p style={styles.para}>
              Create and manage sets of rules one or more products you'd like to
              offer as a subscription.
            </p>
          </Col>
          <Col lg={3} md={10} sm={24}>
            <Buttons text="Create subscription  group" />
          </Col>
        </Row>
      </section>
      <Divider />
      <section>
        <Card>

          <div style={{ paddingTop: "10px" }}>

            <ReactTable
              key="table-subs"
              columns={columns}
              data={data}
              className={tableCss}
              loading={isLoading}
            />
          </div>
        </Card>
      </section>

      <Toast
        message={toastMessage}
        active={activeToast}
        setActive={setActiveToast}
      />

    </DashboardLayout>
  );
};
export default SubscriptionGroups;
const styles = {
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  para: {
    color: "grey",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
  spacing: {
    marginTop: 20,
  },
};
const tableCss = css({
  margin: "40px 40px 80px 40px",
  backgroundColor: "white",

  "& thead > tr > th": {
    textAlign: "center",
    fontWeight: "bold",
  },
  "& tbody > tr > td": {
    textAlign: "center",
  },
});
