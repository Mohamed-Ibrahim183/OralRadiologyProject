import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AddGroup from "../Pages/Groups/AddGroup";
import AddProf from "../Pages/AddProf";
import Users from "../Pages/Users/Users";
import Dashboard from "../Pages/Dashboard";

// const AddProf = lazy(() => import("./AddProf"));
// const Users = lazy(() => import("./Users/Users"));
// const Dashboard = lazy(() => import("./Dashboard"));

function AdminPages() {
  return (
    <Routes>
      <Route
        path="AddProf"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AddProf />
          </Suspense>
        }
      />
      <Route
        path="users"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        }
      />

      <Route
        path="AddGroup"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AddGroup />
          </Suspense>
        }
      />
      <Route
        path="Dashboard"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AdminPages;
