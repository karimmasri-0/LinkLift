import { useField } from "formik";
import React, { useState } from "react";

function GenderForm({ ...props }) {
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [meta, helpers] = useField(props);

  return (
    <>
      <div className="mt-6 mb-2 text-lg text-red-500 transition-all">
        {meta.touched && meta.error ? meta.error : null}
      </div>
      <div
        className={`py-4 px-2 rounded-[7px] hover:bg-cblue-200 hover:text-white transition-colors cursor-pointer ${
          maleChecked ? "bg-cblue-200 text-white" : "bg-gray-200 text-black"
        }`}
        onClick={() => {
          setMaleChecked(true);
          setFemaleChecked(false);
          helpers.setValue("Male");
        }}
      >
        Male
      </div>
      <div
        className={`py-4 px-2 rounded-[7px] hover:bg-cblue-200 hover:text-white transition-colors my-4 cursor-pointer ${
          femaleChecked ? "bg-cblue-200 text-white" : "bg-gray-200 text-black"
        }`}
        onClick={() => {
          setFemaleChecked(true);
          setMaleChecked(false);
          helpers.setValue("Female");
        }}
      >
        Female
      </div>
    </>
  );
}

export default GenderForm;
