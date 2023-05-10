import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormikWrapper from "./FormikWrapper";
import FormikStep from "./FormikStep";
import TextInput from "./TextInput";
import DriverForm from "./DriverForm";
import GenderForm from "./GenderForm";

const Register = () => {
  return (
    <section className="flex justify-center">
      <div className="px-6 mt-10 relative sm:w-2/3 md:w-3/6 lg:w-1/2">
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
          <FormikStep
            title="What's your name?"
            validationSchema={Yup.object().shape({
              first_name: Yup.string()
                .min(3, "First name must be at least 3 characters long")
                .max(20, "First name must be less than 20 characters long")
                .required("First Name required"),
              last_name: Yup.string()
                .min(3, "Last name must be at least 3 characters long")
                .max(20, "Last name must be less than 20 characters long")
                .required("Last Name required"),
            })}
          >
            <TextInput name="first_name" type="text" label="First name" />
            <TextInput name="last_name" type="text" label="Last name" />
          </FormikStep>

          <FormikStep
            title={"Your first step into carpooling! What are you offering?"}
            validationSchema={Yup.object().shape({
              position: Yup.string().required("Position required"),
            })}
          >
            <DriverForm name="position" />
          </FormikStep>

          <FormikStep
            title={"What is your Email?"}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email format")
                .required("Email required"),
            })}
          >
            <TextInput name="email" type="email" label="Email" />
          </FormikStep>

          <FormikStep
            title={"What is your gender identity?"}
            validationSchema={Yup.object().shape({
              gender: Yup.string().required("Gender required"),
            })}
          >
            <GenderForm name="gender" />
          </FormikStep>

          <FormikStep
            title={"Choose a secure password"}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .required("Password required"),
              confirmPassword: Yup.string()
                .min(6, "Password must be at least 6 characters long")
                .oneOf([Yup.ref("password")], "Password did not match")
                .required("Password did not match"),
            })}
          >
            <TextInput name="password" type="password" label={"Password"} />
            <TextInput
              name="confirmPassword"
              type="password"
              label={"Confirm Password"}
            />
          </FormikStep>
        </FormikWrapper>
      </div>
    </section>
  );
};

export default Register;
