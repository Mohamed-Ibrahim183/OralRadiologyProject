// import Home from "pages/home/Home";
import Root from "./Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home/Home";
import OverViewAssignmentsPage from "./Pages/OverViewAssignmentsPage";

import AddProf from "./Pages/AddProf";
import Profile from "./Pages/Profile/Profile";

import AssignmentSubmission from "./Pages/assignment_page/Assignment_submission_page";
import GradingPage from "./Pages/Grading_Page/Grading_Page";
import AddGroup from "./Pages/Groups/AddGroup";
import Login3 from "./Pages/Login3/Login3";
import Users from "./Pages/Users/Users";
import Dashboard from "./Pages/Dashboard";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/Login3" element={<Login3 />} />
      <Route path="/Profile" element={<Profile />} />

      <Route path="/Assignments" element={<OverViewAssignmentsPage />} />
      <Route path="/submit" element={<AssignmentSubmission />} />
      <Route path="/Grading_Page" element={<GradingPage />} />

      <Route path="/AddProf" element={<AddProf />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/AddGroup" element={<AddGroup />} />
      <Route path="/Dashboard" element={<Dashboard />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
