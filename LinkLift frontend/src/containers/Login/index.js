import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileTextInput from "../Profile/ProfileTextInput";

const Login = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onsubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <section className="flex min-h-[100vh] items-center -mt-20 justify-center bg-gray-200">
      <div className="bg-white rounded-lg pb-12 w-96">
        <div className="relative mb-8 w-full h-12 text-xl font-semibold bg-cblue-200 text-white rounded-t-lg">
          <h2 className="absolute px-8 pt-2 bg-white rounded-lg text-black top-5 left-5">
            Log Into LinkLift
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
          className="px-8 space-y-6"
        >
          <ProfileTextInput
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            touched={formik.touched.email}
            error={formik.errors.email}
            placeholder={"Your Email"}
            required={true}
          />
          <ProfileTextInput
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            touched={formik.touched.password}
            error={formik.errors.password}
            placeholder={"Your Password"}
            required={true}
          />
          <button
            type="submit"
            className="w-full py-3 mt-6 rounded-lg text-white shadow-md hover:shadow-lg bg-cblue-200"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
