import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@mantine/core/styles.css";
import "./index.css";

import Root from "./routes/Root";
import InfoLomba from "./routes/InfoLomba/_Index";
import Home from "./routes/InfoLomba/Home";
import Detail from "./routes/InfoLomba/Detail";

import { loader as detailLoader } from "./routes/InfoLomba/Detail.loader";
import { loader as homeLoader } from "./routes/InfoLomba/Home.loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/infolomba",
    element: <InfoLomba />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "detail/:competitionId",
        element: <Detail />,
        loader: detailLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
