import { Button, Card, Col, Divider, Row } from "antd";
import React, { useState } from "react";
import { Button as PolarisButton, TextField } from "@shopify/polaris";
import Buttons from "../../components/Button/Button";
import SubscriptionFrequencyCard from "../../components/Cards/SubscriptionFrequencyCard";
import Loader from "../../components/Loader/Loader";
import DashboardLayout from "../../layouts/DashboardLayout";
import FrequencyForm from "../../components/forms/FrequencyForm";
import axios from "axios";
import { useEffect } from "react";

const EditSubscriptions = (props) => {
  // console.log(props.history.location.state);
  const [loading, setLoading] = useState({ loader: false, progress: 0 });
  const [productsSelected, setProductsSelected] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    getSubscriptionById();
  }, []);
  const getSubscriptionById = async () => {
    setLoading({ loader: true, progress: 0 });
    await axios.post(
      "http://localhost:9011/api/subscriptions/get",
      {
        shop: "boxcheck-app-demo.myshopify.com",
        accessToken: "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",
      },
      {
        onDownloadProgress: (e) => {
          console.log(e);
          setLoading({ loader: true, progress: (e.loaded / e.total) * 100 });
        },
      }
    );
    setLoading({ loader: false, progress: 100 });
  };
  return (
    <DashboardLayout>
      {loading.loader ? (
        <Loader value={loading.progress} />
      ) : (
        <div>
          {addForm && (
            <FrequencyForm
              addInArr={(e) => subscriptions.push(e)}
              add={true}
              visible={true}
              onCancel={() => setAddForm(false)}
              closeModal={() => setAddForm(false)}
            />
          )}
          <section>
            <Row gutter={[10, 10]}>
              <Col lg={6} sm={24} md={24}>
                <h2 style={styles.heading}>Subscription information</h2>
                <p style={styles.para}>
                  The name of your subscription group is just for you to see,
                  your customers will not see this name. Your products can only
                  belong to one subscription group at a time.
                </p>
              </Col>
              <Col lg={2} />
              <Col lg={16} md={24} sm={24}>
                <Card style={styles.card}>
                  <TextField
                    value={groupName}
                    onChange={(e) => setGroupName(e)}
                    label="Group name"
                    placeholder="Primary subscription group"
                  />
                  <br />
                  <Button style={styles.btnSelect}>Select Products</Button>
                  <PolarisButton plain>
                    View {productsSelected.length} products
                  </PolarisButton>
                </Card>
              </Col>
            </Row>
          </section>
          <Divider />
          <section>
            <Row gutter={[10, 10]}>
              <Col lg={6} sm={24} md={24}>
                <h2 style={styles.heading}>Subscription Frequency</h2>
                <p style={styles.para}>
                  Specify frequency options for when subscription orders will be
                  generated.These options will be available when your customers
                  subscribe.
                  <br /> You can specify a day of the week or month where orders
                  are generated.Advanced options allow for frequencies to match
                  your fulfillment cycle using cutoff days.
                </p>
              </Col>
              <Col lg={2} />
              <Col lg={16} md={24} sm={24}>
                <Card style={styles.card}>
                  {subscriptions.length === 0 && (
                    <>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "red",
                        }}
                      >
                        No Subscriptions Found
                      </span>
                      <Divider />
                    </>
                  )}
                  {subscriptions.map((value, index) => {
                    return (
                      <div key={index}>
                        <SubscriptionFrequencyCard
                          item={value}
                          delItem={(e) => {
                            setSubscriptions(
                              subscriptions.filter((item) => item.name !== e)
                            );
                          }}
                        />
                        <Divider />
                      </div>
                    );
                  })}

                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={styles.addFreqBtn}
                      onClick={() => setAddForm(true)}
                    >
                      Add Frequency
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>
          <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
            <div style={{ flex: 0.98 }} />
            <div style={{}}>
              <Buttons text="Save Changes" style={{ width: 150 }} />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditSubscriptions;
const styles = {
  heading: {
    fontWeight: "bold",
    fontSize: 20,

    marginBottom: 10,
  },
  para: {
    color: "grey",
    fontSize: 17,
  },
  stepHeading: {
    fontWeight: "bold",
    fontSize: 17,
  },
  stepPara: {
    fontSize: 14,
  },
  btnSelect: {
    borderRadius: 10,
    marginRight: 10,
  },
  card: {
    boxShadow: " 1px 5px 10px 2px #ccc",
    borderRadius: 10,
  },
  addFreqBtn: {
    borderRadius: 10,
    alignSelf: "center",
    textAlign: "center",
    height: 35,
    width: 140,
  },
};
