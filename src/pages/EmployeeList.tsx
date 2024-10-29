import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IData } from "../models/form/IData.ts";
import Table from "../components/Table.tsx";
import { getEmployees } from "../service/getPublicData.ts";
import Error from "./Error.tsx";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/16/solid";

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
  const optionValue = [10, 25, 50, 100];

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

  const handleOnSelectedEntries = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>): void => {
    setSelectedEntries(employeesList.slice(0, parseInt(e.currentTarget.value)).map(x => x));
    setIsFirstTimeRender(false);
  };

  return (
    <>
      <h1 className="mb-5 mt-3 text-4xl font-bold">Current Employee</h1>
      <div className="flex w-full">
        <label htmlFor="entries" className="invisible" />
        <div className="flex gap-0.5">
          <span>Show</span>
          <select defaultValue={10}
                  className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400"
                  id="entries" onClick={handleOnSelectedEntries}>
            {optionValue.map(x => <option key={x} value={x}>{x}</option>)}
          </select>
          <span>entries</span>
        </div>
        <div className="ml-auto flex gap-1">
          <label>Search:</label>
          <input type="text" id="search" {...register("userSearch")}
                 className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400" />
        </div>
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