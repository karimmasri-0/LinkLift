import React from "react";

function ProfileSelectInput({
  label,
  disabled = false,
  elements,
  firstOption,
  error,
  touched,
  onChange,
  onBlur,
  value,
  required = false,
}) {
  return (
    <div
      className={`${disabled ? "text-gray-500" : "text-gray-900"} ${
        touched && error && "text-red-400"
      }`}
    >
      <label htmlFor={label} className="text-sm">
        {touched && error ? error : label}
        {required && <span className="text-red-500 ml-1 text-lg">*</span>}
      </label>
      <select
        value={value}
        name={label}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        className={`ml-1 w-full p-2 bg-gray-50 border text-sm rounded-md focus:border-cblue-100 focus:ring-cblue-100 ${
          touched && error ? "border-red-500" : "border-gray-500"
        }`}
      >
        <option value={undefined} className="text-gray-400">
          {firstOption}
        </option>
        {elements.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProfileSelectInput;
