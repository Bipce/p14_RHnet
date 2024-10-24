import axios from "axios";
import { IState } from "../models/form/publicData/IState.ts";
import { IWorkDepartment } from "../models/form/publicData/IWorkDepartment.ts";
import { ITableHeaderCell } from "../models/form/publicData/ITableHeaderCell.ts";

export const getPublicData = async (): Promise<IState[]> => {
  const res = await axios.get<IState[]>("/data/states.json");
  return res.data;
};

export const getWorkDepartments = async (): Promise<IWorkDepartment[]> => {
  const res = await axios.get<IWorkDepartment[]>("/data/workDepartments.json");
  return res.data;
};

export const getTableHeaderCells = async (): Promise<ITableHeaderCell[]> => {
  const res = await axios.get<ITableHeaderCell[]>("/data/tableHeaderCells.json");
  return res.data;
};