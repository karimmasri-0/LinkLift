import React, { useContext, useState } from "react";
import EmailForm from "./EmailForm";
import GenderForm from "./GenderForm";
import NameForm from "./NameForm";
import { useMultistepForm } from "./useMultistepForm.ts";
import { Link, useNavigate } from "react-router-dom";
import Password from "./Password";
import axios from "axios";
import DriverForm from "./DriverForm";
import { AuthContext } from "../../providers/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikWrapper from "./FormikWrapper";
import FormikStep from "./FormikStep";

const Register = () => {
  const formik = useFormik({
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "must be at least 6 characters long")
        .required(),
      confirmPassword: Yup.string()
        .min(6, "must be at least 6 characters long")
        .oneOf([Yup.ref("password")], "Password did not match.")
        .required(),
    }),
  });

  return (
    <FormikWrapper
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        password: "",
        confirmPassword: "",
        position: "",
      }}
      onSubmit={() => {}}
    >
      <FormikStep validationSchema={{ position: Yup.string().required() }}>
        <DriverForm />
      </FormikStep>

      <FormikStep
        validationSchema={{
          first_name: Yup.string("").required(),
          last_name: Yup.string("").required(),
        }}
      >
        <NameForm />
      </FormikStep>

      <FormikStep
        validationSchema={{ email: Yup.string().email("").required() }}
      >
        <EmailForm />
      </FormikStep>

      <FormikStep validationSchema={{ gender: Yup.string("").required() }}>
        <GenderForm />
      </FormikStep>
    </FormikWrapper>
  );
};

export default Register;
