import { useEffect } from "react";
import { getEmployees } from "../service/getPublicData.ts";
import { useAppDispatch, useAppSelector } from "../app/store.ts";
import { selectEmployee, setEmployee } from "../features/employeeSlice.ts";

export const useUpdateEmployees = (): void => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector(selectEmployee);

  useEffect(() => {
    if (employees.length === 0) {
      (async (): Promise<void> => {
        const data = await getEmployees();
        dispatch(setEmployee(data));
      })();
    }
  }, [dispatch, employees]);
};