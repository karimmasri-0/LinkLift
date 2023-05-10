import React, { useContext, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
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
  const { token } = useContext(AuthContext);
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
    <nav className="font-lato bg-white min-h-[10vh] px-5 py-5 flex justify-between items-center fixed overflow-hidden w-full border-b-2 border-gray-100 z-10">
      <Link to="/">
        <img src={logo} className="w-32" alt="Logo" />
      </Link>
      <ul className="flex items-center gap-6 lg:gap-10">
        <li>
          <button
            onClick={location.pathname === "/" ? scrollToSearch : goToSearch}
            className="text-cblue-200 px-4 py-2 flex items-center"
          >
            <BiSearchAlt className="mr-2" size={24} />
            <span className="hidden sm:block ">Search</span>
          </button>
        </li>
        {
          <li>
            <button
              className=" bg-red-200 px-4 py-2 rounded-md text-white flex items-center"
              onClick={goToPublishRide}
            >
              <CgAdd className="md:mr-2" size={22} />
              <span className="hidden sm:block text-lg">Pulish a ride</span>
            </button>
          </li>
        }
        {token && (
          <li>
            <button ref={refs.setReference} {...getReferenceProps()}>
              <FaRegUserCircle
                className="rounded-full bg-gray-300 text-gray-700"
                size={44}
              />
            </button>
            {isOpen && (
              <FloatingOverlay>
                {/* <div> */}
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
                    <li className="hover:bg-cblue-100 hover:text-white transition-all rounded-b-md">
                      <Link to="/logout" className="px-3 py-1 block w-full">
                        Logout
                      </Link>
                    </li>
                  </ul>
                  {/* <FloatingArrow ref={arrowRef} context={context} fill="red" /> */}
                </FloatingFocusManager>
                {/* </div> */}
              </FloatingOverlay>
            )}

            {/* </Link> */}
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Header;
