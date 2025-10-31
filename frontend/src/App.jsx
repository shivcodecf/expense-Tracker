import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Signup from "./auth/Signup";

import Login from "./auth/Login";

import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";

const appRouter = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
   { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
