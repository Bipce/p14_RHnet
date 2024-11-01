import React, { JSX, useEffect, useState } from "react";
import { IFieldData } from "../../models/form/IFieldData.ts";
import { IState } from "../../models/form/publicData/IState.ts";
import { IWorkDepartment } from "../../models/form/publicData/IWorkDepartment.ts";
import { getPublicData, getWorkDepartments } from "../../service/getPublicData.ts";
import FieldWrapper from "./FieldWrapper.tsx";
import Error from "../../pages/Error.tsx";

const SelectField: React.FC<IFieldData> = ({ id, register, htmlFor, label }): JSX.Element => {
  const [states, setStates] = useState<IState[]>();
  const [workDepartments, setWorkDepartments] = useState<IWorkDepartment[]>();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        setStates(await getPublicData());
        setWorkDepartments(await getWorkDepartments());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!states || !workDepartments) return <Error />;

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <select id={id} {...register}
              className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-none focus:border-sky-400">
        {id === "state"
          ? states.map(state => <option key={state.name} value={state.abbreviation}>{state.name}</option>)
          : workDepartments.map((workDepartment, i) => <option key={i}>{workDepartment.name}</option>)
        }
      </select>
    </FieldWrapper>
  );
};

export default SelectField;