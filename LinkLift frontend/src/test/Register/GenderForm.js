import React, { useState } from "react";
import FormWrapper from "./FormWrapper.tsx";

function GenderForm({ updateData }) {
  const [maleChecked, setMaleChecked] = useState(false);
  const [femaleChecked, setFemaleChecked] = useState(false);

  return (
    <FormWrapper title={"What is your gender identity?"}>
      <div
        className={`py-4 px-2 rounded-[7px] hover:bg-cblue-200 hover:text-white transition-colors my-4 cursor-pointer ${
          maleChecked ? "bg-cblue-200 text-white" : "bg-gray-200 text-black"
        }`}
        onClick={() => {
          setMaleChecked(true);
          setFemaleChecked(false);
          updateData({ gender: "Male" });
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
          updateData({ gender: "Female" });
        }}
      >
        Female
      </div>
    </FormWrapper>
  );
}

export default GenderForm;
