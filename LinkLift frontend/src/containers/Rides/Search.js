import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import "react-day-picker/dist/style.css";
import { TiUserAdd } from "react-icons/ti";
import { DatePicker } from "baseui/datepicker";
import deliver from "../../assets/deliver.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import makeAnimated from "react-select/animated";
import AsyncSelect from "react-select/async";
import axios from "axios";
import Select from "react-select";

function SearchForm(setRides) {
  const animatedComponents = makeAnimated();

  const formik = useFormik({
    initialValues: {
      nbPassengers: 0,
      departure: "",
      destination: "",
      date: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log(values);
      const response = await axios.get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/search`,
        {
          params: {
            passengers: values.nbPassengers,
            departure: values.departure,
            destination: values.destination,
            date: values.date,
          },
        }
      );
      setRides(response.data);
      console.log(response.data);
    },
  });
  const md = useMediaQuery({ query: "(min-width: 768px)" });

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#e5e7eb",
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      width: "100%",
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#7985e6"
          : isFocused
          ? "#9ba2ff"
          : "#e5e7eb",
        color: isSelected || isFocused ? "white" : undefined,
        cursor: isFocused ? "pointer" : undefined,
      };
    },
  };
  const getCities = async (text) => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/get-cities`,
        { params: { text } }
      );
      const options = response.data.data.map((city) => ({
        value: city.Pcode,
        label: (
          <label
            key={city.Pcode}
            className="cursor-pointer flex items-center justify-between"
          >
            <div>{city.Location_Name_En}</div>
            <div>{city.Location_Name_Arabic}</div>
          </label>
        ),
      }));
      return options;
    } catch (error) {
      console.log("getcities >>>> ", error);
    }
  };
  return (
    <div className="py-32 mx-12 md:py-16">
      {md ? (
        <div className=" flex items-center justify-center ">
          <form
            onSubmit={formik.handleSubmit}
            className="w-11/12 flex items-center justify-center rounded-l-full rounded-r-full shadow-2xl bg-gray-200"
          >
            <div className="w-3/12 flex items-center gap-1 bg-grey-200 px-4 bg-gray-200 rounded-l-full">
              <HiLocationMarker
                className="min-w-10 text-cblue-100 "
                size={20}
              />
              <AsyncSelect
                name="departure"
                cacheOptions
                defaultOptions
                components={animatedComponents}
                loadOptions={getCities}
                placeholder="Leaving from ..."
                className={`w-full my-1 ${
                  formik.errors.departure && formik.touched.departure
                    ? "border rounded border-red-400"
                    : null
                }`}
                styles={colourStyles}
                onChange={(e) => formik.setFieldValue("destination", e.value)}
              />
            </div>
            <div className="w-3/12 flex items-center gap-1 bg-grey-200 px-4 bg-gray-200">
              <HiLocationMarker className=" text-cblue-100 " size={20} />
              <AsyncSelect
                name="destination"
                cacheOptions
                components={animatedComponents}
                defaultOptions
                loadOptions={getCities}
                placeholder="Going to ..."
                className={`w-full my-1 ${
                  formik.errors.destination && formik.touched.destination
                    ? "border rounded border-red-400"
                    : null
                }`}
                styles={colourStyles}
                onChange={(e) => formik.setFieldValue("departure", e.value)}
              />
            </div>
            <div className="w-2/12 flex items-center bg-grey-200 px-4 bg-gray-200">
              <DatePicker
                value={formik.values.date}
                minDate={new Date()}
                onChange={({ date }) => {
                  formik.setFieldValue("date", date);
                }}
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
            <div className="w-2/12 flex items-center gap-1 bg-gray-200 px-4">
              <TiUserAdd className="text-cblue-100" size={30} />
              <Select
                onChange={(e) => {
                  formik.setFieldValue("nbPassengers", e.value);
                }}
                placeholder="Passengers"
                styles={colourStyles}
                options={[
                  { value: 1, label: 1 },
                  { value: 2, label: 2 },
                  { value: 3, label: 3 },
                  { value: 4, label: 4 },
                ]}
              />
            </div>
            <div className="w-2/12 flex justify-center items-center bg-red-200 px-4 py-4 rounded-r-full cursor-pointer">
              <button
                type="submit"
                className="text-white outline-transparent rounded-r-full border-none hover:drop-shadow-2xl"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex justify-center">
          <form
            onSubmit={formik.handleSubmit}
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
