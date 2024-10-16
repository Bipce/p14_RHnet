import React, { JSX } from "react";
import { IFieldData } from "../../models/form/IFieldData.ts";
import FieldWrapper from "./FieldWrapper.tsx";

const InputField: React.FC<IFieldData> = ({ id, type, register, htmlFor, label, isError, errorMsg }): JSX.Element => {

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <input type={type} id={id} {...register}
             className={`rounded border-2 bg-slate-900 px-1 text-slate-100 outline-none ${errorMsg
               ? "border-red-600" : "border-slate-600 focus:border-sky-400"}`} />
      {isError && <span className="px-1 text-sm text-red-200">{errorMsg}</span>}
    </FieldWrapper>
  );
};

export default InputField;