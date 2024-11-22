import React, { JSX } from "react";
import { IFieldBase } from "../../models/form/IFieldData.ts";
import { FieldErrors } from "react-hook-form";
import { IData } from "../../models/form/IData.ts";
import FieldWrapper from "./FieldWrapper.tsx";

interface IInputData extends IFieldBase {
  type?: string,
  isError?: FieldErrors<IData>,
  errorMsg?: string | undefined,
}

const InputField: React.FC<IInputData> = ({ id, type, register, htmlFor, label, isError, errorMsg }): JSX.Element => {

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