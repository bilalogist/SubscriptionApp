export const routes = {
  dashboard: "/",
  subscriptions: {
    url: "/subscriptions",
    subMenu: {
      getSubscriptions: "/getSubscriptions",
      mySubs: "/mySubscriptions",
      subscriptionGroups: "/subscriptionGroups",
      editSubscriptions: "/editSubscriptions",
      customers: "/customers",
      discCodes: "/discCodes",
      createDiscount: "/createDiscount",
      cartMode: "/cartMode",
      buyBtn: "/buyBtn",
    },
  },
  settings: {
    url: "/settings",
    subMenu: {
      general: "/general",
      payment_gateway: "/payment_settings",
      taxes: "/taxes",
      display_settings: "/display_settings",
      lang_settings: "/lang_settings",
    },
  },
  reports: {
    url: "/reports",
    subMenu: {
      ReportAnalytics: "/reportAnalytics",
      FailedTransaction: "/failedTransactions",
    },
  },
  tools: {
    url: "/tools",
    subMenu: {
      ExportData: "/export-data",
      ManagePricing: "/manage-pricing",
      ManageDeletedProds: "/manage-deletedproducts",
      InventoryForecast: "/inventory-forecast",
    },
  },
};
