import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";
import { CgCopyright } from "react-icons/cg";

function Footer() {
  return (
    <footer className="bg-[#606060] pt-8 px-4 shadow-3xl font-lato">
      <div className="md:flex md:items-start md:gap-20 m-4">
        <div className="text-gray-200 max-w-md">
          <img src={logo} alt="LinkLift Logo" className="w-48 " />
          <p className="px-6 py-4">
            It's a small step for you, but a giant leap for the planet. Join now
            and navigate with ease.
          </p>
          <div className="flex items-center gap-8 justify-center mt-5">
            <Link
              to="https://www.facebook.com/"
              targte="_blank"
              className="bg-[#707070] rounded-xl p-2 shadow-md hover:shadow-lg shadow-[#606060]/20 hover:shadow-[#505050]/40"
            >
              <GrFacebook className="text-cblue-300" size={18} />
            </Link>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="bg-[#707070] rounded-xl p-2 shadow-md hover:shadow-lg shadow-[#606060]/20 hover:shadow-[#505050]/40"
            >
              <GrInstagram className="text-cblue-300" size={18} />
            </Link>
            <Link
              to="https://twitter.com/"
              target="_blank"
              className="bg-[#707070] rounded-xl p-2 shadow-md hover:shadow-lg shadow-[#606060]/20 hover:shadow-[#505050]/40"
            >
              <GrTwitter className="text-cblue-300" size={18} />
            </Link>
          </div>
        </div>
        {/* <div className="flex items-start gap-20"> */}
        <div className="text-gray-200 pt-10">
          <h3 className="text-xl pb-3 text-white font-semibold">
            All directories
          </h3>
          <ul className="">
            <li className="py-2 w-fit hover:underline cursor-pointer">
              All carpool routes
            </li>
            <li className="py-2 w-fit hover:underline cursor-pointer">
              All carpool destinations
            </li>
            <li className="py-2 w-fit hover:underline cursor-pointer">
              All bus routes
            </li>
            <li className="py-2 w-fit hover:underline cursor-pointer">
              All bus destinations
            </li>
          </ul>
        </div>
        <div className="text-white pt-10">
          <h3 className="text-xl pb-3 text-white font-semibold">About</h3>
          <ul>
            <li className="py-2">
              <Link className="hover:underline" to="how-it-works">
                How it works
              </Link>
            </li>
            <li className="py-2">
              <Link className="hover:underline" to="about-us">
                About Us
              </Link>
            </li>
            <li className="py-2">
              <Link className="hover:underline" to="help-center">
                Help Centre
              </Link>
            </li>
          </ul>
        </div>
        {/* </div> */}
      </div>
      <div className="border-b mt-8"></div>
      <div className="sm:flex sm:justify-between sm:items-center mx-4 md:mx-16 lg:mx-20 py-6 text-gray-500">
        <div className="flex items-center gap-1">
          <CgCopyright size={22} />
          LinkLift. All rights reserved.
        </div>
        <div className="sm:flex sm:gap-8 text-sm mt-5 sm:mt-0 text-center">
          <Link to="" className="p-1 hover:underline block">
            Terms and consitions
          </Link>
          <Link to="" className="p-1 hover:underline block">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
