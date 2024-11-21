import React, { JSX } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldErrors } from "react-hook-form";
import { IData } from "../../models/form/IData.ts";
import FieldWrapper from "./FieldWrapper.tsx";

interface IProps {
  label: string,
  htmlFor: string,
  stringValue: string,
  setValue: (date: (Date | null)) => void,
  watch: (string: string) => Date,
  isError: FieldErrors<IData>,
  errorMsg: string | undefined,
}

const DateField: React.FC<IProps> = (
  { htmlFor, label, setValue, watch, stringValue, isError, errorMsg }): JSX.Element => {

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <DatePicker selected={watch(stringValue)} onChange={setValue} dateFormat="MM/dd/yyyy"
                  className={errorMsg ? "datepicker-error" : ""} ariaLabelledBy={label} />
      {isError && <span className="px-1 text-sm text-red-200">{errorMsg}</span>}
    </FieldWrapper>
  );
};

export default DateField;