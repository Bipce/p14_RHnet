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

  //
  // -----------------------------------------Add id to interface IData-------------------------------------------------
  //

  return (
    <table className="w-full border-separate border-spacing-0 rounded border border-slate-500">
      <caption className="hidden">Employee list</caption>
      <thead className="text-lg">
      <tr className="cursor-pointer bg-sky-950">
        {Object.keys(columnHeaders).map((x, i) =>
          <th key={x} scope="col" id={x}
              className={`${i === 0 && "rounded-tl"} ${i === x.length + 1 && "rounded-tr"} border-none p-2`}
              onClick={(event) => {
                handleOrder(x as keyof IData, event.currentTarget.id, event);
                setIsKeyClicked(x as keyof IData);
              }}>
            <div className="flex gap-1">{columnHeaders[x as keyof IData]}
              <div>
                <ChevronUpIcon
                  className={`size-4 ${handleIconClasses(x as keyof IData)}`} />
                <ChevronDownIcon
                  className={`size-4 ${handleIconDownClass(x as keyof IData)}`} />
              </div>
            </div>
          </th>)}
      </tr>
      </thead>
      <tbody>
      {list.map((x, i) => {
          return (
            <tr key={i} className={`${i % 2 ? "bg-sky-950" : "bg-sky-900"} hover:font-bold`}>
              <td
                className={`truncate px-1 py-3 text-center ${i === list.length - 1 && "rounded-bl"}`}>{x.firstName}</td>
              <td className="truncate px-1 py-3 text-center">{x.lastName}</td>
              <td className="truncate px-1 py-3 text-center">{x.startDate as string}</td>
              <td className="truncate px-1 py-3 text-center">{x.departments}</td>
              <td className="truncate px-1 py-3 text-center">{x.birthDate as string}</td>
              <td className="truncate px-1 py-3 text-center">{x.street}</td>
              <td className="truncate px-1 py-3 text-center">{x.city}</td>
              <td className="truncate px-1 py-3 text-center">{x.state}</td>
              <td
                className={`truncate px-1 py-3 text-center ${i === list.length - 1 && "rounded-br"}`}>{x.zipCode}</td>
            </tr>
          );
        },
      )}
      </tbody>
    </table>
  );
};

export default Table;