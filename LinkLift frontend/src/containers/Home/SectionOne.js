import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/shield-driver-1.png";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { BsArrowRightShort } from "react-icons/bs";

function SectionOne() {
  const { token } = useContext(AuthContext);
  const [finishedSettingUp, setFinishedSettingUp] = useState(true);

  const getUserStatus = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/user`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        setFinishedSettingUp(response.data.user_data.finished_setting_up);
      }
    } catch (error) {
      console.log("response failed", error);
    }
  };
  useEffect(() => {
    getUserStatus();
  });

  return (
    <section className="w-full bg-gradient-to-bl from-cblue-300 to-cblue-100 py-32 px-[10%] lg:flex lg:items-center lg:gap-10 xl:gap-20">
      <div className="bg-white p-12 w-full lg:w-1/2 ">
        <h1 className={`text-5xl font-bold text-black`}>
          {token
            ? "Your Journey Begins Here: Welcome to Our Carpooling Community!"
            : "Get in the driver's seat and get paid"}
        </h1>
        <div className="my-8 text-gray-700">
          <p>
            Drive & Ride on the platform with the largest network of active
            riders.
          </p>
        </div>
        {!token && (
          <Link
            to={"auth/register"}
            className="px-6 py-2 block w-fit bg-cblue-100 text-white text-lg rounded shadow-md shadow-cblue-100 hover:shadow-cblue-200/80 hover:shadow-lg my-12 hover:bg-cblue-200/90 transition-all"
          >
            Sign up to drive
          </Link>
        )}
        {!finishedSettingUp && (
          <Link
            to={"profile"}
            className="px-6 py-2 block w-fit mx-auto bg-cblue-100 text-white text-lg rounded hover:shadow-lg my-12"
          >
            Finish setting up your account
          </Link>
        )}
        <Link
          to="/"
          className="flex items-center border-b-2  mt-12 transition-all border-b-white cursor-pointer w-fit hover:border-b-cblue-100 text-gray-500"
        >
          Learn more about driving and riding
          <BsArrowRightShort size={24} className="text-gray-500 mt-1" />
        </Link>
      </div>
      <div className=" hidden lg:block lg:w-1/2">
        <img src={Image} className=" w-full" alt="Driver & Passenger" />
      </div>
    </section>
  );
}

export default SectionOne;
