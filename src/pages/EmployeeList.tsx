import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/16/solid";
import { IData } from "../models/form/IData.ts";
import { getEmployees } from "../service/getPublicData.ts";
import Table from "../components/Table.tsx";
import Error from "./Error.tsx";
import SelectEntries from "../components/SelectEntries.tsx";
import InputSearch from "../components/InputSearch.tsx";

type FormValues = {
  userSearch: string
}

const EmployeeList = (): JSX.Element => {
  const [employeesList, setEmployeesList] = useState<IData[]>(); // Provided by store when in place
  const [selectedEntries, setSelectedEntries] = useState<IData[]>();
  const [filteredList, setFilteredList] = useState<IData[]>([]);
  const [isFirstTimeRender, setIsFirstTimeRender] = useState(true);
  const [pages, setPages] = useState<number[]>([1, 2, 3]);
  const { register, watch } = useForm<FormValues>();
  const searchValue = watch("userSearch");

  useEffect(() => {
    (async (): Promise<void> => {
      setEmployeesList(await getEmployees());
    })();
  }, []);

  useEffect(() => {
    if (employeesList && isFirstTimeRender) {
      setSelectedEntries(employeesList.slice(0, 10).map(x => x));
    }
  }, [employeesList, isFirstTimeRender]);

  useEffect(() => {
    if (searchValue && employeesList) {
      const filtered = employeesList.filter(x => Object.values(x).join(" ").toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredList(filtered);
    } else {
      setFilteredList([]);
    }
  }, [employeesList, searchValue]);

  if (!employeesList || !selectedEntries) return <Error />;


  return (
    <>
      <h1 className="mb-5 mt-3 text-4xl font-bold">Current Employee</h1>
      <div className="flex w-full">
        <SelectEntries list={employeesList} setEntries={setSelectedEntries}
                       setIsFirstTimeRender={setIsFirstTimeRender} />
        <InputSearch register={register("userSearch")} />
      </div>

      <Table list={searchValue ? filteredList : selectedEntries} />

      <div className="flex w-full justify-between">
        <p>Showing 1 to {selectedEntries.length} of {employeesList.length} entries</p>
        <Link to="/"><HomeIcon className="size-7" /></Link>
        <div className="flex gap-3">
          <button>Previous</button>
          {pages.map(x => <button
            className="rounded border border-sky-700 px-3 py-1 hover:bg-sky-900 active:border-sky-600">{x}</button>)}
          <button>Next</button>
        </div>
      </div>
    </>
  );
};
export default EmployeeList;