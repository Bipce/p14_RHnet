import { UseFormRegister } from "react-hook-form";
import { IData } from "./IData.ts";

export interface IFieldData {
  label: string,
  htmlFor: string,
  type?: string,
  id: string,
  register: ReturnType<UseFormRegister<IData>>,
}