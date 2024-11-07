import React, { JSX } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";

const Error = (): JSX.Element => {
  const error = useRouteError();

  return (
    <section
      className="flex min-h-screen flex-col items-center justify-center gap-28 bg-slate-900 bg-gradient-to-br from-sky-800 p-4 text-center text-slate-50">
      <div>
        <h2 className="text-9xl">404</h2>
        <p className="text-4xl">{isRouteErrorResponse(error)
          ? "Page not found."
          : "A problem occurred."}</p>
      </div>
      <Link to="/" className="flex gap-2 hover:text-sky-300 hover:underline active:text-sky-400">
        <ArrowLeftCircleIcon className="w-6" /> Back to Home Page</Link>
    </section>
  );
};

export default Error;