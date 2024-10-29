import React, { JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  register: UseFormRegisterReturn<"userSearch">;
}

const InputSearch: React.FC<IProps> = ({ register }): JSX.Element => {
  return (
    <div className="ml-auto flex gap-1">
      <label>Search:</label>
      <input type="text" id="search" {...register}
             className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400" />
    </div>
  );
};

export default InputSearch;