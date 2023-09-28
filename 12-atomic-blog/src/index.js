import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
// import App from "./App";
// import Appcontext from "./APPcontext";
import APPcontextAdvanced from "./APPcontextAdvanced";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Appcontext /> */}
    <APPcontextAdvanced />
  </React.StrictMode>
);
