import { UseFormRegister } from "react-hook-form";
import { IData } from "./IData.ts";

export interface IFieldBase {
  label: string,
  htmlFor: string,
  id: string,
  register: ReturnType<UseFormRegister<IData>>,
}