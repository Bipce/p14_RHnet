import React, { JSX } from "react";

interface IProps {
  htmlFor: string,
  label: string,
  children: React.ReactNode
}

const FieldWrapper: React.FC<IProps> = ({ htmlFor, label, children }): JSX.Element => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-slate-50">{label}</label>
      {children}
    </div>
  );
};

export default FieldWrapper;