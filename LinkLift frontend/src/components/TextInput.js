import { useField } from "formik";
import React from "react";

function TextInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  console.log(field);
  return (
    <div className={`my-3 ${meta.touched && meta.error && "text-red-400"}`}>
      <label htmlFor={label} className="text-sm">
        {meta.touched && meta.error ? meta.error : label}
        {props.required && <span className="text-red-500 ml-1 text-lg">*</span>}
      </label>
      <input
        {...field}
        {...props}
        className={`ml-1 w-full p-2 bg-gray-50 border text-sm rounded-md focus:border-cblue-100 focus:ring-cblue-100 ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-500"
        }`}
      />
    </div>
  );
}

export default TextInput;
