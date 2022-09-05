import React, { useState, useCallback } from "react";

const ConfirmationContext = React.createContext({
  title: null,
  isLoading: false,
  setLoading: () => {},
  updateTitle: () => {},
  requestConfig: {},
  updateRequestConfig: () => {},
});

export const ConfirmationContextProvider = (props) => {
  const [confTitle, setConfTitle] = useState(null);
  const [requestConfig, setRequestConfig] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (bool) => {
    setIsLoading(bool);
  };

  const updateConfTitle = (title) => {
    setConfTitle(title);
  };

  const updateRequestConfig = (obj) => {
    setRequestConfig(obj);
  };

  const defaultVal = {
    title: confTitle,
    isLoading,
    setLoading,
    updateTitle: updateConfTitle,
    requestConfig,
    updateRequestConfig,
  };

  return (
    <ConfirmationContext.Provider value={defaultVal}>
      {props.children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationContext;
