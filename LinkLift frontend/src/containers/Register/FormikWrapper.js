import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

function FormikWrapper({ children, ...props }) {
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };
  return (
    <>
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          if (isLastStep()) {
            const postresult = await axios.post(
              `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/auth/register`,
              { ...values }
            );
            console.log(postresult);
            if (!postresult.data.error) {
              localStorage.setItem(
                "token",
                JSON.stringify(postresult.data.token)
              );
              getToken();
              navigate("/");
            }
          } else {
            setStep((step) => step + 1);
            console.log(step);
          }
        }}
      >
        <Form>
          <div className="float-right text-gray-700 text-sm mt-2 mr-2">
            {step + 1}/{childrenArray.length}
          </div>
          {currentChild}
          <div className="flex items-center justify-between">
            {step > 0 && (
              <button
                className="px-4 py-2 bg-gray-600/70 hover:bg-gray-600/60 text-white rounded-md shadow-md hover:shadow-lg"
                onClick={() => setStep((step) => step - 1)}
              >
                Back
              </button>
            )}
            <button
              className="px-4 py-2 bg-cblue-200 hover:bg-cblue-200/90 rounded-md text-white shadow-md hover:shadow-lg focus:opacity-[0.85]"
              type="submit"
            >
              Next
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default FormikWrapper;
