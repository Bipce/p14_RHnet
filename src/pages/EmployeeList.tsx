import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IData } from "../models/form/IData.ts";
import Table from "../components/Table.tsx";

const fakeData: IData[] = [
  {
    firstName: "John",
    lastName: "Doe",
    startDate: "09/25/2023",
    departments: "Sales",
    birthDate: "05/12/1985",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    startDate: "03/14/2022",
    departments: "Marketing",
    birthDate: "11/23/1990",
    street: "456 Oak Ave",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90015",
  },
  {
    firstName: "Emily",
    lastName: "Johnson",
    startDate: "07/07/2021",
    departments: "Human Resources",
    birthDate: "02/10/1982",
    street: "789 Pine Rd",
    city: "Chicago",
    state: "IL",
    zipCode: "60616",
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    startDate: "11/01/2023",
    departments: "Engineering",
    birthDate: "08/05/1988",
    street: "101 Maple St",
    city: "Houston",
    state: "TX",
    zipCode: "77002",
  },
];

type FormValues = {
  userSearch: string
}

const EmployeeList = (): JSX.Element => {
  const orderedList = [...fakeData];
  //
  // const [orderedList, setOrderedList] = useState<IData[]>([...fakeData]);
  //
  const [filteredList, setFilteredList] = useState<IData[]>([]);

  const { register, watch } = useForm<FormValues>();
  const searchValue = watch("userSearch");

  useEffect(() => {
    if (searchValue) {
      const filtered = orderedList.filter(x => Object.values(x).join(" ").toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredList(filtered);
    } else {
      setFilteredList([]);
    }
  }, [searchValue]);

  return (
    <>
      <h1 className="mt-3 text-4xl font-bold">Current Employee</h1>
      <div>
        <label htmlFor="entries" />
        <div>
          <span>Show</span>
          <select id="entries"
                  className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>
        <label>Search:</label>
        <input type="text" id="search" {...register("userSearch")}
               className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400" />
      </div>

      <Table list={searchValue ? filteredList : orderedList} />
    </>
  );
};
export default EmployeeList;