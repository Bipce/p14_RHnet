import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home.tsx";
import EmployeeList from "./pages/EmployeeList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Home /> },
      { path: "employee-list", element: <EmployeeList /> },
    ],
  },
]);

export default router;