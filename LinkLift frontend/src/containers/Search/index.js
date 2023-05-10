import React, { useRef, forwardRef, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { BsFillCalendarWeekFill, BsCalendarPlus } from "react-icons/bs";
import { DayPicker } from "react-day-picker";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";
import { TiUserAdd } from "react-icons/ti";
import deliver from "../../assets/deliver.png";

const SearchForm = forwardRef((props, ref) => {
  const [nbPassengers, setNbPassengers] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const submitSearch = (e) => {
    e.preventDefault();
    alert("Search Submit");
    console.log(e);
  };

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    console.log("closepooper");
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelectedDate(date);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = (date) => {
    setSelectedDate(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      closePopper();
    } else {
      setInputValue("");
    }
  };

  return (
    <>
      <section className="py-24 mx-12 lg:py-36 min-h-screen relative">
        {md ? (
          <div className=" flex items-center justify-center ">
            <form
              onSubmit={submitSearch}
              className="w-11/12 flex items-center justify-center rounded-l-full lg:rounded-r-full shadow-2xl bg-gray-200"
            >
              <div className="w-4/12 flex items-center gap-1 bg-grey-200 px-4 py-2 bg-gray-200 rounded-l-full">
                <HiLocationMarker
                  className="min-w-10 text-cblue-100 "
                  size={20}
                />
                <input
                  type={"text"}
                  placeholder="Leaving from ..."
                  className="bg-transparent outline-transparent p-2 border-none"
                />
              </div>
              <div className="w-4/12 flex items-center gap-1 bg-grey-200 px-4 py-2 bg-gray-200">
                <HiLocationMarker className=" text-cblue-100 " size={20} />
                <input
                  type={"text"}
                  placeholder="Going to ..."
                  className="bg-transparent outline-transparent p-2 border-none"
                />
              </div>
              <div className="w-3/12 flex items-center bg-grey-200 px-4 py-2 bg-gray-200">
                <input
                  type={"date"}
                  placeholder="Date"
                  className="bg-transparent outline-transparent text-cblue-100 p-2  border-none"
                />
              </div>
              <div className="w-2/12 flex items-center gap-1 bg-gray-200 px-4 py-2 mr-10">
                <TiUserAdd className="text-cblue-100" size={30} />
                <select
                  defaultValue={1}
                  value={nbPassengers}
                  onChange={(e) => setNbPassengers(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <div className="w-1/12 flex justify-center items-center bg-red-200 px-4 py-4  rounded-r-full cursor-pointer">
                <input
                  type="submit"
                  value={"Search"}
                  className="text-white outline-transparent rounded-r-full hover:drop-shadow-2xl"
                />
              </div>
            </form>
          </div>
        ) : (
          <div className="flex justify-center">
            <form
              onSubmit={submitSearch}
              className="flex flex-col rounded-xl border-3 border-red-500 shadow-xl w-10/12 bg-gray-200"
            >
              <div className="  px-4 py-2 mt-2 flex items-center border-b border-gray-300">
                <HiLocationMarker className="mx-2 text-cblue-100 relative" />
                <input
                  type={"text"}
                  placeholder="Leaving from ..."
                  className="bg-transparent outline-transparent py-2 border-none "
                />
              </div>
              <div className=" px-4 py-2 mt-2 flex items-center border-b border-gray-300">
                <HiLocationMarker className="mx-2 text-cblue-100 relative" />
                <input
                  type={"text"}
                  placeholder="Leaving from ..."
                  className="bg-transparent outline-transparent py-2 border-none"
                />
              </div>
              <div className=" px-4 py-2 mt-2 flex items-center border-b border-gray-300">
                <BsFillCalendarWeekFill className="mx-2 text-cblue-100 " />
                <div>
                  <div ref={popperRef}>
                    <input
                      type="text"
                      placeholder={format(new Date(), "y-MM-dd")}
                      value={inputValue}
                      onChange={handleInputChange}
                      className="input-reset pa2 ma2 bg-gray-200 black ba w-28 border-none"
                    />
                    <button
                      ref={buttonRef}
                      type="button"
                      className="p-2 bg-white rdp-button_reset ba"
                      aria-label="Pick a date"
                      onClick={handleButtonClick}
                    >
                      <BsCalendarPlus className=" text-red-200 relative" />
                    </button>
                    {isPopperOpen && (
                      <FocusTrap
                        active
                        focusTrapOptions={{
                          initialFocus: false,
                          allowOutsideClick: true,
                          clickOutsideDeactivates: true,
                          onDeactivate: () => closePopper,
                          fallbackFocus: buttonRef.current,
                        }}
                      >
                        <div
                          tabIndex={-1}
                          style={popper.styles.popper}
                          className="bg-white shadow-2xl rounded-lg"
                          {...popper.attributes.popper}
                          ref={setPopperElement}
                          role="dialog"
                        >
                          <DayPicker
                            initialFocus={isPopperOpen}
                            mode="single"
                            defaultMonth={selectedDate}
                            selected={selectedDate}
                            onSelect={handleDaySelect}
                          />
                        </div>
                      </FocusTrap>
                    )}
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value={"Search"}
                className="py-2 text-white bg-cblue-100 rounded-b-xl cursor-pointer font-bold shadow-gray-900/20 hover:shadow-red-400/100 transition-all focus:opacity-[0.85] focus:shadow-none "
              />
            </form>
          </div>
        )}
        <img
          src={deliver}
          className="absolute -top-3 w-1/2 -z-10 filter saturate-30 opacity-90 md:-top-10"
          alt="Deliver"
        />
      </section>
    </>
  );
});

export default SearchForm;
