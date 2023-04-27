import React from "react";

function ProfileFileInput({
  label,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  imageURL,
}) {
  return (
    <div className={`text-gray-900 ${touched && error && "text-red-400"}`}>
      <label htmlFor={label} className={`text-sm `}>
        {touched && error ? error : label}
        {required && <span className="text-red-500 ml-1 text-lg">*</span>}
      </label>
      <input
        accept={["image/jpg", "image/jpeg", "image/png"]}
        name={label}
        type={"file"}
        onChange={onChange}
        onBlur={onBlur}
        className={`ml-1 w-full p-2 bg-gray-50 border  text-sm rounded-md focus:border-cblue-100 focus:ring-cblue-100 file:px-4 file:py-1 file:mr-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cblue-100/30 file:hover:bg-cblue-100/50 cursor-pointer ${
          touched && error ? "border-red-500" : "border-gray-500"
        }`}
      />
      {imageURL && (
        <img
          src={imageURL}
          alt="Preview"
          className="ml-3 mt-1 w-24 border-2 border-black"
        />
      )}
    </div>
  );
}

export default ProfileFileInput;
