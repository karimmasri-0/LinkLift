import React, { useState } from "react";
import driverIcon from "../../assets/driver-icon.png";
import passengerIcon from "../../assets/passenger-icon.png";
import { useField } from "formik";

function DriverForm({ ...props }) {
  const [field, meta, helpers] = useField(props);
  console.log("useFIreld", useField("position"));
  const [position, setPosition] = useState("");

  return (
    <>
      <div className="mt-6 mb-0 text-lg text-red-500 transition-all">
        {meta.touched && meta.error ? meta.error : null}
      </div>
      <div className="flex gap-6 ">
        <div
          className={`relative rounded-xl transition-all ${
            position === "Driver"
              ? "bg-cblue-200 scale-100"
              : "bg-gray-100 scale-90"
          }`}
          onClick={() => {
            setPosition("Driver");
            helpers.setValue("Driver");
          }}
        >
          <h2
            className={`uppercase md:text-lg absolute px-3 sm:px-6 py-2 rounded-md mt-2 left-1/2 -translate-x-1/2 transition-colors max-w-md ${
              position === "Driver"
                ? "text-cblue-400 bg-white"
                : "text-black bg-gray-100"
            }`}
          >
            Driver
          </h2>
          <div className="grid place-items-center">
            <img src={driverIcon} alt="Driver" className="mt-2 p-5 " />
          </div>
        </div>
        <div
          className={`relative rounded-xl transition-all ${
            position === "Passenger"
              ? "bg-cblue-200 scale-100"
              : "bg-gray-100 scale-90"
          }`}
          onClick={() => {
            setPosition("Passenger");
            helpers.setValue("Passenger");
          }}
        >
          <h2
            className={`uppercase md:text-lg absolute px-3 sm:px-6 py-2 rounded-md mt-2 left-1/2 -translate-x-1/2 transition-colors ${
              position === "Passenger"
                ? "text-cblue-400 bg-white"
                : "text-black bg-gray-100"
            }`}
          >
            Passenger
          </h2>
          <div className="grid place-items-center">
            <img src={passengerIcon} alt="Driver" className="mt-2 p-5" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DriverForm;
