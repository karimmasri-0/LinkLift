import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { GrFacebook, GrInstagram, GrTwitter } from "react-icons/gr";
import { CgCopyright } from "react-icons/cg";

function Footer() {
  return (
    <footer className="bg-[#606060] pt-12 px-4 shadow-3xl font-lato">
      <div className="flex items-start pb-4 flex-wrap gap-20 m-2 sm:m-4">
        <div className="flex-initial text-gray-200 max-w-md">
          <img src={logo} alt="LinkLift Logo" className="w-48 " />
          <p className="px-6 py-4">
            It's a small step for you, but a giant leap for the planet. Join now
            and navigate with ease.
          </p>
          <div className="flex items-center gap-8 justify-center mt-5">
            <Link
              to="https://www.facebook.com/"
              targte="_blank"
              className="group focus:opacity-[0.85] bg-[#707070] hover:bg-cblue-300 transition-all hover:text-gray-[#707070] rounded-xl p-2 shadow-md hover:shadow-lg shadow-[#707070]/20 hover:shadow-[#505050] "
            >
              <GrFacebook
                className="text-cblue-300 group-hover:text-[#707070]"
                size={18}
              />
            </Link>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="group focus:opacity-[0.85] bg-[#707070] hover:bg-cblue-300 transition-all hover:text-gray-[#707070] rounded-xl p-2 shadow-md hover:shadow-lg shadow-[#707070]/20 hover:shadow-[#505050] "
            >
              <GrInstagram
                className="text-cblue-300 group-hover:text-[#707070]"
                size={18}
              />
            </Link>
            <Link
              to="https://twitter.com/"
              target="_blank"
              className="group focus:opacity-[0.85] bg-[#707070] hover:bg-cblue-300 transition-all hover:text-gray-[#707070] rounded-xl p-2 shadow-md hover:shadow-lg shadow-[#707070]/20 hover:shadow-[#505050] "
            >
              <GrTwitter
                className="text-cblue-300 group-hover:text-[#707070]"
                size={18}
              />
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <h3 className="text-xl pb-3 text-white font-semibold uppercase">
            All directories
          </h3>
          <ul className="py-2 ml-1 text-gray-400 space-y-4 w-fit cursor-pointer">
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="">All carpool routes</Link>
            </li>
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="">All carpool destinations</Link>
            </li>
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="">All bus routes</Link>
            </li>
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="">All bus destinations</Link>
            </li>
          </ul>
        </div>
        <div className="pt-2">
          <h3 className="text-xl pb-3 text-white font-semibold uppercase">
            About
          </h3>
          <ul className="py-2 ml-1 text-gray-400 space-y-4 w-fit cursor-pointer">
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="how-it-works">How it works</Link>
            </li>
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="about-us">About Us</Link>
            </li>
            <li className="border-b-2 border-[#606060] transition-all hover:border-cblue-200 w-fit">
              <Link to="help-center">Help Centre</Link>
            </li>
          </ul>
        </div>
        <div className="pt-2">
          <h3 className="text-xl pb-3 text-white font-semibold uppercase">
            Newsletter
          </h3>
          <form className="py-2 ml-1 flex gap-4 flex-col">
            <input
              type="email"
              placeholder="Your Email*"
              className="bg-[#606060] focus:ring-1 focus:ring-cblue-200 transition-all"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-cblue-200 w-fit shadow shadow-cblue-200/20 hover:shadow-md hover:shadow-cblue-200/40 text-white px-4 py-2 transition-all focus:opacity-[0.85] cursor-pointer"
            />
          </form>
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
