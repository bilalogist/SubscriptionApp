import React, { useEffect, useState } from "react";
import { routes } from "../../routes";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  ClockCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import styles from "./sidebar.module.css";
import Navbar from "../Navbar/Navbar";
import PageFooter from "../Footer/Footer";
import { useRouter } from "next/router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions"
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Sidebar = ({ children, ...props }) => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    setLoading(true);

    let url = router.pathname;

    let a = url.includes("/") && url.length <= 1;
    if (a) {
      setLocation(["/"]);
    } else {
      let broker = url.split("/");
      let newBroker = [broker[1], broker[2]];
      newBroker[0] = "/" + newBroker[0];
      newBroker[1] = "/" + newBroker[1];

      setLocation(newBroker);
    }
    setLoading(false);
  }, []);
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleClick = (url) => {

    // let a = url.includes("/") && url.length <= 1;
    // if (a) {
    //   setLocation(["/"]);
    // } else {
    //   let broker = url.split("/");
    //   let newBroker = [broker[1], broker[2]];
    //   newBroker[0] = "/" + newBroker[0];
    //   newBroker[1] = "/" + newBroker[1];

    //   setLocation(newBroker);
    // }
    let a = url.includes("/") && url.length <= 1;
    if (a) {
      setLocation([routes["dashboard"]]);
    } else {
      let broker = url.split("/");
      let newBroker = [broker[1], broker[2]];
      newBroker[0] = "/" + newBroker[0];
      newBroker[1] = "/" + newBroker[1];
      setLocation(newBroker);
    }
    //router.push(url, undefined, { shallow: true });
    redirect.dispatch(Redirect.Action.APP, url);
    //history.push(url);
  };
  if (loading) return null;
  return (
    <>
      <Navbar />
      <Layout style={{ minHeight: "100vh", marginTop: 1 }}>
        <Sider
          collapsible
          breakpoint="lg"
          collapsedWidth={50}
          collapsed={collapsed}
          onCollapse={toggleSidebar}
          theme="light"
        >
          <Menu
            theme="light"
            defaultSelectedKeys={[location[1] != undefined ? location[1] : "/"]}
            defaultOpenKeys={[location[0]]}
            mode="inline"
          >
            <Menu.Item
              key={routes["dashboard"]}
              className={styles.menu_item}
              onClick={() => {
                handleClick(routes["dashboard"]);
              }}
              icon={<HomeFilled />}
            >
              Dashboard
            </Menu.Item>

            <SubMenu
              key={routes["subscriptions"].url}
              icon={<ClockCircleOutlined />}
              title="Subscriptions"
              className={styles.menu_item}
            >
              <Menu.Item
                className={styles.submenu_items}
                key={routes["subscriptions"].subMenu["subscriptionGroups"]}
                onClick={() => {
                  handleClick(
                    `${routes["subscriptions"].url}${routes["subscriptions"].subMenu["subscriptionGroups"]}`
                  );
                }}
              >
                Subscription Groups
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["subscriptions"].subMenu["mySubs"]}
                onClick={() => {
                  handleClick(
                    `${routes["subscriptions"].url}${routes["subscriptions"].subMenu["mySubs"]}`
                  );
                }}
              >
                Create Subscriptions
              </Menu.Item>

              <Menu.Item
                className={styles.submenu_items}
                key={routes["subscriptions"].subMenu["customers"]}
                onClick={() => {
                  handleClick(
                    `${routes["subscriptions"].url}${routes["subscriptions"].subMenu["customers"]}`
                  );
                }}
              >
                Customers
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["subscriptions"].subMenu["createDiscount"]}
                onClick={() => {
                  handleClick(
                    `${routes["subscriptions"].url}${routes["subscriptions"].subMenu["createDiscount"]}`
                  );
                }}
              >
                Create Discount Code
              </Menu.Item>

              <Menu.Item
                className={styles.submenu_items}
                key={routes["subscriptions"].subMenu["discCodes"]}
                onClick={() => {
                  handleClick(
                    `${routes["subscriptions"].url}${routes["subscriptions"].subMenu["discCodes"]}`
                  );
                }}
              >
                Discount Codes
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["subscriptions"].subMenu["buyBtn"]}
                onClick={() => {
                  handleClick(
                    `${routes["subscriptions"].url}${routes["subscriptions"].subMenu["buyBtn"]}`
                  );
                }}
              >
                Create Buy Button
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key={routes["settings"].url}
              className={styles.menu_item}
              icon={<SettingOutlined />}
              title="Settings"
            >
              <Menu.Item
                className={styles.submenu_items}
                key={routes["settings"].subMenu["general"]}
                onClick={() => {
                  handleClick(
                    `${routes["settings"].url}${routes["settings"].subMenu["general"]}`
                  );
                }}
              >
                General
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["settings"].subMenu["payment_gateway"]}
                onClick={() => {
                  handleClick(
                    `${routes["settings"].url}${routes["settings"].subMenu["payment_gateway"]}`
                  );
                }}
              >
                Payment Gateway
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["settings"].subMenu["taxes"]}
                onClick={() => {
                  handleClick(
                    `${routes["settings"].url}${routes["settings"].subMenu["taxes"]}`
                  );
                }}
              >
                Taxes
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["settings"].subMenu["display_settings"]}
                onClick={() => {
                  handleClick(
                    `${routes["settings"].url}${routes["settings"].subMenu["display_settings"]}`
                  );
                }}
              >
                Display Settings
              </Menu.Item>
              <Menu.Item
                className={styles.submenu_items}
                key={routes["settings"].subMenu["lang_settings"]}
                onClick={() => {
                  handleClick(
                    `${routes["settings"].url}${routes["settings"].subMenu["lang_settings"]}`
                  );
                }}
              >
                Language Settings
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "20px 16px" }}>
            <div
              className={"site-layout-background"}
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <PageFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default Sidebar;
