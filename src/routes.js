import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Snippet from "./views/Snippet";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/snippet" />
  },
  {
    path: "/snippet",
    layout: DefaultLayout,
    component: Snippet
  },
];

