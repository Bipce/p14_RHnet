import * as React from "react";
import { JSX } from "react";
import { IFormFieldData } from "../../models/form/FormFieldData.ts";
import FieldWrapper from "./FieldWrapper.tsx";

const InputField: React.FC<IFormFieldData> = ({ id, type, register, htmlFor, label }): JSX.Element => {
  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <input type={type} id={id} {...register}
             className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-sky-600" />
    </FieldWrapper>
  );
};

export default InputField;