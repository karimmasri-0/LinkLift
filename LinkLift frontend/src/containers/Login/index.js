import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_IP);
    const res = await axios.post(
      `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/v1/users/login`,
      {
        email: email,
        password: password,
      }
    );
    console.log(res);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center mt-20">
        <div className="border-2 rounded-2xl shadow-xl border-cblue-100 pb-5 pt-20 px-12">
          <div className="grid grid-cols-2 gap-24">
            <div className="flex justify-center items-center w-fit">
              <img src={logo} className="w-48" alt="Logo" />
            </div>
            <form
              onSubmit={submitForm}
              className="flex flex-col items-center justify-center gap-4"
            >
              <InputField
                email={email}
                setEmail={setEmail}
                type={"email"}
                label={"Email"}
              />
              <InputField
                password={password}
                setPassword={setPassword}
                type={"password"}
                label={"Password"}
              />
              <button
                type={"submit"}
                className="bg-cblue-100 text-white w-full px-4 py-2 rounded"
              >
                Login
              </button>
              <div className="flex items-center w-fit">
                <div className="border-b-2 w-24 mt-1"></div>
                <div className="text-gray-400 h-fit">or</div>
                <div className="border-b-2 w-24 mt-1"></div>
              </div>
              <div className="flex items-center px-3 py-2 shadow-md rounded mt-2">
                <FcGoogle className="relative mx-3" />
                <button>Sign in with google</button>
              </div>
            </form>
          </div>
          <div className="pt-10 text-center text-sm">
            Don't have account?{" "}
            <Link
              to={"/register"}
              className=" italic underline text-cblue-100 hover:text-cblue-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
