import { JSX } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextField from "../components/FormTextField.tsx";
import CustomButton from "../components/CustomButton.tsx";

const schema = z.object({
  firstName: z.string().min(0, { message: "Should be at least 2 characters" }),
  lastName: z.string().min(0, { message: "Should be at least 2 characters" }),
  birthDate: z.string().min(18, { message: "Must be 18 or older" }),
  startDate: z.string(),
  street: z.string().min(2, { message: "Should be at least 2 characters" }),
  city: z.string().min(2, { message: "Should be at least 2 characters" }),
  state: z.string().min(2, { message: "Should be at least 2 characters" }),
  zipCode: z.number().min(5, { message: "Should be at least 5 characters" }),
  departments: z.string(),
});

type FormValues = z.infer<typeof schema>

const Home = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues): void => {
    console.log(data);
  };

  return (
    <Container
      className="flex size-full flex-col items-center gap-5 bg-slate-800 p-4 text-slate-50">
      <h1 className="text-4xl font-bold">HRnet</h1>
      <Link to="/employee-list" className="hover:text-sky-300 hover:underline">View Current Employees</Link>

      <div
        className="rounded-md border-2 border-slate-200 bg-slate-900 bg-gradient-to-br from-sky-800 p-8 drop-shadow-xl">
        <h3 className="mb-5 text-2xl font-bold">Create Employee</h3>

        <form onSubmit={handleSubmit(onSubmit)} id="create-employee">
          <FormTextField htmlFor="first-name" label="First Name" type="text" id="first-name"
                         register={register("firstName")} />
          <FormTextField htmlFor="last-name" label="Last Name" type="text" id="last-name"
                         register={register("lastName")} />
          <FormTextField htmlFor="date-of-birth" label="Date of Birth" type="text" id="date-of-birth"
                         register={register("birthDate")} />
          <FormTextField htmlFor="start-date" label="Start Date" type="text" id="start-date"
                         register={register("startDate")} />

          <fieldset className="rounded border-2 p-2">
            <legend>Address</legend>

            <FormTextField htmlFor="street" label="Street" type="text" id="street"
                           register={register("street")} />
            <FormTextField htmlFor="city" label="City" type="text" id="city"
                           register={register("city")} />
            <FormTextField htmlFor="state" label="State" type="text" id="state"
                           register={register("state")} />
            <FormTextField htmlFor="zipCode" label="Zip Code" type="text" id="zipCode"
                           register={register("zipCode")} />
            <FormTextField htmlFor="departments" label="Departments" type="text" id="departments"
                           register={register("departments")} />
          </fieldset>

          <CustomButton />
        </form>
      </div>
    </Container>
  );
};

export default Home;