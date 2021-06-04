import store from "store";
export const getFromLocal = () => {
  return store.get("asadToken");
};
export const setToken = (tok) => {
  console.log("in setToken");
  store.set("asadToken", { token: tok });
  console.log("get", getFromLocal());
};
