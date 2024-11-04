import React, { JSX } from "react";
import { IData } from "../../models/form/IData.ts";

interface IProps {
  list: IData[];
  onSetEntries: React.Dispatch<React.SetStateAction<IData[] | undefined>>;
  isOnChange: () => void;
  optionsValue: number[];
  onSetSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  onResetCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}


const SelectEntries: React.FC<IProps> = (
  { list, onSetEntries, isOnChange, optionsValue, onSetSelectedOption, onResetCurrentPage }): JSX.Element => {

  const handleOnSelectedEntries = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>): void => {
    onSetEntries(list.slice(0, parseInt(e.currentTarget.value)).map(employee => employee));
    onSetSelectedOption(parseInt(e.currentTarget.value));
    onResetCurrentPage(1);
  };

  return (
    <div className="flex gap-0.5">
      <label htmlFor="entries" className="invisible" />
      <span>Show</span>
      <select defaultValue={10} onChange={isOnChange}
              className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400"
              id="entries" onClick={handleOnSelectedEntries}>
        {optionsValue.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
      <span>entries</span>
    </div>
  );
};

export default SelectEntries;