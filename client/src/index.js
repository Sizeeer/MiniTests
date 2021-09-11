//Core
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { ApolloProvider } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

//Client
import { client } from "./init/client";

//Components
import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
