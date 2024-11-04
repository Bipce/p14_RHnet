import React, { JSX } from "react";
import Error from "../../pages/Error.tsx";

interface IProps {
  pages: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const TablePagination: React.FC<IProps> = ({ pages, setCurrentPage, currentPage }): JSX.Element => {

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
      <button onClick={handlePreviousPage}>Previous</button>
      {pages.map(pageNbr =>
        <button onClick={() => handleCurrentPage(pageNbr)} key={pageNbr}
                className={`rounded border border-sky-700 px-3 py-1 hover:bg-sky-900 active:border-sky-600 
                ${currentPage === pageNbr && "bg-sky-600"}`}>
          {pageNbr}</button>)}
      <button onClick={handleNextPage}>Next</button>
    </>
  );
};

export default TablePagination;