import React, { JSX, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { IData } from "../../models/form/IData.ts";

interface IProps {
  list: IData[];
}

const Table: React.FC<IProps> = ({ list }): JSX.Element => {
  const [isKeyClicked, setIsKeyClicked] = useState<keyof IData>();
  const [isOrdered, setIsOrdered] = useState<{ [key in keyof IData]: boolean }>({
    firstName: false,
    lastName: false,
    startDate: false,
    departments: false,
    birthDate: false,
    street: false,
    city: false,
    state: false,
    zipCode: false,
  });

  const columnHeaders: { [key in keyof IData]: string } = {
    firstName: "First Name",
    lastName: "Last Name",
    startDate: "Start Date",
    departments: "Departments",
    birthDate: "Date of Birth",
    street: "Street",
    city: "City",
    state: "State",
    zipCode: "Zip Code",
  };

  const handleOrder = (clickedKey: keyof IData, property: string, e: React.MouseEvent<HTMLTableCellElement, MouseEvent>): void => {
    const event = e.currentTarget;
    const propertyType = property as keyof IData;

    setIsOrdered((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof IData] = false;
        return acc;
      }, {} as { [key in keyof IData]: boolean }),
      [clickedKey]: !prev[clickedKey],
    }));

    list.sort((a, b) => {
      if (event.id === "startDate" || event.id === "birthDate") {
        let dateA = a[propertyType] as string | Date;
        let dateB = b[propertyType] as string | Date;

        if (typeof dateA === "string") {
          dateA = new Date(dateA.split("-").reverse().join("-"));
        }

        if (typeof dateB === "string") {
          dateB = new Date(dateB.split("-").reverse().join("-"));
        }
        return isOrdered[event.id]
          ? dateA.getTime() > dateB.getTime() ? -1 : 1
          : dateA.getTime() < dateB.getTime() ? -1 : 1;
      } else if (event.id === clickedKey) {
        const dataA = a[propertyType];
        const dataB = b[propertyType];

        if (dataA > dataB) {
          return isOrdered[event.id] ? -1 : 1;
        } else if (dataA < dataB) {
          return isOrdered[event.id] ? 1 : -1;
        }
      }
      return 0;
    });
  };

  const handleIconDownClass = (clickedKey: keyof IData): string | boolean => {
    return isKeyClicked === clickedKey && !isOrdered[clickedKey] && "text-sky-500";
  };

  const handleIconClasses = (clickedKey: keyof IData): string | boolean => {
    return isOrdered[clickedKey] && "text-sky-500";
  };

  return (
    <div className="mb-3 w-full min-w-[300px] overflow-y-auto">
      <table className="w-full table-auto border-separate border-spacing-0 rounded border border-slate-500">
        <caption className="hidden">Employee list</caption>
        <thead className="md:text-lg">
        <tr className="cursor-pointer bg-sky-950">
          {Object.keys(columnHeaders).map((header, i) =>
            <th key={header} scope="col" id={header}
                className={`${i === 0 && "rounded-tl"} ${i === header.length + 1 && "rounded-tr"} place-items-center border-none p-2`}
                onClick={(event) => {
                  handleOrder(header as keyof IData, event.currentTarget.id, event);
                  setIsKeyClicked(header as keyof IData);
                }}>
              <div className="flex gap-1">{columnHeaders[header as keyof IData]}
                <div>
                  <ChevronUpIcon
                    className={`size-4 ${handleIconClasses(header as keyof IData)}`} />
                  <ChevronDownIcon
                    className={`size-4 ${handleIconDownClass(header as keyof IData)}`} />
                </div>
              </div>
            </th>)}
        </tr>
        </thead>
        <tbody>
        {list.map((employee, i) => {
            return (
              <tr key={i}
                  className={`${i % 2 ? "bg-sky-950" : "bg-sky-900"} hover:bg-sky-800`}>
                <td
                  className={`truncate px-1 py-3 text-center ${i === list.length - 1 && "rounded-bl"}`}>{employee.firstName}</td>
                <td className="truncate px-1 py-3 text-center">{employee.lastName}</td>
                <td className="truncate px-1 py-3 text-center">{employee.startDate as string}</td>
                <td className="truncate px-1 py-3 text-center">{employee.departments}</td>
                <td className="truncate px-1 py-3 text-center">{employee.birthDate as string}</td>
                <td className="truncate px-1 py-3 text-center">{employee.street}</td>
                <td className="truncate px-1 py-3 text-center">{employee.city}</td>
                <td className="truncate px-1 py-3 text-center">{employee.state}</td>
                <td
                  className={`truncate px-1 py-3 text-center ${i === list.length - 1 && "rounded-br"}`}>{employee.zipCode}</td>
              </tr>
            );
          },
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;