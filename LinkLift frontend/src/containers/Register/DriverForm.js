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
    <FormWrapper title={"What are applying for?"}>
      <div className="flex gap-6 my-8">
        <div
          className={`relative rounded-xl transition-colors ${
            position === "Driver" ? "bg-cblue-200" : "bg-gray-100"
          }`}
          onClick={() => {
            setPosition("Driver");
            updateData({ position: position });
          }}
        >
          <h2
            className={`absolute text-lg left-1/2 -translate-x-1/2 transition-colors ${
              position === "Driver" ? "text-white" : "text-cblue-400"
            }`}
          >
            Driver
          </h2>
          <img src={driverIcon} alt="Driver" className="p-5" />
        </div>
        <div
          className={`relative rounded-xl transition-colors ${
            position === "Passenger" ? "bg-cblue-200" : "bg-gray-100 "
          }`}
          onClick={() => {
            setPosition("Passenger");
            updateData({ position: position });
          }}
        >
          <h2
            className={`absolute text-lg left-1/2 -translate-x-1/2 transition-colors ${
              position === "Passenger" ? "text-white" : "text-cblue-400"
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
