import * as ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './Home/Home.jsx'
import React from "react";
import LinkEditor from "./Home/components/LinkEditor/LinkEditor.jsx";
import ProfileEditor from "./Home/components/ProfileEditor/ProfileEditor.jsx";
import Preview from "./Home/components/Preview/Preview.jsx";
import { AppProvider } from "./context/AppContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Navigate to="link-editor" />
      },
      {
        path: "link-editor",
        element: <LinkEditor />,
      },
      {
        path: "profile-editor",
        element: <ProfileEditor />,
      }
    ],
  },
  {
    path: "/preview",
    element: <Preview />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
