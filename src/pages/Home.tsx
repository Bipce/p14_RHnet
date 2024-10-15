import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IData } from "../models/form/IData.ts";
import InputField from "../components/Form/InputField.tsx";
import Button from "../components/Button.tsx";
import SelectField from "../components/Form/SelectField.tsx";
import DateField from "../components/Form/DateField.tsx";

const schema: ZodType<IData> = z.object({
  firstName: z.string().min(2, { message: "Should be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Should be at least 2 characters" }),
  street: z.string().min(2, { message: "Should be at least 2 characters" }),
  city: z.string().min(2, { message: "Should be at least 2 characters" }),
  state: z.string().min(2, { message: "Should be at least 2 characters" }),
  zipCode: z.number().min(5, { message: "Should be at least 5 characters" }),
  departments: z.string().min(1),
  birthDate: z.date({
    required_error: "Birth date is required",
    invalid_type_error: "Please select a valid date",
  }),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Please select a valid date",
  }),
});

const Home = (): JSX.Element => {
  const { register, handleSubmit, setValue, watch } = useForm<IData>({ resolver: zodResolver(schema) });
  const birthDate = watch("birthDate");
  const startDate = watch("startDate");

  const onSubmit = (data: IData): void => {
    try {
      console.log(data, "GOOD");
    } catch (err) {
      console.log(err, "not good");
    }
  };

  return (
    <>
      <h1 className="mt-3 text-4xl font-bold">HRnet</h1>
      <Link to="/employee-list" className="hover:text-sky-300 hover:underline active:text-sky-400">View Current
        Employees</Link>

      <h3 className="mb-1 mt-6 text-2xl font-bold">Create Employee</h3>

      <form onSubmit={handleSubmit(onSubmit)} id="create-employee" className="flex flex-col">
        <InputField htmlFor="first-name" label="First Name" type="text" id="first-name"
                    register={register("firstName")} />
        <InputField htmlFor="last-name" label="Last Name" type="text" id="last-name"
                    register={register("lastName")} />
        <DateField htmlFor="date-of-birth" label="Date of Birth" stringValue="birthDate" watch={() => birthDate}
                   setValue={(date: Date | null) => setValue("birthDate", date!)} />
        <DateField htmlFor="start-date" label="Start Date " stringValue="startDate" watch={() => startDate}
                   setValue={(date: Date | null) => setValue("startDate", date!)} />

        <fieldset className="rounded border-2 border-slate-200/50 px-6 py-2">
          <legend>Address</legend>

          <InputField htmlFor="street" label="Street" type="text" id="street"
                      register={register("street")} />
          <InputField htmlFor="city" label="City" type="text" id="city"
                      register={register("city")} />
          <SelectField htmlFor="state" label="State" id="state" register={register("state")} />
          <InputField htmlFor="zipCode" label="Zip Code" type="number" id="zipCode"
                      register={register("zipCode", { valueAsNumber: true })} />
          <SelectField htmlFor="departments" label="Departments" id="departments" register={register("departments")} />
        </fieldset>
        <Button />
      </form>
    </>
  );
};

export default Home;