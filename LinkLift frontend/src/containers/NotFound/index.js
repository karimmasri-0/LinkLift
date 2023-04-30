import React from "react";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="h-[32rem] flex flex-col justify-center items-center ">
        <div className="flex w-full gap-2 items-center">
          <div className="border-b w-full mt-1"></div>
          <div className="whitespace-nowrap text-gray-600 text-3xl w-64 text-center">
            Page not Found
          </div>
          <div className="border-b w-full mt-1"></div>
        </div>
        <Link to="/">
          <AiFillCloseCircle size={36} className="text-cblue-100" />
        </Link>
        <Link
          to="/"
          className="flex items-center mt-12 bg-cblue-100 rounded-lg px-4 py-2 text-white"
        >
          <div>Back to home page</div>
          <AiOutlineArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </>
  );
};

export default NotFound;
