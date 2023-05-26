import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import makeAnimated from "react-select/animated";
import { AuthContext } from "../../providers/AuthProvider";
import AsyncSelect from "react-select/async";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { DatePicker, TimePicker } from "baseui/datepicker";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";

function PublishRide() {
  const [disableInputOnSubmit, setDisableInputOnSubmit] = useState(false);
  const [rideId, setRideId] = useState("");
  const animatedComponents = makeAnimated();
  const { token, position } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (position !== "Driver") navigate("/");
  }, [position]);
  const postRide = async (values) => {
    console.log(values);
    return await axios.post(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/publish-ride`,
      { ...values },
      { headers: { authorization: token } }
    );
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#e5e7eb" }),
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
  const formik = useFormik({
    initialValues: {
      departure: "",
      destination: "",
      passage: [],
      date: "",
      time: "",
      seats: "",
      luggage_number: "",
      luggage_size: "",
    },
    validationSchema: Yup.object({
      departure: Yup.string().required("Departure city required."),
      destination: Yup.string().required("Destination city required."),
      passage: Yup.array(),
      date: Yup.date().required("Required"),
      time: Yup.date().required("Required"),
      seats: Yup.string().required("Required"),
      luggage_number: Yup.number().required("Required"),
      luggage_size: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // setDisableInputOnSubmit(true);
      console.log(values);
      values.formatedTime =
        values.time.getHours() +
        ":" +
        values.time.getMinutes() +
        ":" +
        values.time.getSeconds();
      values.formatedDate =
        values.date.getDate() +
        "/" +
        values.date.getMonth() +
        "/" +
        values.date.getFullYear();
      toast.promise(
        postRide(values),
        {
          loading: () => {
            return "Loading";
          },
          success: (data) => {
            console.log(data.data);
            setRideId(data.data._id);
            return "Ride published";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          success: {
            duration: 3000,
          },
        }
      );
    },
  });

  const getCities = async (text) => {
    try {
      const response = await axios.get(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/get-cities`,
        { params: { text } }
        // { headers: { authorization: token } }
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
  // useEffect(() => {
  //   console.log(formik.errors);
  //   console.log(formik.values);
  // }, [formik.values, formik.errors]);
  useEffect(() => {
    console.log(formik.values.date);
  }, [formik.values.date]);
  return (
    <section
      className={`px-16 py-12 bg-gray-200 ${
        disableInputOnSubmit && "text-gray-400"
      }`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="p-12 h-full bg-white rounded-xl lg:w-1/2 xl:w-1/3"
      >
        <h1 className="text-3xl font-bold mb-10 uppercase">Placing a Ride</h1>
        <h2 className="font-semibold text-2xl mb-3">GeoLocation Details</h2>
        <div className={`mb-8 `}>
          <label className=" font-medium text-xl">
            Select your location
            <span className="text-red-500 ml-1 text-lg">*</span>
          </label>
          {formik.errors.departure && formik.touched.departure ? (
            <span className="block text-xs text-red-400">
              {formik.errors.departure}
            </span>
          ) : null}
          <AsyncSelect
            cacheOptions
            components={animatedComponents}
            defaultOptions
            isDisabled={disableInputOnSubmit}
            loadOptions={getCities}
            placeholder="Your departure"
            className={`my-1 ${
              formik.errors.departure && formik.touched.departure
                ? "border rounded border-red-400"
                : null
            }`}
            styles={colourStyles}
            onChange={(e) => formik.setFieldValue("departure", e.value)}
          />
        </div>
        <div className="mb-8">
          <label className=" font-medium text-xl">
            Select your destination
            <span className="text-red-500 ml-1 text-lg">*</span>
          </label>
          {formik.errors.destination && formik.touched.destination ? (
            <span className="block text-xs text-red-400">
              {formik.errors.destination}
            </span>
          ) : null}
          <AsyncSelect
            name="destination"
            cacheOptions
            defaultOptions
            isDisabled={disableInputOnSubmit}
            components={animatedComponents}
            loadOptions={getCities}
            placeholder="Your destination"
            className={`my-1 ${
              formik.errors.destination && formik.touched.destination
                ? "border rounded border-red-400"
                : null
            }`}
            styles={colourStyles}
            onChange={(e) => formik.setFieldValue("destination", e.value)}
          />
        </div>
        <div>
          <label className="font-medium text-xl">City passage</label>
          <div className="text-xs ml-1 w-30 text-cblue-100">
            In order from departure to destination.
          </div>
          {formik.errors.passage && formik.touched.passage ? (
            <span className="block text-xs text-red-400">
              {formik.errors.passage}
            </span>
          ) : null}
          <AsyncSelect
            cacheOptions
            defaultOptions
            components={animatedComponents}
            isDisabled={disableInputOnSubmit}
            loadOptions={getCities}
            className={`my-2 ${
              formik.errors.passage && formik.touched.passage
                ? "border rounded border-red-400"
                : null
            }`}
            isMulti
            placeholder="City passage (order is mandatory)"
            styles={colourStyles}
            onChange={(e) => {
              const cities = e.map((element) => element.value);
              formik.setFieldValue("passage", cities);
            }}
          />
        </div>
        <div className="mt-12">
          <h2 className="font-semibold text-2xl mb-3">
            Date &amp; Time details
          </h2>
          <div>
            <label className="font-medium text-xl pb-1">
              Pick a date
              <span className="text-red-500 ml-1 text-lg">*</span>
            </label>
            <div className="border rounded-lg border-gray-400 my-1">
              <DatePicker
                value={formik.values.date}
                disabled={disableInputOnSubmit}
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
          </div>
          <div className="my-8">
            <label className="font-medium text-xl pb-1">
              Pick a Time
              <span className="text-red-500 ml-1 text-lg">*</span>
            </label>
            <div className={` border rounded-lg border-gray-400 my-1`}>
              <TimePicker
                value={formik.values.time}
                minTime={new Date()}
                disabled={disableInputOnSubmit}
                onChange={(date) => formik.setFieldValue("time", date)}
                creatable
                format="24"
              />
            </div>
          </div>
        </div>
        <div className="my-12">
          <h2 className="font-semibold text-2xl mb-3">Supplementary details</h2>
          <div>
            {formik.errors.seats && formik.touched.seats ? (
              <span className="block text-xs text-red-400">
                {formik.errors.seats}
              </span>
            ) : null}
            <Select
              components={animatedComponents}
              styles={colourStyles}
              isDisabled={disableInputOnSubmit}
              placeholder="Seats available"
              className={`${disableInputOnSubmit && "text-gray-400"} ${
                formik.errors.seats && formik.touched.seats
                  ? "border rounded border-red-400"
                  : null
              }`}
              options={[
                { value: 1, label: 1 },
                { value: 2, label: 2 },
                { value: 3, label: 3 },
                { value: 4, label: 4 },
                { value: 5, label: 5 },
              ]}
              onChange={(e) => formik.setFieldValue("seats", e.value)}
            />
          </div>
          <div className="mt-8">
            <label className=" text-xl">
              Luggage space
              <span className="text-red-500 ml-1 text-lg">*</span>
            </label>
            <div className="my-1 flex items-center gap-2">
              <div className="w-1/2">
                {formik.errors.luggage_number &&
                formik.touched.luggage_number ? (
                  <span className="block text-xs text-red-400">
                    {formik.errors.luggage_number}
                  </span>
                ) : null}
                <Select
                  styles={colourStyles}
                  isDisabled={disableInputOnSubmit}
                  className={`${
                    formik.errors.luggage_number &&
                    formik.touched.luggage_number
                      ? "border rounded border-red-400"
                      : null
                  }`}
                  components={animatedComponents}
                  placeholder="Number of luggage"
                  options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                    { value: 5, label: 5 },
                  ]}
                  onChange={(e) =>
                    formik.setFieldValue("luggage_number", e.value)
                  }
                />
              </div>
              <div className="w-1/2">
                {formik.errors.luggage_size && formik.touched.luggage_size ? (
                  <span className="block text-xs text-red-400">
                    {formik.errors.luggage_size}
                  </span>
                ) : null}
                <Select
                  components={animatedComponents}
                  styles={colourStyles}
                  isDisabled={disableInputOnSubmit}
                  placeholder="Luggage size"
                  className={`${disableInputOnSubmit && "text-gray-400"} ${
                    formik.errors.luggage_size && formik.touched.luggage_size
                      ? "border rounded border-red-400"
                      : null
                  }`}
                  options={[
                    { value: "small", label: "Small bag(s)" },
                    { value: "medium", label: "Medium bag(s)" },
                    { value: "large", label: "Large bag(s)" },
                    { value: "extra_large", label: "Extra Large bag(s)" },
                  ]}
                  onChange={(e) =>
                    formik.setFieldValue("luggage_size", e.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <button
          disabled={disableInputOnSubmit}
          type="submit"
          className={`mb-10 uppercase font-semibold py-2 w-full bg-cblue-200 text-white shadow-md hover:shadow-lg focus:opacity-[0.85] rounded ${
            disableInputOnSubmit && "opacity-50 text-gray-500"
          }`}
        >
          Submit
        </button>
        {rideId && (
          <Link
            to={`/rides/${rideId}`}
            className="italic flex items-center text-cblue-200 hover:text-cblue-100 hover:underline"
          >
            Ride published click here to see more details
            <BsArrowRightShort size={24} className="ml-1" />
          </Link>
        )}
      </form>
    </section>
  );
}
export default PublishRide;
