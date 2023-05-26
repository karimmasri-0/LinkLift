import axios from "axios";
import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import SearchForm from "./Search";
import { RxDoubleArrowDown } from "react-icons/rx";

function Ride() {
  const [rides, setRides] = useState({});

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
    <section className="w-fit mx-24 my-16">
      <SearchForm />
      <div className="flex items-start flex-wrap gap-4">
        {rides.offers ? (
          rides.offers.map((ride) => {
            return (
              <div
                key={ride.departure_city._id}
                className="rounded-lg bg-gray-200"
              >
                <img
                  src={ride.driver.car_image}
                  alt="drivers_car"
                  className="w-72 rounded-t-lg"
                />
                <div className=" p-3">
                  <div className="flex py-1 px-2 items-center rounded bg-white gap-2">
                    <img
                      src={ride.driver.picture}
                      className="w-10 rounded-full"
                      alt="driver"
                    />
                    <div className="mt-1">
                      {ride.driver.first_name} {ride.driver.last_name}
                      <div className="text-sm text-gray-500">
                        {ride.driver.phone_number}
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
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-44">
            <ScaleLoader color="#7985e6" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Ride;
