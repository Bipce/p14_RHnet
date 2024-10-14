import React, { JSX, useState } from "react";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../components/Form/InputField.tsx";
import Button from "../components/Button.tsx";
import SelectField from "../components/Form/SelectField.tsx";
import { IFormData } from "../models/form/FormData.ts";
import DateField from "../components/Form/DateField.tsx";

const schema: ZodType<IFormData> = z.object({
  firstName: z.string().min(2, { message: "Should be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Should be at least 2 characters" }),
  birthDate: z.string(),
  // startDate: z.string().min(2),
  street: z.string().min(2, { message: "Should be at least 2 characters" }),
  city: z.string().min(2, { message: "Should be at least 2 characters" }),
  state: z.string().min(2, { message: "Should be at least 2 characters" }),
  zipCode: z.number().min(5, { message: "Should be at least 5 characters" }),
  departments: z.string().min(1),
});

const Home = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: IFormData): void => {
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

        <DateField htmlFor="date-of-birth" label="Date of Birth" type="text" id="date-of-birth"
                   register={register("birthDate")} />
        {/*<InputField htmlFor="start-date" label="Start Date" type="text" id="start-date"*/}
        {/*            register={register("startDate")} />*/}

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