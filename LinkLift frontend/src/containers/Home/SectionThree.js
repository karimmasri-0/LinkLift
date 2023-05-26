import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function SectionThree() {
  return (
    <div className="md:flex items-center justify-center gap-24 p-24">
      <Link className="hover:scale-105 transition-all duration-150 flex w-full items-center justify-between border-b border-black font-bold py-12 hover:opacity-60">
        <div className="text-3xl">Sign up to drive</div>
        <FaArrowRight size={30} />
      </Link>
      <Link className="hover:scale-105 transition-all duration-150 flex items-center justify-between border-b border-black w-full font-bold py-12 hover:opacity-60">
        <div className="text-3xl ">Sign up to ride</div>
        <FaArrowRight size={30} />
      </Link>
    </div>
  );
}

export default SectionThree;
