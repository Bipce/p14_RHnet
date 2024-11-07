import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { employeeApi } from "../features/apiSlice.ts";

export const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(employeeApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();