import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/16/solid";
import { IData } from "../models/form/IData.ts";
import { getEmployees } from "../service/getPublicData.ts";
import Error from "./Error.tsx";
import Table from "../components/EmployeeListPage/Table.tsx";
import SelectEntries from "../components/EmployeeListPage/SelectEntries.tsx";
import TableSearchBar from "../components/EmployeeListPage/TableSearchBar.tsx";
import TablePagination from "../components/EmployeeListPage/TablePagination.tsx";

type FormValues = {
  userSearch: string
}

const EmployeeList = (): JSX.Element => {
  const [employeesList, setEmployeesList] = useState<IData[]>(); // Provided by store when in place
  const [selectedEntries, setSelectedEntries] = useState<IData[]>();
  const [filteredList, setFilteredList] = useState<IData[]>([]);
  const [isFirstTimeRender, setIsFirstTimeRender] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>();
  const [pages, setPages] = useState<number[]>();
  const { register, watch } = useForm<FormValues>();
  const searchValue = watch("userSearch");

  useEffect(() => {
    (async (): Promise<void> => {
      setEmployeesList(await getEmployees());
    })();
  }, [currentPage]);

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


  useEffect(() => {
    handleTablePages();
  }, [employeesList, selectedEntries]);

  const handleTablePages = (): void => {
    const tablePagination = [];
    if (employeesList && selectedEntries) {
      for (let i = 1; i <= employeesList.length / selectedEntries.length; i++) {
        tablePagination.push(i);
      }
      setPages(tablePagination);
    }
  };

  if (!employeesList || !selectedEntries || !pages) return <Error />;

  return (
    <>
      <h1 className="mb-5 mt-3 text-4xl font-bold">Current Employee</h1>
      <div className="flex w-full justify-between">
        <SelectEntries list={employeesList} setEntries={setSelectedEntries} isOnChange={handleTablePages}
                       setIsFirstTimeRender={setIsFirstTimeRender} />
        <Link to="/"><HomeIcon className="size-7" /></Link>
        <TableSearchBar register={register("userSearch")} />
      </div>

      <Table list={searchValue ? filteredList : selectedEntries} />

      <div className="flex w-full items-center justify-between">
        {/* Move to TablePagination component*/}
        <p>Showing 1 to {selectedEntries.length} of {employeesList.length} entries</p>
        {/*----------------------------------*/}
        <div className="flex gap-3">
          <TablePagination pages={pages} />
        </div>
      </div>
    </>
  );
};
export default EmployeeList;