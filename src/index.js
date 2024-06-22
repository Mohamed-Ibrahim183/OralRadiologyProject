// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import "./index.css";
import "./normalize.css";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
