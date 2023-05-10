import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user_data");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }, []);
  return;
}

export default Logout;
