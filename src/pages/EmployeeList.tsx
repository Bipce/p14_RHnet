import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
import { useGetEmployeesQuery } from "../features/apiSlice.ts";
import { IData } from "../models/form/IData.ts";
import Table from "../components/EmployeeListPage/Table.tsx";
import SelectEntries from "../components/EmployeeListPage/SelectEntries.tsx";
import TableSearchBar from "../components/EmployeeListPage/TableSearchBar.tsx";
import TablePagination from "../components/EmployeeListPage/TablePagination.tsx";
import Error from "./Error.tsx";
import { useAppSelector } from "../app/store.ts";
import { selectEmployee } from "../features/employeeSlice.ts";

type FormValues = {
  userSearch: string
}

const EmployeeList = (): JSX.Element => {
  const [selectedEntries, setSelectedEntries] = useState<IData[]>();
  const [filteredList, setFilteredList] = useState<IData[]>([]);
  const [selectedOption, setSelectedOption] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>();
  const [render, setRender] = useState(false);
  const { register, watch } = useForm<FormValues>();
  const searchValue = watch("userSearch");
  const { isLoading } = useGetEmployeesQuery();
  const optionsValue = [10, 25, 50, 100];

  // Data from JSON file
  const { data: employees } = useGetEmployeesQuery();

  // Data from store
  // const { employees } = useAppSelector(selectEmployee);

  // Set the filtered table if write in searchbar
  useEffect(() => {
    if (searchValue && selectedEntries) {
      const filtered = selectedEntries.filter(employee => Object.values(employee).join(" ").toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredList(filtered);
    } else {
      setFilteredList([]);
    }
  }, [selectedEntries, searchValue]);

  // Set pages number at the bottom of the table
  useEffect(() => {
    handleTablePages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees, selectedEntries]);

  // Set entries at 10 when first render
  useEffect(() => {
    if (employees && !render) {
      setSelectedEntries(employees.slice(0, 10).map(employee => employee));
      setRender(true);
    }
    if (selectedEntries) {
      handleTableView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, employees]);

  const handleTablePages = (): void => {
    const tablePagination = [];
    let nbrOfPages: number;

    if (employees && selectedEntries) {
      nbrOfPages = Math.ceil(employees.length / selectedOption);
      for (let i = 1; i <= nbrOfPages; i++) {
        tablePagination.push(i);
      }

      setPages(tablePagination);
    }
  };

  const handleTableView = (): void => {
    if (selectedEntries && employees) {
      const startPoint = selectedOption * (currentPage - 1);
      const endPoint = Math.min(startPoint + selectedOption, employees.length);
      setSelectedEntries(employees.slice(startPoint, endPoint));
    }
  };

  if (isLoading) return <ArrowPathIcon className="my-auto size-1/2 animate-spin" />;
  if (!employees || !selectedEntries || !pages) return <Error />;

  return (
    <div className="h-screen w-full overflow-hidden text-center">
      <h1 className="mt-3 text-2xl font-bold md:mb-5 md:text-4xl">Current Employee</h1>
      <div className="mb-3 flex w-full flex-col gap-2 md:flex-row md:justify-between">
        <SelectEntries list={employees} onSetEntries={setSelectedEntries}
                       isOnChange={handleTablePages} optionsValue={optionsValue}
                       onSetSelectedOption={setSelectedOption} onResetCurrentPage={setCurrentPage} />
        <Link to="/" aria-label="Home icon" className="self-center"><HomeIcon className="size-7" /></Link>
        <TableSearchBar register={register("userSearch")} />
      </div>

      <Table list={searchValue ? filteredList : selectedEntries} />

      <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row">
        <TablePagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} list={employees}
                         selectedOption={selectedOption} />
      </div>
    </div>
  );
};
export default EmployeeList;