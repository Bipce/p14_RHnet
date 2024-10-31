import React, { JSX, useState } from "react";
import Error from "../../pages/Error.tsx";

interface IProps {
  pages: number[];
}

const TablePagination: React.FC<IProps> = ({ pages }): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePreviousPage = (): void => {
    setCurrentPage(prev => prev === 1 ? 1 : prev - 1);
  };

  const handleNextPage = (): void => {
    setCurrentPage(prev => prev ? prev + 1 : prev);
  };

  if (!pages) return <Error />;

  return (
    <>
      <button onClick={handlePreviousPage}>Previous</button>
      {pages.map(pageNbr =>
        <button onClick={() => setCurrentPage(pageNbr)} key={pageNbr}
                className="rounded border border-sky-700 px-3 py-1 hover:bg-sky-900 active:border-sky-600">
          {pageNbr}</button>)}
      <button onClick={handleNextPage}>Next</button>
    </>
  );
};

export default TablePagination;