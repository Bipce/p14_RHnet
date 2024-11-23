import React, { JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Modal } from "@bipce/hrnet_modal_package";
import { IData } from "../models/form/IData.ts";
import { IWorkDepartment } from "../models/form/publicData/IWorkDepartment.ts";
import { IState } from "../models/form/publicData/IState.ts";
import InputField from "../components/Form/InputField.tsx";
import SelectField from "../components/Form/SelectField.tsx";
import DateField from "../components/Form/DateField.tsx";
import Button from "../components/Button.tsx";
import { useAppDispatch } from "../app/store.ts";
import { getPublicData, getWorkDepartments } from "../service/getPublicData.ts";
import { addEmployee } from "../features/employeeSlice.ts";
import { useUpdateEmployees } from "../hooks/useUpdateEmployees.ts";

const schema: ZodType<IData> = z.object({
  firstName: z.string().min(2, { message: "Should be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Should be at least 2 characters" }),
  street: z.string().min(2, { message: "Should be at least 2 characters" }),
  city: z.string().min(2, { message: "Should be at least 2 characters" }),
  state: z.string().min(2, { message: "Should be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "Should be exactly 5 digits" }).transform(nbr => parseInt(nbr)),
  department: z.string().min(1),
  birthDate: z.date({ message: "Birth date is required" }).transform(date => format(date, "MM/dd/yyyy")),
  startDate: z.date({ message: "Start date is required" }).transform(date => format(date, "MM/dd/yyyy")),
});

const Home = (): JSX.Element | null => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IData>({ resolver: zodResolver(schema) });
  const birthDate = watch("birthDate");
  const startDate = watch("startDate");
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [states, setStates] = useState<IState[]>();
  const [workDepartments, setWorkDepartments] = useState<IWorkDepartment[]>();
  useUpdateEmployees();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        setStates(await getPublicData());
        setWorkDepartments(await getWorkDepartments());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onSubmit = async (data: IData): Promise<void> => {
    try {
      dispatch(addEmployee(data));
      setIsModalOpen(true);
      reset({
        firstName: "",
        lastName: "",
        zipCode: "",
        city: "",
        street: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDateChange = async (date: Date | null, stringData: keyof IData): Promise<void> => {
    setValue(stringData, date!);
    await trigger(stringData);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(prev => !prev);
  };

  if (!states || !workDepartments) return null;

  return (
    <>
      <div className={`flex w-full flex-col items-center gap-5 md:gap-7
                      ${isModalOpen && "opacity-50"}`}>
        <div className="flex flex-col gap-7 text-center">
          <h1 className="mt-3 text-4xl font-bold">HRnet</h1>
          <Link to="/employee-list"
                className="rounded-2xl border border-sky-700 bg-sky-950 px-5 py-2 hover:bg-sky-900 hover:text-sky-300 hover:underline active:text-sky-400">View
            Current
            Employees</Link>
          <h2 className="text-2xl font-bold">Create Employee</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} id="create-employee" className="mt-10 flex flex-col">
          <div
            className="md:mb-7 md:flex md:items-center md:gap-7 md:rounded md:border md:border-sky-900 md:bg-sky-800 md:px-8 md:py-3 md:shadow">
            <div>
              <InputField htmlFor="first-name" label="First Name" type="text" id="first-name"
                          register={register("firstName")} isError={errors} errorMsg={errors.firstName?.message} />
              <InputField htmlFor="last-name" label="Last Name" type="text" id="last-name"
                          register={register("lastName")} isError={errors} errorMsg={errors.lastName?.message} />
              <DateField htmlFor="date-of-birth" label="Date of Birth" stringValue="birthDate"
                         watch={() => birthDate as Date}
                         setValue={date => handleDateChange(date, "birthDate")} isError={errors}
                         errorMsg={errors.birthDate?.message} />
              <DateField htmlFor="start-date" label="Start Date" stringValue="startDate" watch={() => startDate as Date}
                         setValue={date => handleDateChange(date, "startDate")} isError={errors}
                         errorMsg={errors.startDate?.message} />
            </div>

            <div>
              <fieldset className="rounded border-2 border-slate-200/50 px-6 py-2">
                <legend>Address</legend>

                <InputField htmlFor="street" label="Street" type="text" id="street"
                            register={register("street")} isError={errors} errorMsg={errors.street?.message} />
                <InputField htmlFor="city" label="City" type="text" id="city"
                            register={register("city")} isError={errors} errorMsg={errors.city?.message} />
                <SelectField htmlFor="state" label="State" id="state" register={register("state")}
                             data={states.map(state => state.name)} />
                <InputField htmlFor="zipCode" label="Zip Code" type="number" id="zipCode" isError={errors}
                            register={register("zipCode")} errorMsg={errors.zipCode?.message} />
                <SelectField htmlFor="department" label="Department" id="department"
                             register={register("department")}
                             data={workDepartments.map(workDepartment => workDepartment.name)} />
              </fieldset>
            </div>
          </div>

          <Button />
        </form>
      </div>
      {isModalOpen && (
        <Modal message="Employee is created !" iconClassName="size-5" onHandleClick={handleCloseModal}
               sectionClassName="absolute top-1/2 w-1/3 rounded border border-sky-50 bg-sky-900 p-5 text-center text-lg
                                 shadow-lg shadow-slate-950 min-w-44 max-w-96"
               btnClassName="absolute -right-2 -top-3.5 flex items-center rounded-2xl border border-sky-50 bg-sky-950 p-1
                             text-sm hover:border-slate-200 hover:bg-sky-800" />
      )}
    </>
  );
};

export default Home;