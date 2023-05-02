import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/shield-driver.png";
import { AuthContext } from "../../providers/AuthProvider";
import { FiArrowRight } from "react-icons/fi";

function SectionOne() {
  const { token } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);

  return (
    <section className=" bg-cblue-100 flex flex-col items-center pt-28">
      <h2 className="text-white text-center text-3xl max-w-2xl mx-auto px-12 leading-10">
        Join the carpool revolution and make a positive impact on the
        environment.
      </h2>
      {!token && (
        <Link
          to={"auth/register"}
          className="px-8 py-2 bg-white text-black text-lg rounded mt-8 mb-6 shadow hover:shadow-lg"
        >
          Sign Up!
        </Link>
      )}
      {userData && !userData.finished_setting_up && (
        <Link to="profile">
          <div className="mt-6 flex gap-1 items-center text-white hover:underline hover:text-cblue-200 ">
            <span className="text-sm cursor-pointer">
              Finish setting up your account
            </span>
            <FiArrowRight />
          </div>
        </Link>
      )}
      <img
        src={Image}
        className=" w-10/12 sm:w-8/12 md:w-5/12 lg:4/12"
        alt="Driver & Passenger"
      />
    </section>
  );
}

export default SectionOne;
