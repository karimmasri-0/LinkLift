import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

function FormikWrapper({ children, ...props }) {
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };
  console.log(currentChild.props.validationSchema);
  return (
    <>
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values) => {
          if (isLastStep) {
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
          }
        }}
      >
        <div>
          {currentChild}
          {step > 0 && (
            <button onClick={() => setStep((step) => step - 1)}>Back</button>
          )}
          {step < childrenArray.length - 1 && (
            <button onClick={() => setStep((step) => step + 1)}>Next</button>
          )}
        </div>
      </Formik>
    </>
  );
}

export default FormikWrapper;
