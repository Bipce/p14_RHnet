import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData } from "../models/form/IData.ts";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/data",
  }),
  endpoints: (builder) => ({
    getEmployeeList: builder.query<IData[], void>({
      query: () => "employees.json",
    }),
  }),
});

export const { useGetEmployeeListQuery } = employeeApi;