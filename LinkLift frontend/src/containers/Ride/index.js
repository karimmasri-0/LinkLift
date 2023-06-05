import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { GiDuration, GiPathDistance } from "react-icons/gi";
import { ScaleLoader } from "react-spinners";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import expired from "../../assets/expired.png";

function Ride() {
  const [ride, setRide] = useState({});
  const [seatsAvailable, setSeatsAvailable] = useState(0);
  const [seatsTaken, setSeatsTaken] = useState(0);
  const { token, position } = useContext(AuthContext);
  const { rideId } = useParams();

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
          `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/get-ride`,
          { params: { rideId } }
        )
        .then((response) => {
          setRide(response.data);
          setSeatsAvailable(response.data.seats_available);
          setSeatsTaken(response.data.seats_taken);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (rideId) getRide();
  }, [rideId]);

  const postBookRide = async () => {
    return await axios.post(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/book-ride`,
      { rideId: rideId },
      { headers: { authorization: token } }
    );
  };
  const bookRide = async (e) => {
    e.preventDefault();
    toast.promise(
      postBookRide(),
      {
        loading: () => "Loading",
        success: (response) => {
          console.log("response", response);
          console.log("before ride update", ride);
          setSeatsAvailable(response.data.data.seats_available);
          setSeatsTaken(response.data.data.seats_taken);
          console.log("after ride update", ride);
          return response.data.message;
        },
        error: (err) => err.response.data.message,
      },
      {
        success: {
          duration: 3000,
        },
      }
    );
  };
  return (
    <section className="w-fit mx-auto my-16">
      {ride.driver ? (
        <div
          className={`p-6 md:p-10 rounded-xl md:flex md:gap-12 ${
            seatsTaken ? "bg-cyan-100" : "bg-gray-200"
          }`}
        >
          <div className="">
            <div className="md:hidden gap-2 text-center mb-8 mt-4">
              <div className=" flex items-center justify-center">
                <div className="text-2xl">
                  {ride.departure_city.Location_Name_En}
                  <span className="ml-2 text-gray-800 text-sm">
                    ( {ride.departure_city.Location_Name_Arabic} )
                  </span>
                </div>
                <FaLongArrowAltRight />
                <div className="text-xl">
                  {ride.destination_city.Location_Name_En}
                  <span className="ml-2 text-gray-800 text-sm">
                    ( {ride.destination_city.Location_Name_Arabic} )
                  </span>
                </div>
              </div>
              <div className="text-gray-500 mt-5 p-1 rounded-lg bg-gray-100">
                {ride.date} {ride.time}
              </div>
            </div>
            <img
              src={`${ride.driver.car_image}`}
              className=" rounded-lg mx-auto w-96"
              alt="car"
            />
            <div className="mt-6 rounded-lg bg-gray-100 p-4 flex gap-6">
              <img
                src={ride.driver.picture}
                className="rounded-full w-16"
                alt="profile"
              />
              <div className="my-1">
                <span className="text-lg">{ride.driver.first_name}</span>
                <span className="text-lg ml-1">{ride.driver.last_name}</span>
                <div className="text-sm text-gray-500">
                  (+961) {ride.driver.phone_number}
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            {dateFormater(ride.date) < new Date() && (
              <img
                src={expired}
                alt="expired"
                className="absolute top-1/2 -translate-y-1/2"
              />
            )}
            <div className="hidden md:block">
              <div className=" text-2xl md:flex text-center items-center gap-2 mb-8">
                <div>
                  {ride.departure_city.Location_Name_En}
                  <span className="ml-2 text-gray-800 text-sm">
                    ( {ride.departure_city.Location_Name_Arabic} )
                  </span>
                </div>
                <FaLongArrowAltRight />
                <div>
                  {ride.destination_city.Location_Name_En}
                  <span className="ml-2 text-gray-800 text-sm">
                    ( {ride.destination_city.Location_Name_Arabic} )
                  </span>
                </div>
              </div>
              <div className="text-gray-500 mt-5 text-center p-1 rounded-lg bg-gray-100">
                {ride.date} {ride.time}
              </div>
            </div>
            <div className="flex justify-center items-center my-16 ">
              {ride.passage.map((pass, index) => (
                <div key={pass._id} className="flex items-center text-gray-800">
                  {pass.Location_Name_En}
                  {index !== ride.passage.length - 1 ? (
                    <HiChevronRight size={18} className="mt-1 text-cblue-100" />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="my-3 text-gray-800 text-sm">
              Seats available:
              <span className="ml-2">
                {seatsAvailable - seatsTaken} ( of {seatsAvailable} )
              </span>
            </div>
            <div className="flex justify-around items-center text-sm text-gray-600 gap-3">
              <div className="py-2 px-4 bg-gray-100 flex items-center rounded-lg w-fit">
                <GiDuration size={20} className="mr-2 text-cblue-100" />~{" "}
                {Math.ceil(ride.duration.$numberDecimal / 3600)} Hour(s)
              </div>
              <div className="py-2 px-4 bg-gray-100 flex items-center rounded-lg w-fit">
                <GiPathDistance size={20} className="mr-2 text-cblue-100" />~{" "}
                {Math.ceil(ride.distance.$numberDecimal / 1000)} Kilometer(s)
              </div>
            </div>
            <form
              onSubmit={bookRide}
              className="grid place-content-center my-8"
            >
              {console.log(dateFormater(ride.date))}
              <button
                disabled={
                  position !== "Passenger" ||
                  dateFormater(ride.date) < new Date()
                }
                type="submit"
                className="px-16 py-2 rounded-lg bg-cblue-200 text-white shadow-md hover:shadow-lg shadow-cblue-200/20 hover:shadow-cblue-200/40 transition-all focus:opacity-75 disabled:cursor-not-allowed disabled:bg-cblue-200/30 disabled:hover:shadow"
              >
                Apply for the lift
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-44">
          <ScaleLoader color="#7985e6" />
        </div>
      )}
    </section>
  );
}

export default Ride;
