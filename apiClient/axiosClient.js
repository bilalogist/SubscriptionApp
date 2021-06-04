import axios from "axios";
import cookies from "react-cookies";
import { getFromLocal } from "../util/appUtils";
console.log("in axios client", getFromLocal());
let shopOrigin = "";
const client = axios.create({
  baseURL: `https://${shopOrigin}`,
});
client.interceptors.request.use((config) => {
  console.log(config);
  // Append your request headers with an authenticated token
  config.headers["X-Shopify-Access-Token"] = getFromLocal();
  config.headers["Content-Type"] = "application/json";
  return config;
});
export default client;
// Intercept all requests on this axios instance
