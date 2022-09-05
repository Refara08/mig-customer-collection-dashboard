import React, { useState, useCallback } from "react";

//helper functions===========================================================================
let logoutTimer;

//calculate remining time untill auth expired (in miliseconds)
const calculateReminingTime = (expiredTime) => {
  const currentTime = new Date().getTime();
  const expiredTimeDate = new Date(expiredTime).getTime();

  const reminingTime = expiredTimeDate - currentTime;

  return reminingTime;
};

//auth ctx ==================================================================
const authContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

//auth provider ============================================================
export const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiredTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expiredTime) => {
    setToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("expiredTime", expiredTime);

    const reminingTime = calculateReminingTime(expiredTime);

    logoutTimer = setTimeout(() => {
      logoutHandler();
    }, reminingTime);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
