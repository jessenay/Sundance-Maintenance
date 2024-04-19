import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import LiftDetails from "./pages/LiftDetails";
import Annual from "./pages/Annual";
import Bullwheels from "./pages/Bullwheels";
import AuxillaryMotor from "./pages/AuxillaryMotor";
import ElectricMotor from "./pages/ElectricMotor";
import Chairs from "./pages/Chairs";
// import Error from "./pages/Error";
import LoginForm from "./pages/LoginForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "lift/:liftName",
        element: <LiftDetails />,
        children: [
          {
            path: "annual",
            element: <Annual />,
          },
          {
            path: "bullwheels",
            element: <Bullwheels />,
          },
          {
            path: "auxillaryMotor",
            element: <AuxillaryMotor />,
          },
          {
            path: "electricMotor",
            element: <ElectricMotor />,
          },
          {
            path: "chairs",
            element: <Chairs />,
          },

        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
