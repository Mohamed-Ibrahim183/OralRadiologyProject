import React, { Suspense, lazy, useContext, useReducer } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Root from "./Root";
import Home from "./Pages/Home/Home";
import Login3 from "./Pages/Login3/Login3";
import NotFound from "./Pages/NotFound";
import { ContextData } from "./ContextData";

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
    case "navigateTo":
      action.payload.navigate(action.payload.path);
      return state; // Return current state after navigation
    default:
      console.log("action:", action);
      throw new Error("Unknown action");
  }
}
function App() {
  const [mode, setMode] = React.useState(true); // Placeholder for mode state

  const navigate = useNavigate(); // Get navigate function from react-router-dom
  const [state, dispatch] = useReducer(reducer, initialState);
  const userType = state.currentUser.Type || "student";

  return (
    <ContextData.Provider
      value={{
        mode,
        setMode,
        state,
        dispatch,
      }}
    >
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<Root />}>
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="Login3"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Login3 />
                  </Suspense>
                }
              />
              {userType === "student" && (
                <Route
                  path="/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <StudentPages />
                    </Suspense>
                  }
                />
              )}
              {userType === "admin" && (
                <Route
                  path="/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <AdminPages />
                    </Suspense>
                  }
                />
              )}
              {userType === "professor" && (
                <Route
                  path="/*"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <ProfessorPages />
                    </Suspense>
                  }
                />
              )}
              <Route
                path="Profile"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Profile />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
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
