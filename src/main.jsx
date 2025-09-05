import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx"
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./pages/Feed.jsx";
import Connections from "./pages/Connections.jsx";
import Requests from "./pages/Requests.jsx";
import Signup from "./pages/Signup.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "requests",
        element: <Requests />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
);
