import React, { JSX } from "react";
import { IFieldBase } from "../../models/form/IFieldData.ts";
import FieldWrapper from "./FieldWrapper.tsx";

interface ISelectData extends IFieldBase {
  data: string[];
}

const SelectField: React.FC<ISelectData> = ({ id, register, htmlFor, label, data }): JSX.Element => {

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <select id={id} {...register}
              className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400">
        {data.map((item, i) => <option key={i} className="bg-slate-900 text-slate-100">{item}</option>)}
      </select>
    </FieldWrapper>
  );
};

export default SelectField;