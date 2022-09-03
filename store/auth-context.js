import React, { useState, useEffect, useCallback } from "react";

//helper functions===========================================================================
let logoutTimer;

//calculate remining time untill auth expired (in miliseconds)
const calculateReminingTime = (expiredTime) => {
  const currentTime = new Date().getTime();
  const expiredTimeDate = new Date(expiredTime).getTime();

  const reminingTime = expiredTimeDate - currentTime;

  return reminingTime;
};

//retriving or replacing token every first load/refresh depending on remining time
const retriveToken = () => {
  var storedToken, storedExpiredTime;

  if (typeof window !== "undefined") {
    storedToken = localStorage.getItem("token");
    storedExpiredTime = localStorage.getItem("expiredTime");
  }

  const reminingTime = calculateReminingTime(storedExpiredTime);

  //if less than 60sec
  if (reminingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiredTime");
    return null;
  }

  return {
    token: storedToken,
    duration: reminingTime,
  };
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
  //update token everytime page reload/refresh
  const tokenData = retriveToken();

  let initialToken = tokenData ? tokenData.token : null;

  const [token, setToken] = useState(initialToken);
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

  //evaluate setTimout timer(remining time) every reload/refresh
  //useEffect is indeed needed because setTimeout on loginHandler is not being called when the page reloaded/refreshed..
  //..so setTimeout need to be called with updated remining time
  useEffect(() => {
    if (tokenData) {
      // console.log(tokenData.duration);
      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

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
