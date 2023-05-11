import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

function Logout() {
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  useEffect(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("position");
      getToken();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return;
}

export default Logout;
