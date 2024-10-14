import axios from "axios";
import { IState } from "../models/State.ts";

export const getStates = async (): Promise<IState[]> => {
  const res = await axios.get<IState[]>("/data/states.json");
  return res.data;
};