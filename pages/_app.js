import React from "react";
import App from "next/app";
import Head from "next/head";

import "@shopify/polaris/dist/styles.css";

import { AppName } from "../constants/AppConstants";
import "antd/dist/antd.css";
import { ShopDetailsProvider } from "../context/ShopDetailsContext";

import AppConfig from "../components/AppConfig";
class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;

    const config = {
      apiKey: API_KEY,
      shopOrigin,
      forceRedirect: true,
    };

    return (
      <React.Fragment>
        <Head>
          <title>{AppName}</title>
          <meta charSet="utf-8" />
          <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
          <script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></script>
          <link
            href="https://fonts.googleapis.com/css?family=Poppins"
            rel="stylesheet"
          />
        </Head>
        <ShopDetailsProvider>
          <AppConfig
            Component={Component}
            pageProps={pageProps}
            shopOrigin={shopOrigin}
            config={config}
          />
        </ShopDetailsProvider>
      </React.Fragment>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: ctx.query.shop,
  };
};
export default MyApp;
