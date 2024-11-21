import React, { JSX } from "react";
import { Outlet } from "react-router-dom";

const Layout = (): JSX.Element => {
  return (
    <div
      className="flex min-h-screen min-w-96 flex-col items-center gap-5 bg-slate-900 bg-gradient-to-br from-sky-800 p-4 text-slate-50">
      <Outlet />
    </div>
  );
};

export default Layout;