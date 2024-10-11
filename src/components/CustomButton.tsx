import React, { JSX } from "react";

const CustomButton = (): JSX.Element => {
  return (
    <button type="submit"
            className="mt-5 rounded-md border-2 border-slate-300 bg-sky-900 px-4 py-2 font-bold drop-shadow-lg
                hover:bg-sky-500 hover:text-slate-900 active:border-sky-800">Save
    </button>
  );
};

export default CustomButton;