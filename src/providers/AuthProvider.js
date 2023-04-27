// import axios from "axios";
// import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    if (!token) getToken();
    if (!userData) getUserData();
  }, [token, userData]);

  const getToken = async () => {
    try {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        // const tempToken = JSON.parse(localStorage.getItem("token"));
        // const response = await axios.post(
        //   `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/auth/check-token`,
        //   { token: tempToken }
        // );
        // if (!response.data.error)
        //   if (
        //     jwtDecode(tempToken).exp < Math.floor(new Date().getTime() / 1000)
        //   ) {
        //     localStorage.setItem("token", null);
        //     setToken(null);
        //   } else {
        //     setToken(tempToken);
        //   }
      }
    } catch (error) {
      // console.log("Auth Provider ", error);
      setToken("");
    }
  };
  const getUserData = () => {
    try {
      if (localStorage.getItem("user_data"))
        setUserData(JSON.parse(localStorage.getItem("user_data")));
    } catch (error) {
      console.log(error);
      setUserData("");
    }
  };
  return (
    <AuthContext.Provider value={{ userData, token, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
