import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCarFrontFill } from "react-icons/bs";
import {
  FloatingFocusManager,
  FloatingOverlay,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AuthContext } from "../../providers/AuthProvider";

const Header = ({ scrollToSearch }) => {
  const { position, token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const goToSearch = () => {
    navigate("/search");
  };
  const goToPublishRide = () => {
    navigate("/publish-ride");
  };
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip(),
      shift({ padding: 16 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <nav className="font-lato px-6 sm:px-10 bg-white min-h-[10vh] py-5 flex justify-between items-center fixed overflow-hidden w-full border-b-2 border-gray-100 z-10">
      <Link to="/">
        <img src={logo} className="w-32" alt="Logo" />
      </Link>
      <ul className="flex items-center gap-1.5 sm:gap-6 lg:gap-10">
        <li>
          <button
            onClick={location.pathname === "/" ? scrollToSearch : goToSearch}
            className="text-cblue-200 p-2 flex items-center transition-all border-b-2 border-white hover:border-cblue-200"
          >
            <BiSearchAlt className="mr-2" size={24} />
            <span className="hidden sm:block text-lg ">Search</span>
          </button>
        </li>
        {position === "Driver" ? (
          <li>
            <button
              className="bg-gradient-to-r from-red-200 to-cblue-200 hover:from-red-300 hover:to-cblue-300 trasnition-all px-4 py-2 rounded-md text-white flex items-center  shadow-md hover:shadow-lg focus:opacity-[0.85]"
              onClick={goToPublishRide}
            >
              <CgAdd className="md:mr-2" size={22} />
              <span className="hidden sm:block text-lg">Pulish a ride</span>
            </button>
          </li>
        ) : position === "Passenger" ? (
          <li>
            <button
              className="bg-gradient-to-r from-red-200 to-cblue-200 hover:from-red-300 hover:to-cblue-300 trasnition-all px-4 py-2 rounded-md text-white flex items-center  shadow-md hover:shadow-lg focus:opacity-[0.85]"
              onClick={() => navigate("/rides")}
            >
              <BsCarFrontFill className="md:mr-2" size={22} />
              <span className="hidden sm:block text-lg">All Lifts</span>
            </button>
          </li>
        ) : null}
        {token ? (
          <li>
            <button ref={refs.setReference} {...getReferenceProps()}>
              <FaRegUserCircle
                className="rounded-full bg-gray-300 text-gray-600 shadow-md hover:shadow-lg transition-all"
                size={44}
              />
            </button>
            {isOpen && (
              <FloatingOverlay>
                <FloatingFocusManager context={context} modal={false}>
                  <ul
                    ref={refs.setFloating}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      // width: "10rem",
                    }}
                    className="w-44 flex flex-col rounded-md bg-gray-200 shadow-md "
                    {...getFloatingProps()}
                  >
                    <li className="hover:bg-cblue-100 hover:text-white transition-all rounded-t-md">
                      <Link to="/profile" className="px-3 py-1 block w-full">
                        Profile
                      </Link>
                    </li>
                    <div className="border-b border-black"></div>
                    {position === "Driver" && (
                      <li className="hover:bg-cblue-100 hover:text-white transition-all ">
                        <Link to="/my-rides" className="px-3 py-1 block w-full">
                          My Rides
                        </Link>
                      </li>
                    )}
                    <div className="border-b border-black"></div>
                    <li className="hover:bg-cblue-100 hover:text-white transition-all rounded-b-md">
                      <Link to="/logout" className="px-3 py-1 block w-full">
                        Log out
                      </Link>
                    </li>
                  </ul>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
          </li>
        ) : (
          <div className="sm:space-x-4">
            <Link
              to="auth/login"
              className="px-3 py-2.5 text-gray-900 hover:bg-gray-200 rounded transition-all hover:shadow-md text-sm"
            >
              Log in
            </Link>
            <Link
              to="auth/register"
              className="px-3 py-2.5 bg-cblue-200 text-white rounded transition-all hover:bg-cblue-200/80 shadow-md hover:shadow-lg text-sm md:text-base"
            >
              Sign up
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};
export default Header;
