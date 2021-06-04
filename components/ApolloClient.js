import { Context } from "@shopify/app-bridge-react";
import ApolloClient from "apollo-boost";
import React from "react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { ApolloProvider } from "@apollo/react-common";
import { Redirect } from "@shopify/app-bridge/actions";
function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
class MyProvider extends React.Component {
  static contextType = Context;

  render() {
    const app = this.context;

    const client = new ApolloClient({
      fetch: userLoggedInFetch(app),
      fetchOptions: {
        credentials: "include",
      },
    });

    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}
export default MyProvider;
