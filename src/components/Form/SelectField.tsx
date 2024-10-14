import React, { JSX, useEffect, useState } from "react";
import { IFormFieldData } from "../../models/form/FormFieldData.ts";
import FieldWrapper from "./FieldWrapper.tsx";
import { IState } from "../../models/State.ts";
import { getStates } from "../../service/getStates.ts";
import Error from "../../pages/Error.tsx";

const SelectField: React.FC<IFormFieldData> = ({ id, register, htmlFor, label }): JSX.Element => {
  const [states, setStates] = useState<IState[]>();
  const departments = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        setStates(await getStates());
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!states) return <Error />;

  return (
    <FieldWrapper htmlFor={htmlFor} label={label}>
      <select id={id} {...register}
              className="rounded border-2 border-slate-600 bg-slate-900 px-1 text-slate-100 outline-sky-600">
        {id === "state"
          ? states.map(x => <option key={x.name} value={x.abbreviation}>{x.name}</option>)
          : <>
            {departments.map((x, i) => <option key={i}>{x}</option>)}
          </>
        }
      </select>
    </FieldWrapper>
  );
};

export default SelectField;