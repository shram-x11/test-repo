import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "../shared/api/apolloClient";
import AppRouter from "./router";
import "./index.css";

const App = () => (
  <ApolloProvider client={client}>
      <AppRouter />
  </ApolloProvider>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
