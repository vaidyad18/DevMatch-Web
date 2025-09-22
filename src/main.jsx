import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./pages/Feed.jsx";
import Connections from "./pages/Connections.jsx";
import Signup from "./pages/Signup.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/Terms&Conditions.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import MeetDev from "./pages/MeetDev.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Memberships from "./pages/Memberships.jsx";
import Chat from "./pages/Chat.jsx";

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
        path: "meet-dev",
        element: <MeetDev />,
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
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-&-conditions",
        element: <TermsConditions />,
      },
      {
        path: "cancellation-&-refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "memberships",
        element: <Memberships />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "chat/:targetUserId",
        element: <Chat />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </ThemeProvider>
);
