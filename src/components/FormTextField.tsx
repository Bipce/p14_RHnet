import * as React from "react";
import { JSX } from "react";
import { UseFormRegister } from "react-hook-form";

type FormValues = {
  firstName: string,
  lastName: string,
  birthDate: string,
  startDate: string,
  street: string,
  city: string,
  state: string,
  zipCode: number,
  departments: string,
};

interface IProps {
  htmlFor: string,
  label: string,
  type: string,
  id: string,
  register: ReturnType<UseFormRegister<FormValues>>,
}

const FormTextField: React.FC<IProps> = ({ htmlFor, label, id, type, register }): JSX.Element => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-slate-50">{label}</label>
      <input type={type} id={id} {...register}
             className="rounded border-2 border-slate-600 bg-slate-200 px-1 text-slate-950 outline-sky-600" />
    </div>
  );
};

export default FormTextField;