import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { IData } from "../models/form/IData.ts";
import InputField from "../components/Form/InputField.tsx";
import SelectField from "../components/Form/SelectField.tsx";
import DateField from "../components/Form/DateField.tsx";
import Button from "../components/Button.tsx";

const schema: ZodType<IData> = z.object({
  firstName: z.string().min(2, { message: "Should be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Should be at least 2 characters" }),
  street: z.string().min(2, { message: "Should be at least 2 characters" }),
  city: z.string().min(2, { message: "Should be at least 2 characters" }),
  state: z.string().min(2, { message: "Should be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "Should be exactly 5 digits" }).transform(nbr => parseInt(nbr)),
  departments: z.string().min(1),
  birthDate: z.date({ message: "Birth date is required" }).transform(date => format(date, "MM-dd-yyyy")),
  startDate: z.date({ message: "Start date is required" }).transform(date => format(date, "MM-dd-yyyy")),
});

const Home = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IData>({ resolver: zodResolver(schema) });
  const birthDate = watch("birthDate");
  const startDate = watch("startDate");

  const onSubmit = (data: IData): void => {
    try {
      console.log(data, "GOOD");
    } catch (err) {
      console.log(err, "not good");
    }
  };

  const handleDateChange = async (date: Date | null, stringData: keyof IData): Promise<void> => {
    setValue(stringData, date!);
    await trigger(stringData);
  };

  return (
    <>
      <h1 className="mt-3 text-4xl font-bold">HRnet</h1>
      <Link to="/employee-list" className="hover:text-sky-300 hover:underline active:text-sky-400">View Current
        Employees</Link>

      <h3 className="mb-1 mt-6 text-2xl font-bold">Create Employee</h3>

      <form onSubmit={handleSubmit(onSubmit)} id="create-employee" className="flex flex-col">

        <InputField htmlFor="first-name" label="First Name" type="text" id="first-name"
                    register={register("firstName")} isError={errors} errorMsg={errors.firstName?.message} />
        <InputField htmlFor="last-name" label="Last Name" type="text" id="last-name"
                    register={register("lastName")} isError={errors} errorMsg={errors.lastName?.message} />
        <DateField htmlFor="date-of-birth" label="Date of Birth" stringValue="birthDate" watch={() => birthDate as Date}
                   setValue={date => handleDateChange(date, "birthDate")} isError={errors}
                   errorMsg={errors.birthDate?.message} />
        <DateField htmlFor="start-date" label="Start Date" stringValue="startDate" watch={() => startDate as Date}
                   setValue={date => handleDateChange(date, "startDate")} isError={errors}
                   errorMsg={errors.startDate?.message} />

        <fieldset className="rounded border-2 border-slate-200/50 px-6 py-2">
          <legend>Address</legend>

          <InputField htmlFor="street" label="Street" type="text" id="street"
                      register={register("street")} isError={errors} errorMsg={errors.street?.message} />
          <InputField htmlFor="city" label="City" type="text" id="city"
                      register={register("city")} isError={errors} errorMsg={errors.city?.message} />
          <SelectField htmlFor="state" label="State" id="state" register={register("state")} />
          <InputField htmlFor="zipCode" label="Zip Code" type="number" id="zipCode" isError={errors}
                      register={register("zipCode")} errorMsg={errors.zipCode?.message} />
          <SelectField htmlFor="departments" label="Departments" id="departments" register={register("departments")} />
        </fieldset>
        <Button />
      </form>
    </>
  );
};

export default Home;