import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import FormWrapper from "./FormWrapper.tsx";

function AgeForm({ age, updateData }) {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (month && day && year) {
      if (parseInt(day)) {
        if (
          (month === 1 && 1 <= day && day <= 31) ||
          (month === 2 && 1 <= day && day <= 29) ||
          (month === 3 && 1 <= day && day <= 31) ||
          (month === 4 && 1 <= day && day <= 30) ||
          (month === 5 && 1 <= day && day <= 31) ||
          (month === 6 && 1 <= day && day <= 30) ||
          (month === 7 && 1 <= day && day <= 31) ||
          (month === 8 && 1 <= day && day <= 31) ||
          (month === 9 && 1 <= day && day <= 30) ||
          (month === 10 && 1 <= day && day <= 31) ||
          (month === 11 && 1 <= day && day <= 30) ||
          (month === 12 && 1 <= day && day <= 31)
        ) {
          if (year >= 1919 && year <= 2005) {
            console.warn("time to update age");
            updateData({ age: month + "/" + day + "/" + year });
          } else updateData({ age: "" });
        } else updateData({ age: "" });
      } else updateData({ age: "" });
    } else updateData({ age: "" });
  }, [month, day, year, updateData]);
  return (
    <FormWrapper title="What's your date of birth?">
      <div className="flex gap-5 px-5">
        <div className="relative w-2/4 h-full my-5 ">
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="placeholder-shown:border-blue-gray-200 border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 bg-gray-200  h-10 peer w-full rounded-[7px] border border-t-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-cblue-100 focus:border-t-transparent focus:outline-0 "
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>
          <label className="after:border-blue-gray-200 before:border-blue-gray-200 text-blue-gray-400 peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cblue-100 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cblue-100 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cblue-100 ">
            {"Month"}
          </label>
        </div>
        <div className="w-1/4">
          <InputField
            value={day}
            month={month}
            setValue={setDay}
            label={"DD"}
            required={true}
            maxLength={2}
          />
        </div>
        <div className="w-1/4">
          <InputField
            value={year}
            setValue={setYear}
            label={"YYYY"}
            required={true}
            maxLength={4}
          />
        </div>
      </div>
    </FormWrapper>
  );
}

export default AgeForm;
