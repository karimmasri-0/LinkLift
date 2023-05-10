import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/shield-driver-1.png";
import { AuthContext } from "../../providers/AuthProvider";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { BsArrowRightShort } from "react-icons/bs";

function SectionOne() {
  const { token } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const [finishedSettingUp, setFinishedSettingUp] = useState(true);

  const getUserStatus = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/user`,
          {
            headers: {
              token: token,
            },
          }
        );

        setFinishedSettingUp(response.data.user_data.finished_setting_up);
        console.log(
          "response success",
          response.data.user_data.finished_setting_up
        );
      }
    } catch (error) {
      console.log("response failed", error);
    }
  };
  useEffect(() => {
    getUserStatus();
  });

  return (
    <section className="w-full bg-gradient-to-bl from-cblue-300 to-cblue-100 items-center py-32 px-[10%]">
      <div>
        <div className="bg-white p-12 w-full lg:w-1/2 ">
          <h1 className="text-5xl font-bold text-black">
            Get in the driver's seat and get paid
          </h1>
          <div className="my-8 text-gray-800">
            <p>
              Drive on the platform with the largest network of active riders.
            </p>
          </div>
          {!token && (
            <Link
              to={"auth/register"}
              className="px-6 py-2 block w-fit bg-cblue-100 text-white text-lg rounded hover:shadow-lg my-12"
            >
              Sign up to drive
            </Link>
          )}
          {!finishedSettingUp && (
            <Link to="profile">
              <div className="my-10 flex gap-1 items-center text-white hover:underline hover:text-cblue-200 ">
                <span className="text-sm cursor-pointer">
                  Finish setting up your account
                </span>
                <FiArrowRight />
              </div>
            </Link>
          )}
          <Link
            to="/"
            className="flex items-center border-b-2  mt-12 transition-all border-b-white cursor-pointer w-fit hover:border-b-cblue-100 text-gray-500"
          >
            Learn more about driving and delivering
            <BsArrowRightShort size={24} className="text-gray-500 mt-1" />
          </Link>
          <img
            src={Image}
            className="absolute w-10/12 bottom-20 right-12 sm:w-8/12 hidden lg:block md:w-5/12 lg:4/12"
            alt="Driver & Passenger"
          />
        </div>
      </div>
    </section>
  );
}

export default SectionOne;
