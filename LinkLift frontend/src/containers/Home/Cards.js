import React from "react";
import { SiLeaderprice } from "react-icons/si";
import { FaRoute } from "react-icons/fa";
import { MdOutlineSafetyDivider } from "react-icons/md";

const Cards = () => {
  return (
    <section className="py-16 px-12 text-center md:grid md:grid-cols-4 lg:grid-cols-3">
      <div className="relative p-5 md:col-span-2 lg:col-span-1">
        <div className="h-52 my-2 py-3 px-6 shadow-lg rounded-lg flex flex-col items-center border-2 border-cblue-200">
          <div className="bg-cblue-200 rounded-full w-14 h-14 absolute top-0 grid place-content-center">
            <SiLeaderprice size={32} className="" />
          </div>
          <div className="m-auto overflow-x-hidden overflow-y-auto">
            Choose from a variety of routes and destinations at affordable rates
            for your transportation needs.
          </div>
        </div>
      </div>
      <div className="relative p-5 md:col-span-2 lg:col-span-1">
        <div className="h-52 my-2 py-3 px-6 shadow-lg rounded-lg flex flex-col items-center border-2 border-cblue-200">
          <div className="bg-cblue-200 rounded-full w-14 h-14 absolute top-0 grid place-content-center">
            <MdOutlineSafetyDivider size={32} className="" />
          </div>
          <div className="m-auto overflow-x-hidden overflow-y-auto">
            We thoroughly review both users and members to ensure that you have
            complete information about the individuals you'll be travelling
            with.
          </div>
        </div>
      </div>
      <div className="relative p-5 md:col-span-2 md:col-start-2 lg:col-span-1">
        <div className="h-52 my-2 py-3 px-6 shadow-lg rounded-lg flex flex-col items-center border-2 border-cblue-200">
          <div className="bg-cblue-200 rounded-full w-14 h-14 absolute top-0 grid place-content-center">
            <FaRoute size={32} className="" />
          </div>
          <div className="m-auto overflow-x-hidden overflow-y-auto">
            We're committed to providing safe and secure routes for our
            passengers, so you can travel with peace of mind.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
