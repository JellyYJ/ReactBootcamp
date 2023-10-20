import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
// import App from "./App";
// import APPcontext from "./APPcontext";
// import APPcontextAdvanced from "./APPcontextAdvanced";
import AppMemo from "./AppMemo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppMemo />
  </React.StrictMode>
);
