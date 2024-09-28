import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Pages/Loader";
import NotFound from "../Pages/NotFound";

// Lazy Loading Pages
const AddGroup = lazy(() => import("../Pages/Groups/AddGroup"));
const AddProf = lazy(() => import("../Pages/AddProf"));
const Users = lazy(() => import("../Pages/Users/Users"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));

function AdminPages() {
  return (
    <Routes>
      <Route
        path="AddProf"
        element={
          <Suspense fallback={<Loader />}>
            <AddProf />
          </Suspense>
        }
      />
      <Route
        path="users"
        element={
          <Suspense fallback={<Loader />}>
            <Users />
          </Suspense>
        }
      />

      <Route
        path="AddGroup"
        element={
          <Suspense fallback={<Loader />}>
            <AddGroup />
          </Suspense>
        }
      />
      <Route
        path="Dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AdminPages;
