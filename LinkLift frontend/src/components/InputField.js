import React from "react";
import { useState } from "react";
import classNames from "classnames";

function InputField({
  value,
  setValue = undefined,
  type = "text",
  label,
  required = false,
  autoComplete = "off",
  autoCorrect = "off",
  updateData = undefined,
  fieldToUpdate = undefined,
  minLength,
  maxLength = 30,
  month,
  confirm,
}) {
  const [invalidInputText, setInvalidInputText] = useState("");
  const [isValidInput, setIsValidInput] = useState(true);
  const inputCSS = classNames(
    "bg-gray-200 rounded-[7px] h-10 peer w-full rounded-[7px] border border-t-transparent px-3 py-2.5 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-cblue-100 focus:border-t-transparent focus:outline-0 ",
    {
      "border-blue-gray-200": isValidInput,
      "placeholder-shown:border-blue-gray-200": isValidInput,
      "placeholder-shown:border-t-blue-gray-200": isValidInput,
      "border-red-500": !isValidInput,
      "placeholder-shown:border-red-500": !isValidInput,
      "placeholder-shown:border-t-red-500": !isValidInput,
    }
  );
  const labelCSS = classNames(
    "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cblue-100 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-cblue-100 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-cblue-100 ",
    {
      "text-blue-gray-400": isValidInput,
      "before:border-blue-gray-200": isValidInput,
      "after:border-blue-gray-200": isValidInput,
      "peer-placeholder-shown:text-blue-gray-500": isValidInput,
      "text-red-500": !isValidInput,
      "before:border-red-500": !isValidInput,
      "after:border-red-500": !isValidInput,
      "peer-placeholder-shown:text-red-500": !isValidInput,
    }
  );

  const onBlurPassword = (password_confirm) => {
    if (password_confirm !== confirm) {
      setIsValidInput(false);
      setInvalidInputText("Password didn't match");
      return;
    } else setIsValidInput(true);
  };

  const handleBlur = (e) => {
    if (required) {
      if (!e.target.value) {
        setIsValidInput(false);
        setInvalidInputText("Required");
        return;
      } else setIsValidInput(true);
      if (type === "email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          setIsValidInput(false);
          setInvalidInputText("Invalid email format");
          return;
        } else setIsValidInput(true);
      }
      if (label === "DD") onBlurDay(parseInt(e.target.value));
      if (label === "YYYY") onBlurYear(parseInt(e.target.value));
      if (fieldToUpdate === "password_confirm") onBlurPassword(e.target.value);
      if (fieldToUpdate === "phone_number") onBLurPhoneNumber(e.target.value);
    }
  };
  const onBlurDay = (day) => {
    if (parseInt(day)) {
      if (
        (month === 1 && !(1 <= day && day <= 31)) ||
        (month === 2 && !(1 <= day && day <= 29)) ||
        (month === 3 && !(1 <= day && day <= 31)) ||
        (month === 4 && !(1 <= day && day <= 30)) ||
        (month === 5 && !(1 <= day && day <= 31)) ||
        (month === 6 && !(1 <= day && day <= 30)) ||
        (month === 7 && !(1 <= day && day <= 31)) ||
        (month === 8 && !(1 <= day && day <= 31)) ||
        (month === 9 && !(1 <= day && day <= 30)) ||
        (month === 10 && !(1 <= day && day <= 31)) ||
        (month === 11 && !(1 <= day && day <= 30)) ||
        (month === 12 && !(1 <= day && day <= 31))
      ) {
        setIsValidInput(false);
        setInvalidInputText("Invalid Day");
      } else {
        setIsValidInput(true);
      }
    } else {
      setIsValidInput(false);
      setInvalidInputText("Invalid Day");
    }
  };
  const onBlurYear = (year) => {
    if (!parseInt(year) || year <= 1919 || year >= 2005) {
      setIsValidInput(false);
      setInvalidInputText("Invalid Year");
    } else setIsValidInput(true);
  };
  const onBLurPhoneNumber = (value) => {
    if (
      !value ||
      !/^[0-9]+$/.test(value) ||
      value.length < 8 ||
      value.length > 12
    ) {
      setIsValidInput(false);
      setInvalidInputText("Invalid phone number");
    } else setIsValidInput(true);
  };
  return (
    <div className="relative w-full h-full my-5 ">
      <input
        value={value}
        onChange={(e) => {
          if (updateData && fieldToUpdate) {
            updateData({ [fieldToUpdate]: e.target.value });
          } else setValue(e.target.value);
        }}
        onBlur={handleBlur}
        type={type}
        className={inputCSS}
        placeholder=" "
        required={required}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        maxLength={maxLength}
        minLength={minLength}
      />

      <label className={labelCSS}>{label}</label>
      {!isValidInput && (
        <div className=" text-red-500 italic text-xs">{invalidInputText}</div>
      )}
    </div>
  );
}

export default InputField;
