import React, { useEffect, useState } from "react";
import driverIcon from "../../assets/driver-icon.png";
import passengerIcon from "../../assets/passenger-icon.png";
import FormWrapper from "./FormWrapper.tsx";

function DriverForm({ updateData }) {
  const [position, setPosition] = useState();
  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <FormWrapper title={"What are you applying for?"}>
      <div className="flex gap-6 my-8">
        <div
          className={`relative rounded-xl transition-all ${
            position === "Driver"
              ? "bg-cblue-200 scale-100"
              : "bg-gray-100 scale-90"
          }`}
          onClick={() => {
            setPosition("Driver");
            updateData({ position: position });
          }}
        >
          <h2
            className={`uppercase sm:text-lg absolute px-3 sm:px-6 py-2 rounded-md mt-2 left-1/2 -translate-x-1/2 transition-colors max-w-md ${
              position === "Driver"
                ? "text-cblue-400 bg-white"
                : "text-black bg-gray-100"
            }`}
          >
            Driver
          </h2>
          <img src={driverIcon} alt="Driver" className="p-5 " />
        </div>
        <div
          className={`relative rounded-xl transition-all ${
            position === "Passenger"
              ? "bg-cblue-200 scale-100"
              : "bg-gray-100 scale-90"
          }`}
          onClick={() => {
            setPosition("Passenger");
            updateData({ position: position });
          }}
        >
          <h2
            className={`uppercase sm:text-lg absolute px-3 sm:px-6 py-2 rounded-md mt-2 left-1/2 -translate-x-1/2 transition-colors ${
              position === "Passenger"
                ? "text-cblue-400 bg-white"
                : "text-black bg-gray-100"
            }`}
          >
            Passenger
          </h2>
          <img src={passengerIcon} alt="Driver" className="p-5" />
        </div>
      </div>
    </FormWrapper>
  );
}

export default DriverForm;
