import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import SearchForm from "./Search";
import { RxDoubleArrowDown } from "react-icons/rx";
import { Link } from "react-router-dom";
import expired from "../../assets/expired.png";

function Ride() {
  const [rides, setRides] = useState({});

  const dateFormater = (dateStr) => {
    const parts = dateStr.split("-");
    const formattedDateStr = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const date = new Date(formattedDateStr);
    return date;
  };

  useEffect(() => {
    const getRide = async () => {
      await axios
        .get(
          `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/get-rides`
        )
        .then((response) => {
          console.log(response.data);
          setRides(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRide();
  }, []);

  return (
    <section className="w-fit mx-auto my-16">
      <SearchForm setRides={setRides} />
      {/* <div className="flex items-start justify-center lg:justify-normal flex-wrap gap-4 w-fit"> */}
      {rides.offers ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-8 sm:mx-24">
          {rides.offers.map((ride) => {
            return (
              <Link
                to={`/rides/${ride._id}`}
                key={ride._id}
                className={` rounded-lg ${
                  dateFormater(ride.date) >= new Date()
                    ? "bg-gray-200"
                    : "bg-red-300"
                }`}
              >
                <div className="relative">
                  <img
                    src={ride.driver.car_image}
                    alt="drivers_car"
                    className="rounded-t-lg"
                  />
                  {dateFormater(ride.date) <= new Date() && (
                    <img
                      src={expired}
                      alt="expired"
                      className="w-4/5 absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                </div>
                <div className="p-3">
                  <div className="flex py-1 px-2 items-center rounded bg-white gap-2">
                    <img
                      src={ride.driver.picture}
                      className="w-10 rounded-full"
                      alt="driver"
                    />
                    <div className="mt-1">
                      {ride.driver.first_name} {ride.driver.last_name}
                      <div className="text-sm text-gray-500">
                        (+961) {ride.driver.phone_number}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col py-2 items-center">
                    <span className="text-lg font-semibold">
                      {ride.destination_city.Location_Name_En}
                    </span>
                    <RxDoubleArrowDown size={24} className="font-semibold" />
                    <span className="text-lg font-semibold">
                      {ride.departure_city.Location_Name_En}
                    </span>
                  </div>
                  <div className="rounded text-center px-8 py-0.5 w-fit mx-auto bg-white text-gray-500">
                    {ride.date} at {ride.time}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-20 grid place-items-center">
          <div>
            <ScaleLoader color="#7985e6" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Ride;
