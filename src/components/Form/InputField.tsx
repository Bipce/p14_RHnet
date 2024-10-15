import React, { JSX } from "react";
import { IFieldData } from "../../models/form/IFieldData.ts";
import FieldWrapper from "./FieldWrapper.tsx";

const InputField: React.FC<IFieldData> = ({ id, type, register, htmlFor, label }): JSX.Element => {
  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <input type={type} id={id} {...register}
             className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-sky-600" />
    </FieldWrapper>
  );
};

export default InputField;