import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import { Link } from "react-router-dom";

function MyRides() {
  const { token } = useContext(AuthContext);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const getRides = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/my-rides`,
          { headers: { authorization: token } }
        );
        setRides(response.data.offers);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) getRides();
  }, [token]);

  return (
    <section className="mt-12 mx-8 lg:mx-32 xl:mx-44">
      {rides.length !== 0 ? (
        <div className="grid md:grid-cols-2 gap-6 ">
          {rides.map((ride) => (
            <Link
              to={`/rides/${ride._id}`}
              key={ride.departure_city._id}
              className={`shadow-md items-center gap-4 rounded-xl py-4 text-gray-900 text-lg px-8 cursor-pointer w-full flex flex-col justify-center ${
                ride.seats_taken ? "bg-cyan-200" : "bg-gray-200"
              }`}
            >
              <div className="p-1 px-6 rounded-lg bg-white text-gray-500 text-sm">
                {ride.date} {ride.time}
              </div>
              <div className=" flex items-center justify-center gap-3">
                {ride.departure_city.Location_Name_En} <FaLongArrowAltRight />
                {ride.destination_city.Location_Name_En}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-44">
          <ScaleLoader color="#7985e6" />
        </div>
      )}
    </section>
  );
}

export default MyRides;
