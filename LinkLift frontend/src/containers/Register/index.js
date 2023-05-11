import React, { useContext } from "react";
import * as Yup from "yup";
import FormikWrapper from "./FormikWrapper";
import FormikStep from "./FormikStep";
import TextInput from "../../components/TextInput";
import DriverForm from "./DriverForm";
import GenderForm from "./GenderForm";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const handleGoogleSuccessCallback = async (response) => {
    const res = await axios.post(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/auth/google-login`,
      { googleCredentialResponse: response.credential }
    );
    console.log(response);
    if (res.status === 201) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      localStorage.setItem("user_data", JSON.stringify(res.data.data));
      getToken();
      navigate("/");
    }
  };

  const handleGoogleFailedCallback = (error) => {
    console.log(error);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <div className="px-6 mt-10 relative sm:w-2/3 md:w-3/6 lg:w-1/2">
        <div>
          <FormikWrapper
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              gender: "",
              password: "",
              password_confirm: "",
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
                  .required("First name required"),
                last_name: Yup.string()
                  .min(3, "Last name must be at least 3 characters long")
                  .max(20, "Last name must be less than 20 characters long")
                  .required("Last name required"),
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
                password_confirm: Yup.string()
                  .min(6, "Password must be at least 6 characters long")
                  .oneOf([Yup.ref("password")], "Password did not match")
                  .required("Password did not match"),
              })}
            >
              <TextInput name="password" type="password" label={"Password"} />
              <TextInput
                name="password_confirm"
                type="password"
                label={"Confirm Password"}
              />
            </FormikStep>
          </FormikWrapper>
        </div>
      </div>
      <div className="inline-flex items-center justify-center w-full my-6">
        <hr className="w-1/3  h-px my-8 bg-gray-400 border-0 " />
        <span className="absolute pb-1 px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2 ">
          or
        </span>
      </div>
      <div className="flex justify-center mt-5 mb-28">
        <GoogleLogin
          onSuccess={(response) => {
            handleGoogleSuccessCallback(response);
          }}
          onError={(error) => {
            handleGoogleFailedCallback(error);
          }}
        />
      </div>
    </section>
  );
};

export default Register;
