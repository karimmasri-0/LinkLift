import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (!token) getToken();
  }, [token]);

  const getToken = async () => {
    try {
      if (localStorage.getItem("token")) {
        const tempToken = JSON.parse(localStorage.getItem("token"));
        if (
          jwtDecode(tempToken).exp < Math.floor(new Date().getTime() / 1000)
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("position");
          setToken("");
          setPosition("");
        } else {
          setToken(tempToken);
          setPosition(jwtDecode(tempToken).position);
        }
      } else {
        setToken("");
        setPosition("");
      }
    } catch (error) {
      console.log("Auth Provider ", error);
      setToken("");
      setPosition("");
    }
  };

  return (
    <AuthContext.Provider value={{ token, getToken, position }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
