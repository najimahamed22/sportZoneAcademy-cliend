import { createBrowserRouter } from "react-router-dom";
import Main from "../Component/Main/Main";
import Home from "../Component/Home/Home";
import Login from "../Component/Login/Login";
import Register from "../Component/Login/Register";
import Dashboard from "../Component/Dashboard/Dashboard";
import ManageUsers from "../Component/Dashboard/ManageUsers";
import AddClasses from "../Component/Dashboard/AddClasses";
import ManageClasses from "../Component/Dashboard/ManageClasses";
import InstructorClasses from "../Component/Dashboard/InstructorClasses";
import Welcome from "../Component/Dashboard/Welcome";
import Classes from "../Component/Classes/Classes";
import Instructors from "../Component/Instructors/Instructors";
import PrivateRoute from "./PrivateRoute";
import MySelectedClasses from "../Component/Dashboard/MySelectedClasses";
import Payment from "../Component/Dashboard/Payment/Payment";
import MyEnrolledClasses from "../Component/Dashboard/MyEnrolledClasses";
import PaymentHistory from "../Component/Dashboard/Payment/PaymentHistory";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import ErrorPage from "../Component/ErrorElement/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <InstructorRoute>
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <InstructorClasses></InstructorClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "",
        element: <Welcome></Welcome>,
      },
      {
        path: "my-selected-classes",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://sport-zone-academy-server.vercel.app/selected-classes/id/${params.id}`
          ),
      },
      {
        path: "my-enrolled-classes",
        element: <MyEnrolledClasses></MyEnrolledClasses>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);
