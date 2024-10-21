import React, { JSX, useState } from "react";
import { IData } from "../models/form/IData.ts";

const EmployeeList = (): JSX.Element => {
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

  const [orderedList, setOrderedList] = useState<IData[]>([...fakeData]);
  const [isFirstNameOrdered, setIsFirstNameOrdered] = useState(false);
  const [isLastNameOrdered, setIsLastNameOrdered] = useState(false);
  const [isDateOrdered, setIsDateOrdered] = useState(false);
  const [isDepartmentOrdered, setIsDepartmentOrdered] = useState(false);

  const handlerOrder = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>): void => {
    const event = e.target as HTMLTableCellElement;
    const data = fakeData.sort((a, b): number => {
      if (event.id === "firstName") {
        setIsFirstNameOrdered(prev => !prev);
        setIsLastNameOrdered(false);
        setIsDateOrdered(false);
        setIsDepartmentOrdered(false);
        return isFirstNameOrdered
          ? a.firstName > b.firstName ? -1 : 1
          : a.firstName < b.firstName ? -1 : 1;
      } else if (event.id === "lastName") {
        // Work in progress
        setIsLastNameOrdered(prev => !prev);
        setIsFirstNameOrdered(false);
        setIsDateOrdered(false);
        setIsDepartmentOrdered(false);
        return isLastNameOrdered
          ? a.lastName > b.lastName ? -1 : 1
          : a.lastName < b.lastName ? -1 : 1;
        // ------------------------------------
      } else if (event.id === "startDate") {
        let dateA: Date, dateB: Date;
        setIsDateOrdered(prev => !prev);

        if (typeof a.startDate === "string") {
          dateA = new Date(a.startDate.split("-").reverse().join("-"));
        } else {
          dateA = a.startDate;
        }

        if (typeof b.startDate === "string") {
          dateB = new Date(b.startDate.split("-").reverse().join("-"));
        } else {
          dateB = b.startDate;
        }
        return isDateOrdered
          ? dateA.getTime() > dateB.getTime() ? -1 : 1
          : dateA.getTime() < dateB.getTime() ? -1 : 1;
      } else if (event.id === "departments") {
        setIsDepartmentOrdered(prev => !prev);
        setIsFirstNameOrdered(false);
        setIsLastNameOrdered(false);
        setIsDateOrdered(false);
        return isDepartmentOrdered
          ? a.departments > b.departments ? -1 : 1
          : a.departments < b.departments ? -1 : 1;
      }
      return 0;
    });

    setOrderedList(data);
  };

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
        <input type="text" id="search"
               className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400" />
      </div>

      <table className="w-full border-separate border-spacing-0 rounded border border-slate-500">
        <caption className="hidden">Employee list</caption>
        <thead className="text-lg">
        <tr className="cursor-pointer bg-sky-950">
          <th scope="col" className="rounded border-t border-none px-1 py-2" id="firstName" onClick={handlerOrder}>
            First Name
          </th>
          <th scope="col" className="px-1 py-2" onClick={(e) => {
            handlerOrder(e);
            // setIsLastNameOrdered(prev => !prev);
          }} id="lastName">Last Name
          </th>
          <th scope="col" className="px-1 py-2" onClick={handlerOrder} id="startDate">Start Date</th>
          <th scope="col" className="px-1 py-2" onClick={handlerOrder} id="departments">Department</th>
          <th scope="col" className="px-1 py-2" onClick={handlerOrder} id="birthDate">Date of Birth</th>
          <th scope="col" className="px-1 py-2" onClick={handlerOrder} id="street">Street</th>
          <th scope="col" className="px-1 py-2" onClick={handlerOrder} id="city">City</th>
          <th scope="col" className="px-1 py-2" onClick={handlerOrder} id="state">State</th>
          <th scope="col" className="rounded border-t border-none px-1 py-2" onClick={handlerOrder} id="zipCode">Zip
            Code
          </th>
        </tr>
        </thead>
        <tbody>
        {orderedList.map((x, i) => {
            return (
              <tr key={x.firstName} className={i % 2 ? "bg-sky-950" : "bg-sky-900"}>
                <td className="truncate px-1 py-3 text-center">{x.firstName}</td>
                <td className="truncate px-1 py-3 text-center">{x.lastName}</td>
                <td className="truncate px-1 py-3 text-center">{x.startDate as string}</td>
                <td className="truncate px-1 py-3 text-center">{x.departments}</td>
                <td className="truncate px-1 py-3 text-center">{x.birthDate as string}</td>
                <td className="truncate px-1 py-3 text-center">{x.street}</td>
                <td className="truncate px-1 py-3 text-center">{x.city}</td>
                <td className="truncate px-1 py-3 text-center">{x.state}</td>
                <td className="truncate px-1 py-3 text-center">{x.zipCode}</td>
              </tr>
            );
          },
        )}
        </tbody>
      </table>
    </>
  );
};
export default EmployeeList;