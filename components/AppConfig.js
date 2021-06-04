import { Provider } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/polaris";
import React, { useContext, useEffect } from "react";
import ClientRouter from "./ClientRouter";
import translations from "@shopify/polaris/locales/en.json";
import MyProvider from "./ApolloClient";
import {
  ShopDetailsContext,
  ShopDetailsProviderContext,
} from "../context/ShopDetailsContext";
import axios from "axios";

const AppConfig = ({
  config,
  Component,
  pageProps,
  shopOrigin,
  otherProps,
}) => {

  const setShopDetails = useContext(ShopDetailsProviderContext);
  const shopDetails = useContext(ShopDetailsContext);

  return (
    <Provider config={config}>
      <ClientRouter />
      <AppProvider i18n={translations} theme={{ colorScheme: "light" }}>
        <MyProvider>
          <Component {...pageProps} shopOrigin={shopOrigin} />
        </MyProvider>
      </AppProvider>
    </Provider>
  );
};

export default AppConfig;
