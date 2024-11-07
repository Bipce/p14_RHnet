import React, { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/16/solid";
import { IData } from "../models/form/IData.ts";
import { getEmployees } from "../service/getPublicData.ts";
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
  const [selectedOption, setSelectedOption] = useState(10);
  const optionsValue = [10, 25, 50, 100];
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>();
  const { register, watch } = useForm<FormValues>();
  const searchValue = watch("userSearch");
  const [render, setRender] = useState(false);

  useEffect(() => {
    (async (): Promise<void> => {
      setEmployeesList(await getEmployees());
    })();
  }, [currentPage]);

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
  }, [employeesList, selectedEntries]);

  useEffect(() => {
    if (employeesList && !render) {
      setSelectedEntries(employeesList.slice(0, 10).map(employee => employee));
      setRender(true);
    }
    if (selectedEntries) {
      handleTableView();
    }
  }, [currentPage, employeesList]);

  const handleTablePages = (): void => {
    const tablePagination = [];
    let nbrOfPages: number;

    if (employeesList && selectedEntries) {
      nbrOfPages = Math.ceil(employeesList.length / selectedOption);
      for (let i = 1; i <= nbrOfPages; i++) {
        tablePagination.push(i);
      }

      setPages(tablePagination);
    }
  };

  const handleTableView = (): void => {
    if (selectedEntries && employeesList) {
      const startPoint = selectedOption * (currentPage - 1);
      const endPoint = Math.min(startPoint + selectedOption, employeesList.length);
      setSelectedEntries(employeesList.slice(startPoint, endPoint));
    }
  };

  if (!employeesList || !selectedEntries || !pages) return <ArrowPathIcon className="my-auto size-1/2 animate-spin" />;

  return (
    <>
      <h1 className="mb-5 mt-3 text-4xl font-bold">Current Employee</h1>
      <div className="flex w-full justify-between">
        <SelectEntries list={employeesList} onSetEntries={setSelectedEntries}
                       isOnChange={handleTablePages} optionsValue={optionsValue}
                       onSetSelectedOption={setSelectedOption} onResetCurrentPage={setCurrentPage} />
        <Link to="/"><HomeIcon className="size-7" /></Link>
        <TableSearchBar register={register("userSearch")} />
      </div>

      <Table list={searchValue ? filteredList : selectedEntries} />

      <div className="flex w-full items-center justify-between">
        <p>Showing {selectedEntries.length * (currentPage - 1) + 1} to {selectedEntries.length * currentPage} of {employeesList.length} entries</p>
        <div className="flex gap-3">
          <TablePagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </div>
    </>
  );
};
export default EmployeeList;