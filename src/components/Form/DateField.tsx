import React, { JSX } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FieldWrapper from "./FieldWrapper.tsx";

interface IProps {
  label: string,
  htmlFor: string,
  stringValue: string,
  setValue: (date: (Date | null)) => void,
  watch: (string: string) => Date,
}

const DateField: React.FC<IProps> = ({ htmlFor, label, setValue, watch, stringValue }): JSX.Element => {

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <DatePicker selected={watch(stringValue)} onChange={setValue} dateFormat="MM/dd/yyyy" />
    </FieldWrapper>
  );
};

export default DateField;