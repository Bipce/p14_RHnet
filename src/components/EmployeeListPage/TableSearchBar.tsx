import React, { JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  register: UseFormRegisterReturn<string>;
}

const TableSearchBar: React.FC<IProps> = ({ register }): JSX.Element => {
  return (
    <div className="flex gap-1">
      <label htmlFor="search" aria-label="Search bar">Search:</label>
      <input type="text" id="search" {...register}
             className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400" />
    </div>
  );
};

export default TableSearchBar;