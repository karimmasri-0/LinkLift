import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (!token) getToken();
    if (!userData) getUserData();
  }, [token, userData]);

  const getToken = async () => {
    try {
      if (localStorage.getItem("token")) {
        const tempToken = localStorage.getItem("token");
        if (
          jwtDecode(tempToken).exp < Math.floor(new Date().getTime() / 1000)
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("position");
          setToken("");
        } else {
          setToken(JSON.parse(tempToken));
        }
      } else {
        setToken("");
      }
      if (localStorage.getItem("position")) {
        setPosition(localStorage.getItem("role"));
      } else {
        setPosition("");
      }
    } catch (error) {
      console.log("Auth Provider ", error);
      setToken("");
    }
  };
  const getUserData = () => {
    try {
      if (localStorage.getItem("user_data"))
        console.log(localStorage.getItem("user_data"));
      setUserData(JSON.parse(localStorage.getItem("user_data")));
    } catch (error) {
      console.log(error);
      setUserData("");
    }
  };
  return (
    <AuthContext.Provider value={{ userData, token, getToken, position }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
