import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import EmployeeList from "./pages/EmployeeList.tsx";
import Layout from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "employee-list", element: <EmployeeList /> },
    ],
  },
]);

export default router;