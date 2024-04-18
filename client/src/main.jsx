import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import Outlaw from "./pages/Outlaw";
import Jakes from "./pages/Jakes";
import Wildwood from "./pages/Wildwood";
import Flathead from "./pages/Flathead";
import Reds from "./pages/Reds";
import Stairway from "./pages/Stairway";
import Annual from "./pages/Annual";
import Bullwheels from "./pages/Bullwheels";
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
        path: "/outlaw",
        element: <Outlaw />,
      },
      {
        path: "/jakes",
        element: <Jakes />,
      },
      {
        path: "/wildwood",
        element: <Wildwood />,
      },
      {
        path: "/flathead",
        element: <Flathead />,
      },
      {
        path: "/reds",
        element: <Reds />,
      },
      {
        path: "/stairway",
        element: <Stairway />,
      },
      {
        path: "/outlawAnnual",
        element: <Annual />
      },
      {
        path: "/bullwheels",
        element: <Bullwheels />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
