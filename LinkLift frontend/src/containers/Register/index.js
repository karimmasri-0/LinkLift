import React, { useContext, useState } from "react";
import AddressForm from "./AddressForm";
import AgeForm from "./AgeForm";
import EmailForm from "./EmailForm";
import GenderForm from "./GenderForm";
import NameForm from "./NameForm";
import { useMultistepForm } from "./useMultistepForm.ts";
import { Link, useNavigate } from "react-router-dom";
import Password from "./Password";
import axios from "axios";
import DriverForm from "./DriverForm";
import PhoneNumberForm from "./PhoneNumberForm";
import { AuthContext } from "../../providers/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";

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

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    password_confirm: "",
    phone_number: "",
    position: "",
  });
  const updateData = (newData) => {
    setData((oldData) => {
      return { ...oldData, ...newData };
    });
  };
  const { currentStepIndex, step, steps, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <EmailForm {...data} updateData={updateData} />,
      <NameForm {...data} updateData={updateData} />,
      <PhoneNumberForm {...data} updateData={updateData} />,
      <AgeForm {...data} updateData={updateData} />,
      <GenderForm {...data} updateData={updateData} />,
      <DriverForm {...data} updateData={updateData} />,
      <AddressForm {...data} updateData={updateData} />,
      <Password {...data} updateData={updateData} />,
    ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLastStep) {
      if (currentStepIndex === 0 && data.email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(data.email)) return;
      }
      if (currentStepIndex === 2)
        if (
          !data.phone_number ||
          !/^[0-9]+$/.test(data.phone_number) ||
          data.phone_number.length < 8 ||
          data.phone_number.length > 12
        )
          return;

      if (currentStepIndex === 3 && !data.age) return;
      if (currentStepIndex === 4 && !data.gender) return;
      if (currentStepIndex === 5 && data.password !== data.password_confirm)
        return;

      next();
    } else {
      console.warn("Finished setting up");
      const postresult = await axios.post(
        `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/auth/register`,
        { ...data }
      );
      console.log(postresult);
      if (!postresult.data.error) {
        localStorage.setItem("token", JSON.stringify(postresult.data.token));
        getToken();
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="px-6 mt-10 relative sm:w-2/3 md:w-3/6 lg:w-1/2">
          <div className="flex justify-between items-center ">
            <div></div>
            <div className="text-sm text-gray-500 mt-2">
              {currentStepIndex + 1}/{steps.length}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {step}
            {isLastStep && (
              <button
                type={"submit"}
                className="w-full py-2 my-5 rounded text-white bg-cblue-100 hover:shadow"
              >
                Create account
              </button>
            )}
            {isFirstStep && (
              <div className="flex text-sm text-gray-500 -mt-4">
                <div className="mr-1">Already a member? </div>
                <Link
                  to={"auth/login"}
                  className=" italic hover:text-cblue-100 hover:underline cursor-pointer"
                >
                  Login
                </Link>
              </div>
            )}
            <div className="flex justify-between items-center">
              <button
                type={"button"}
                disabled={isFirstStep}
                className={`px-4 py-2 bg-gray-400 text-white rounded-lg ${
                  isFirstStep && "opacity-0 cursor-default"
                }`}
                onClick={back}
              >
                Back
              </button>
              <button
                type={"submit"}
                disabled={isLastStep}
                className={`px-4 py-2 bg-cblue-100 text-white rounded-lg ${
                  isLastStep && "opacity-0 cursor-default "
                }`}
              >
                Next
              </button>
            </div>
          </form>
          <div className="flex flex-row items-center my-10">
            <div className="border border-gray-300 w-full mt-1 border-b"></div>
            <div className="text-gray-400">or</div>
            <div className="border border-gray-300 w-full mt-1 border-b"></div>
          </div>
          <div className="flex justify-center mt-5 mb-28">
            {/* <button
            onClick={googleLogin}
            className="px-8 py-3 text-gray-800 shadow-lg rounded-lg flex items-center gap-2 justify-center mt-5 mb-28  border border-cblue-100 hover:bg-cblue-100 hover:border-red-200 hover:text-white "
          >
            Sign in with google
            <FcGoogle size={22} />
          </button> */}
            <GoogleLogin
              onSuccess={(response) => {
                handleGoogleSuccessCallback(response);
              }}
              onError={(error) => {
                handleGoogleFailedCallback(error);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
