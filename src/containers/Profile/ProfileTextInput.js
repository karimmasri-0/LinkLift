import React from "react";

function ProfileTextInput({
  type = "text",
  label,
  disabled,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = false,
}) {
  return (
    <div
      className={` ${disabled ? "text-gray-500" : "text-gray-900"} ${
        touched && error && "text-red-400"
      }`}
    >
      <label htmlFor={label} className="text-sm">
        {touched && error ? error : label}
        {required && <span className="text-red-500 ml-1 text-lg">*</span>}
      </label>
      <input
        name={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`ml-1 w-full p-2 bg-gray-50 border text-sm rounded-md focus:border-cblue-100 focus:ring-cblue-100 ${
          touched && error ? "border-red-500" : "border-gray-500"
        }`}
        disabled={disabled}
      />
    </div>
  );
}

export default ProfileTextInput;
