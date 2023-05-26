import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import "react-day-picker/dist/style.css";
import { TiUserAdd } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "baseui/datepicker";
import deliver from "../../assets/deliver.png";

function SearchForm() {
  const [nbPassengers, setNbPassengers] = useState();
  const navigate = useNavigate();

  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const submitSearch = (e) => {
    e.preventDefault();
    navigate("rides");
  };

  return (
    <div className="py-32 mx-12 md:py-16">
      {md ? (
        <div className=" flex items-center justify-center ">
          <form
            onSubmit={submitSearch}
            className="w-11/12 flex items-center justify-center rounded-l-full rounded-r-full shadow-2xl bg-gray-200"
          >
            <div className="w-4/12 flex items-center gap-1 bg-grey-200 px-4 py-2 bg-gray-200 rounded-l-full">
              <HiLocationMarker
                className="min-w-10 text-cblue-100 "
                size={20}
              />
              <input
                type={"text"}
                placeholder="Leaving from ..."
                className="bg-transparent outline-transparent border-none w-full p-2"
              />
            </div>
            <div className="w-4/12 flex items-center gap-1 bg-grey-200 px-4 py-2 bg-gray-200">
              <HiLocationMarker className=" text-cblue-100 " size={20} />
              <input
                type={"text"}
                placeholder="Going to ..."
                className="bg-transparent outline-transparent w-full border-none p-2"
              />
            </div>
            <div className="w-3/12 flex items-center bg-grey-200 px-4 py-2 bg-gray-200">
              <DatePicker
                className="bg-white"
                // value={formik.values.date}
                minDate={new Date()}
                // onChange={({ date }) => {
                //   formik.setFieldValue("date", date);
                // }}
                overrides={{
                  CalendarHeader: {
                    style: () => ({
                      backgroundColor: "#7985e6",
                    }),
                  },
                  MonthHeader: {
                    style: () => ({
                      backgroundColor: "#7985e6",
                      color: "white",
                    }),
                  },
                  MonthYearSelectButton: {
                    style: () => ({
                      ":hover": {
                        backgroundColor: "#5768cd",
                        outline: "none",
                        paddingLeft: 2,
                      },
                    }),
                  },
                  Month: {
                    style: () => ({
                      color: "white",
                    }),
                  },
                  Day: {
                    style: ({
                      $theme,
                      $selected,
                      $isHovered,
                      $isHighlighted,
                    }) => ({
                      color: $selected ? "white" : "black",
                      ":after": {
                        backgroundColor: $selected
                          ? $isHovered || $isHighlighted
                            ? "#5768cd"
                            : "#7985e6"
                          : $isHovered || $isHighlighted
                          ? "#9ba2ff"
                          : "transparent",
                      },
                    }),
                  },
                }}
              />
            </div>
            <div className="w-2/12 flex items-center gap-1 bg-gray-200 px-4 py-2 mr-10">
              <TiUserAdd className="text-cblue-100" size={30} />
              <select
                defaultValue={1}
                value={nbPassengers}
                onChange={(e) => setNbPassengers(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
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
                className="text-white outline-transparent rounded-r-full border-none hover:drop-shadow-2xl"
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center">
          <form
            onSubmit={submitSearch}
            className="flex flex-col rounded-xl border-3 border-red-500 shadow-xl w-10/12"
          >
            <div className=" px-4">
              <div className=" py-2 mt-2 flex items-center border-b border-gray-300">
                <HiLocationMarker className="mx-2 text-cblue-100 relative" />
                <input
                  type={"text"}
                  placeholder="Leaving from ..."
                  className="bg-transparent outline-transparent border-none py-2 "
                />
              </div>
            </div>
            <div className="px-4">
              <div className=" py-2 mt-2 flex items-center border-b border-gray-300">
                <HiLocationMarker className="mx-2 text-cblue-100 relative" />
                <input
                  type={"text"}
                  placeholder="Leaving from ..."
                  className="bg-transparent outline-transparent border-none py-2"
                />
              </div>
            </div>
            <div className="px-4">
              <div className=" py-2 mt-2 flex items-center border-b border-gray-300">
                <BsFillCalendarWeekFill className="mx-2 text-cblue-100 " />
                <div>
                  <DatePicker
                    className="bg-white"
                    // value={formik.values.date}
                    minDate={new Date()}
                    // onChange={({ date }) => {
                    //   formik.setFieldValue("date", date);
                    // }}
                    overrides={{
                      CalendarHeader: {
                        style: () => ({
                          backgroundColor: "#7985e6",
                        }),
                      },
                      MonthHeader: {
                        style: () => ({
                          backgroundColor: "#7985e6",
                          color: "white",
                        }),
                      },
                      MonthYearSelectButton: {
                        style: () => ({
                          ":hover": {
                            backgroundColor: "#5768cd",
                            outline: "none",
                            paddingLeft: 2,
                          },
                        }),
                      },
                      Month: {
                        style: () => ({
                          color: "white",
                        }),
                      },
                      Day: {
                        style: ({
                          $theme,
                          $selected,
                          $isHovered,
                          $isHighlighted,
                        }) => ({
                          color: $selected ? "white" : "black",
                          ":after": {
                            backgroundColor: $selected
                              ? $isHovered || $isHighlighted
                                ? "#5768cd"
                                : "#7985e6"
                              : $isHovered || $isHighlighted
                              ? "#9ba2ff"
                              : "transparent",
                          },
                        }),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value={"Search"}
              className="py-2 text-white bg-cblue-100 rounded-b-xl hover:shadow-blue-gray-500"
            />
          </form>
        </div>
      )}
      <img
        src={deliver}
        className="absolute -left-20 top-10 w-3/12 -z-10 filter saturate-30 opacity-90 md:top-10"
        alt="Deliver"
      />
    </div>
  );
}

export default SearchForm;
