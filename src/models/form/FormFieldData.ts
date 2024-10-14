import { UseFormRegister } from "react-hook-form";
import { IFormData } from "./FormData.ts";

export interface IFormFieldData {
  label: string,
  htmlFor: string,
  type?: string,
  id: string,
  register: ReturnType<UseFormRegister<IFormData>>,
}