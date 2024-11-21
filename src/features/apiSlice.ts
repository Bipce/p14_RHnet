import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData } from "../models/form/IData.ts";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/data",
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<IData[], void>({
      query: () => "mockEmployees.json",
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApi;