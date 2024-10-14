import * as React from "react";
import { JSX, useState } from "react";
import { IFormFieldData } from "../../models/form/FormFieldData.ts";
import FieldWrapper from "./FieldWrapper.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateField: React.FC<IFormFieldData> = ({ htmlFor, label }): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date!)} />
    </FieldWrapper>
  );
};

export default DateField;