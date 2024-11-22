import { useEffect, useState } from "react";
import { getEmployees } from "../service/getPublicData.ts";
import { useAppDispatch, useAppSelector } from "../app/store.ts";
import { selectEmployee, setEmployee } from "../features/employeeSlice.ts";

export const useUpdateEmployees = (): boolean => {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector(selectEmployee);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (employees.length == 0) {
        (async (): Promise<void> => {
          const data = await getEmployees();
          dispatch(setEmployee(data));
        })();
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, employees]);

  return isLoading;
};