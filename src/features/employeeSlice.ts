import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../models/form/IData.ts";
import { RootState, store } from "../app/store.ts";

interface IEmployeeState {
  employees: IData[];
}

const initialState: IEmployeeState = {
  employees: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployee(state, action: PayloadAction<IData>) {
      state.employees.push(action.payload);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const { setEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
export const selectEmployee = (state: RootState): IEmployeeState => state.employee;