import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home";
import LiftDetails from "./pages/LiftDetails";
import Annual from "./pages/Annual";
import Bullwheels from "./pages/Bullwheels";
import AuxillaryMotor from "./pages/AuxillaryMotor";
import ElectricMotor from "./pages/ElectricMotor";
import Chairs from "./pages/Chairs";
import Brakes from "./pages/Brakes";
import EmergencyDrive from "./pages/EmergencyDrive";
import Electrical from "./pages/Electrical";
import HaulRope from "./pages/HaulRope";
import ReturnTerminal from "./pages/ReturnTerminal";
import DriveTerminal from "./pages/DriveTerminal";
import MidTerminal from "./pages/MidTerminal";
import TowersGrid from "./pages/TowersGrid.jsx";
import TowerServices from "./pages/TowerServices.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import WorkOrders from "./pages/WorkOrders.jsx";
import Procedures from "./pages/Procedures.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, // Redirect to login on application start
    errorElement: <div>Error: Page not found</div>, // Simple error component
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "work-orders",
        element: <WorkOrders />,
      },
      {
        path: "lift/:liftId",
        element: <LiftDetails />,
        children: [
          {
            path: "annual/:componentId",
            element: <Annual />,
          },
          {
            path: "bullwheels/:componentId",
            element: <Bullwheels />,
          },
          {
            path: "auxillary-motor/:componentId",
            element: <AuxillaryMotor />,
          },
          {
            path: "electric-motor/:componentId",
            element: <ElectricMotor />,
          },
          {
            path: "chairs/:componentId",
            element: <Chairs />,
          },
          {
            path: "brakes/:componentId",
            element: <Brakes />,
          },
          {
            path: "emergency-drive/:componentId",
            element: <EmergencyDrive />,
          },
          {
            path: "electrical/:componentId",
            element: <Electrical />,
          },
          {
            path: "haul-rope/:componentId",
            element: <HaulRope />,
          },
          {
            path: "return-terminal/:componentId",
            element: <ReturnTerminal />,
          },
          {
            path: "drive-terminal/:componentId",
            element: <DriveTerminal />,
          },
          {
            path: "mid-terminal/:componentId",
            element: <MidTerminal />,
          },
          {
            path: "towers",
            element: <TowersGrid />,
          },
          {
            path: "towers/:towerId",
            element: <TowerServices />,
          },
          {
            path: "procedures/:componentId",
            element: <Procedures />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
