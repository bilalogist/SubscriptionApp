import {
  Button,
  Card,
  DataTable,
  Select,
  Tabs,
  TextField,
} from "@shopify/polaris";
import { Row, Col, Divider, Tag } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Buttons from "../../components/Button/Button";
import ReactTable from "../../components/Table/Table";
import DashboardLayout from "../../layouts/DashboardLayout";
import { RiDeleteBin7Line } from "react-icons/ri";
const DiscountCodes = () => {
  const [tableRows, setTableRows] = useState([]);
  const [selected, setSelected] = useState(0);
  const [discType, setDiscType] = useState("all");
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  useEffect(() => {
    //search all discounts

    const getData = async () => {
      const data = await (
        await fetch(
          "https://soft-wolverine-33.loca.lt/api/discount/getDiscount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              origin: "*",
            },
            body: JSON.stringify({
              accessToken: "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",
              shop: "mobileogy.myshopify.com",
            }),
          }
        )
      ).json();

      console.log(data);
      if (data) setTableRows(data.data.discounts);
      return data;
    };

    const data = getData();
  }, []);
  const searchActiveDiscounts = () => {
    //search ActiveDiscounts
  };
  const searchInActiveDiscounts = () => {
    // search InActive Discounts
  };
  const searchDeletedDiscounts = () => {
    // search Deleted Discounts
  };

  const handleChangeDiscType = (e) => {
    console.log("e is", e);
    setDiscType(e);
  };
  const handleClickDisable = (id) => {
    console.log(id);
  };
  const handleClickDel = () => {};
  let columns = [
    {
      title: "Discount Code",
      dataIndex: "code",
      key: "code",
      responsive: ["md", "lg", "sm"],

      // render: text => <a>{text}</a>,
    },

    {
      title: "Starts At",
      dataIndex: "starts_at",
      key: "price_rule.starts_at",
      responsive: ["md", "lg", "sm"],
      render: (date) => {
        if (date) {
          const d = new Date(date);
          const day = d.getDate();
          const year = d.getFullYear();
          const month = d.getMonth() + 1;
          return day + "/" + month + "/" + year;
        }
      },
    },
    {
      title: "Ends At",
      dataIndex: "ends_at",
      key: "price_rule.ends_at",
      responsive: ["md", "lg", "sm"],
      render: (date) => {
        if (date) {
          const d = new Date(date);
          const day = d.getDate();
          const year = d.getFullYear();
          const month = d.getMonth() + 1;
          return day + "/" + month + "/" + year;
        } else return "-";
      },
    },
    ,
    // {
    //   title: "Applicable Product Ids",
    //   dataIndex: "entitled_product_ids",
    //   key: "price_rule.starts_at",
    //   responsive: ["md", "lg", "sm"],
    //   render: (products) => (
    //     <>
    //       {products.map((product, index) => {
    //         let color = index % 2 == 0 > 5 ? "lightblue" : "green";
    //         return (
    //           <Tag color={color} key={product}>
    //             {product}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Delete",
      dataIndex: "action",
      key: "actions",
      render: (text, record) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={handleClickDisable}>Disable</Button>
            <Button onClick={handleClickDel}>
              <RiDeleteBin7Line size={15} />
            </Button>
          </div>
        );
      },
      responsive: ["md", "lg", "sm"],
    },
  ];
  let rows = [{ key: 1, discCode: "testcode" }];
  let discTypes = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Standard",
      value: "standard",
    },
    {
      label: "Cancellation",
      value: "cancellation",
    },
    {
      label: "Bulk Groups",
      value: "bulkGroups",
    },
  ];
  const tabs = [
    {
      id: "all-discounts",
      content: "All Discount Codes",
      accessibilityLabel: "All discount Codes",
      panelID: "all-discount-codes",
    },
    {
      id: "active-discounts",
      content: "Active",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "inactive-discounts",
      content: "Inactive",
      panelID: "repeat-customers-content-1",
    },
    {
      id: "deleted-discounts",
      content: "Deleted",
      panelID: "prospects-content-1",
    },
  ];
  return (
    <DashboardLayout>
      <section>
        <Row>
          <Col lg={20} sm={24} md={15}>
            <h2 style={styles.heading}>Discount Codes</h2>
            <p style={styles.para}>
              Discount codes created in your Shopify admin don't automatically
              carry over to this app. If you'd like a discount code to also work
              on your subscription orders you need to create it here with the
              exact same code and discount amount as the one in your Shopify
              admin.
            </p>
          </Col>
          <Col lg={2} />
          <Col lg={2} md={10} sm={24}>
            <Buttons text="Add Discount Code" />
          </Col>
        </Row>
      </section>
      <Divider />
      <section>
        <Card>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <Card.Section>
              <Row style={styles.spacing}>
                <Col
                  sm={24}
                  md={10}
                  lg={11}
                  style={{ marginRight: 10, minWidth: 200 }}
                >
                  <Select
                    label="Discount Type"
                    value={discType}
                    onChange={handleChangeDiscType}
                    options={discTypes}
                  />
                </Col>
                <Col sm={24} md={10} lg={11} style={{ minWidth: 200 }}>
                  <TextField
                    label="Search by discount code"
                    connectedRight={<Button>Search</Button>}
                  />
                </Col>
              </Row>
              <div style={styles.spacing} />
              <Row style={{ padding: 10 }}>
                <Col sm={24} lg={24} xs={24} md={24}>
                  {" "}
                  <ReactTable columns={columns} data={tableRows} />
                </Col>
              </Row>
            </Card.Section>
          </Tabs>
        </Card>
      </section>
    </DashboardLayout>
  );
};

export default DiscountCodes;
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
  spacing: {
    marginTop: 20,
  },
};
