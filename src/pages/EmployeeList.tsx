import React, { JSX } from "react";

const EmployeeList = (): JSX.Element => {
  const fakeData = [
    {
      firstName: "John",
      lastName: "Doe",
      startDate: "09/25/2023",
      department: "Sales",
      dateOfBirth: "05/12/1985",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      startDate: "03/14/2022",
      department: "Marketing",
      dateOfBirth: "11/23/1990",
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90015",
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      startDate: "07/07/2021",
      department: "Human Resources",
      dateOfBirth: "02/10/1982",
      street: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zipCode: "60616",
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      startDate: "11/01/2023",
      department: "Engineering",
      dateOfBirth: "08/05/1988",
      street: "101 Maple St",
      city: "Houston",
      state: "TX",
      zipCode: "77002",
    },
  ];

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
          <th scope="col" className="rounded border-t border-none px-1 py-2">First Name</th>
          <th scope="col" className="px-1 py-2">Last Name</th>
          <th scope="col" className="px-1 py-2">Start Date</th>
          <th scope="col" className="px-1 py-2">Department</th>
          <th scope="col" className="px-1 py-2">Date of Birth</th>
          <th scope="col" className="px-1 py-2">Street</th>
          <th scope="col" className="px-1 py-2">City</th>
          <th scope="col" className="px-1 py-2">State</th>
          <th scope="col" className="rounded border-t border-none px-1 py-2">Zip Code</th>
        </tr>
        </thead>
        <tbody>
        {fakeData.map((x, i) => {
            return (
              <tr key={x.firstName} className={i % 2 ? "bg-sky-950" : "bg-sky-900"}>
                <td className="truncate px-1 py-3 text-center">{x.firstName}</td>
                <td className="truncate px-1 py-3 text-center">{x.lastName}</td>
                <td className="truncate px-1 py-3 text-center">{x.startDate}</td>
                <td className="truncate px-1 py-3 text-center">{x.department}</td>
                <td className="truncate px-1 py-3 text-center">{x.dateOfBirth}</td>
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