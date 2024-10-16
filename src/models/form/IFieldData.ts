import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IData } from "./IData.ts";

export interface IFieldData {
  isError?: FieldErrors<IData>,
  errorMsg?: string | undefined,
  label: string,
  htmlFor: string,
  type?: string,
  id: string,
  register: ReturnType<UseFormRegister<IData>>,
}