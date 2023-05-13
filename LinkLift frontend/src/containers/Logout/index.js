import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import Home from "../../containers/Home";

function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("position");
      getToken();
      setLoggedOut(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loggedOut) {
    return (
      <>
        <Navigate to="/" replace={true} />
      </>
    );
  }

  return null;
}

export default Logout;
