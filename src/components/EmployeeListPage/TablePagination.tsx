import React, { JSX } from "react";
import Error from "../../pages/Error.tsx";
import { IData } from "../../models/form/IData.ts";

interface IProps {
  pages: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  selectedOption: number;
  list: IData[];
}

const TablePagination: React.FC<IProps> = ({ pages, setCurrentPage, currentPage, selectedOption, list })
  : JSX.Element => {

  const handlePreviousPage = (): void => {
    setCurrentPage(prev => prev === 1 ? 1 : prev - 1);
  };

  const handleNextPage = (): void => {
    setCurrentPage(prev => prev === pages.length ? pages.length : prev + 1);
  };

  const handleCurrentPage = (pageNbr: number): void => {
    setCurrentPage(pageNbr);
  };

  if (!pages) return <Error />;

  return (
    <>
      <p>Showing {(currentPage - 1) * selectedOption + 1} to {Math.min(currentPage * selectedOption, list.length)} of {list.length} entries</p>
      <div className="flex flex-wrap gap-3">
        <button onClick={handlePreviousPage}>Previous</button>
        {pages.map(pageNbr =>
          <button onClick={() => handleCurrentPage(pageNbr)} key={pageNbr}
                  className={`rounded border border-sky-700 px-3 py-1 hover:bg-sky-900 active:border-sky-600 
                ${currentPage === pageNbr && "bg-sky-600"}`}>
            {pageNbr}</button>)}
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
};

export default TablePagination;