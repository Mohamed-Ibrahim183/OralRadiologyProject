import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./Routers";
import "./index.css";
import "./normalize.css";
import { createRoot } from "react-dom/client";
const router = createBrowserRouter(routes);

// ReactDOM.render(
//   <React.StrictMode>
//     <RouterProvider router={router}></RouterProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
