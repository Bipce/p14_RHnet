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
  //
  // ------------------------------------------Add id to interface-----------------------------------------------------
  //
  const [orderedList, setOrderedList] = useState<IData[]>([...fakeData]);
  const [isFirstNameOrdered, setIsFirstNameOrdered] = useState(false);
  const [isLastNameOrdered, setIsLastNameOrdered] = useState(false);
  const [isStartDateOrdered, setIsStartDateOrdered] = useState(false);
  const [isDepartmentOrdered, setIsDepartmentOrdered] = useState(false);
  const [isBirtDateOrdered, setIsBirtDateOrdered] = useState(false);
  const [isStreetOrdered, setIsStreetOrdered] = useState(false);
  const [isCityOrdered, setIsCityOrdered] = useState(false);
  const [isStateOrdered, setIsStateOrdered] = useState(false);
  const [isZipCodeOrdered, setIsZipCodeOrdered] = useState(false);

  const handleOrder = (
    setCurrentState: React.Dispatch<React.SetStateAction<boolean>>, currentState: boolean, property: keyof IData,
    resetState1: React.Dispatch<React.SetStateAction<boolean>>, resetState2: React.Dispatch<React.SetStateAction<boolean>>,
    resetState3: React.Dispatch<React.SetStateAction<boolean>>, resetState4: React.Dispatch<React.SetStateAction<boolean>>,
    resetState5: React.Dispatch<React.SetStateAction<boolean>>, resetState6: React.Dispatch<React.SetStateAction<boolean>>,
    resetState7: React.Dispatch<React.SetStateAction<boolean>>, resetState8: React.Dispatch<React.SetStateAction<boolean>>,
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>): void => {
    const event = e.currentTarget;

    const data = orderedList.sort((a, b) => {
      if (event.id === "startDate" || event.id === "birtDate") {
        let dateA = a[property] as string | Date;
        let dateB = b[property] as string | Date;

        if (typeof dateA === "string") {
          dateA = new Date(dateA.split("-").reverse().join("-"));
        }

        if (typeof dateB === "string") {
          dateB = new Date(dateB.split("-").reverse().join("-"));
        }

        return currentState
          ? dateA.getTime() > dateB.getTime() ? -1 : 1
          : dateA.getTime() < dateB.getTime() ? -1 : 1;
      } else {
        const dataA = a[property];
        const dataB = b[property];

        if (dataA > dataB) {
          return currentState ? -1 : 1;
        } else if (dataA < dataB) {
          return currentState ? 1 : -1;
        }
      }
      return 0;
    });

    setCurrentState(prev => !prev);
    resetState1(false);
    resetState2(false);
    resetState3(false);
    resetState4(false);
    resetState5(false);
    resetState6(false);
    resetState7(false);
    resetState8(false);
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
          <th scope="col" className="rounded-tl border-none px-1 py-2" id="firstName"
              onClick={(event) => handleOrder(setIsFirstNameOrdered, isFirstNameOrdered, "firstName", setIsLastNameOrdered,
                setIsStartDateOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsStreetOrdered, setIsCityOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>
            First Name
          </th>
          <th scope="col" className="px-1 py-2" id="lastName"
              onClick={(event) => handleOrder(setIsLastNameOrdered, isLastNameOrdered, "lastName", setIsFirstNameOrdered,
                setIsStartDateOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsStreetOrdered, setIsCityOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>Last Name
          </th>
          <th scope="col" className="px-1 py-2" id="startDate"
              onClick={(event) => handleOrder(setIsStartDateOrdered, isStartDateOrdered, "startDate", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsStreetOrdered, setIsCityOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>Start Date
          </th>
          <th scope="col" className="px-1 py-2" id="departments"
              onClick={(event) => handleOrder(setIsDepartmentOrdered, isDepartmentOrdered, "departments", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsStartDateOrdered, setIsBirtDateOrdered, setIsStreetOrdered, setIsCityOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>Department
          </th>
          <th scope="col" className="px-1 py-2" id="birthDate"
              onClick={(event) => handleOrder(setIsBirtDateOrdered, isBirtDateOrdered, "birthDate", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsStartDateOrdered, setIsDepartmentOrdered, setIsStreetOrdered, setIsCityOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>Date of Birth
          </th>
          <th scope="col" className="px-1 py-2" id="street"
              onClick={(event) => handleOrder(setIsStreetOrdered, isStreetOrdered, "street", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsStartDateOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsCityOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>Street
          </th>
          <th scope="col" className="px-1 py-2" id="city"
              onClick={(event) => handleOrder(setIsCityOrdered, isCityOrdered, "city", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsStartDateOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsStreetOrdered,
                setIsStateOrdered, setIsZipCodeOrdered, event)}>City
          </th>
          <th scope="col" className="px-1 py-2" id="state"
              onClick={(event) => handleOrder(setIsStateOrdered, isStateOrdered, "state", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsStartDateOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsStreetOrdered,
                setIsCityOrdered, setIsZipCodeOrdered, event)}>State
          </th>
          <th scope="col" className="rounded border-none px-1 py-2" id="zipCode"
              onClick={(event) => handleOrder(setIsZipCodeOrdered, isZipCodeOrdered, "zipCode", setIsFirstNameOrdered,
                setIsLastNameOrdered, setIsStartDateOrdered, setIsDepartmentOrdered, setIsBirtDateOrdered, setIsStreetOrdered,
                setIsCityOrdered, setIsStateOrdered, event)}>Zip Code
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