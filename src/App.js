import React, { Suspense, lazy, useReducer } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import ReactLoading from "react-loading";

import Root from "./Root";
import Home from "./Pages/Home/Home";
import Login3 from "./Pages/Login3/Login3";
import NotFound from "./Pages/NotFound";
import { ContextData } from "./ContextData";
import { Toaster } from "react-hot-toast";

// Lazy load the group components
const AdminPages = lazy(() => import("./Routes/AdminPages"));
const StudentPages = lazy(() => import("./Routes/StudentPages"));
const ProfessorPages = lazy(() => import("./Routes/ProfessorPages"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));

const initialState = {
  currentUser: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, currentUser: action.payload };
    case "logOut":
      return { ...state, currentUser: {} };
    default:
      throw new Error("Unknown action");
  }
}

function Loading() {
  return (
    <div className="loading">
      <ReactLoading
        type="spinningBubbles"
        color="#007bff"
        height={100}
        width={100}
      />
    </div>
  );
}

function App() {
  const [mode, setMode] = React.useState(true); // true => Dark

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextData.Provider
      value={{
        mode,
        setMode,
        state,
        dispatch,
      }}
    >
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<Root />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="Login3"
                element={
                  <Suspense fallback={<Loading />}>
                    <Login3 />
                  </Suspense>
                }
              />
              <Route
                path="student/*"
                element={
                  <Suspense fallback={<Loading />}>
                    <StudentPages />
                  </Suspense>
                }
              />

              <Route
                path="admin/*"
                element={
                  <Suspense fallback={<Loading />}>
                    <AdminPages />
                  </Suspense>
                }
              />

              <Route
                path="professor/*"
                element={
                  <Suspense fallback={<Loading />}>
                    <ProfessorPages />
                  </Suspense>
                }
              />
              <Route
                path="Profile"
                element={
                  <Suspense fallback={<Loading />}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loading />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          )
        )}
      />
    </ContextData.Provider>
  );
}

export default App;
