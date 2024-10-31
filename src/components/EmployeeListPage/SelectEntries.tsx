import React, { JSX } from "react";
import { IData } from "../../models/form/IData.ts";

interface IProps {
  list: IData[];
  setEntries: React.Dispatch<React.SetStateAction<IData[] | undefined>>;
  setIsFirstTimeRender: React.Dispatch<React.SetStateAction<boolean>>;
  isOnChange: () => void;
}

const SelectEntries: React.FC<IProps> = ({ list, setEntries, setIsFirstTimeRender, isOnChange }): JSX.Element => {
  const optionValue = [10, 25, 50, 100];

  const handleOnSelectedEntries = (e: React.MouseEvent<HTMLSelectElement, MouseEvent>): void => {
    setEntries(list.slice(0, parseInt(e.currentTarget.value)).map(x => x));
    setIsFirstTimeRender(false);
  };

  return (
    <>
      <label htmlFor="entries" className="invisible" />
      <div className="flex gap-0.5">
        <span>Show</span>
        <select defaultValue={10} onChange={isOnChange}
                className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400"
                id="entries" onClick={handleOnSelectedEntries}>
          {optionValue.map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <span>entries</span>
      </div>
    </>
  );
};

export default SelectEntries;