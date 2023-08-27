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
    <section className="mt-12 mx-8 ">
      <div className="w-full ">
        <div className="bg-cblue-200 w-full flex rounded-t text-white py-2 text-lg font-semibold text-center">
          <div className="w-3/12">Departure</div>
          <div className="w-3/12">Arrival</div>
          <div className="w-2/12">Date</div>
          <div className="w-2/12">Time</div>
          <div className="w-2/12">Seats</div>
        </div>
        {rides.length !== 0 ? (
          rides.map((ride) => (
            <Link
              to={`/rides/${ride._id}`}
              key={ride.departure_city._id}
              className="border-b border-r border-l flex justify-around py-1 first:text-xl last:rounded-b even:bg-white odd:bg-cyan-50 hover:bg-cyan-100 transition-all"
            >
              <div className="w-3/12 text-center">
                {ride.departure_city.Location_Name_En}
              </div>
              <div className="w-3/12 text-center">
                {ride.destination_city.Location_Name_En}
              </div>
              <div className="w-2/12 text-center">{ride.date}</div>
              <div className="w-2/12 text-center">{ride.time}</div>
              <div className="w-2/12 text-center">
                {ride.seats_taken}/{ride.seats_available}
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center mt-44">
            <ScaleLoader color="#7985e6" />
          </div>
        )}
      </div>
    </section>
  );
}

export default MyRides;

{
  /* <div className="border-b border-r border-l flex justify-around py-1">
              <span>Departure</span>
              <span>Arrival</span>
              <span>Date</span>
              <span>Time</span>
              <span>Seats</span>
            </div>
            <div className="border-b border-r border-l rounded-b flex justify-around py-1">
              <span>Departure</span>
              <span>Arrival</span>
              <span>Date</span>
              <span>Time</span>
              <span>Seats</span>
            </div> */
}
