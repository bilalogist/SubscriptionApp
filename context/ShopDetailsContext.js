import React, { createContext, useState } from "react";

const ShopDetailsProviderContext = createContext(undefined);
const ShopDetailsContext = createContext(undefined);
const ShopDetailsProvider = ({ children }) => {
  const [ShopDetails, setShopDetails] = useState({ accessToken: "", shopOrigin: "" });
  return (
    <ShopDetailsContext.Provider value={ShopDetails}>
      <ShopDetailsProviderContext.Provider value={setShopDetails}>
        {children}
      </ShopDetailsProviderContext.Provider>
    </ShopDetailsContext.Provider>
  );
};

export { ShopDetailsProvider, ShopDetailsProviderContext, ShopDetailsContext };
