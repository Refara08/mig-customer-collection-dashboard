import React, { useState, useEffect } from "react";

const NotificationContext = React.createContext({
  status: null,
  message: null,
  updateStatus: () => {},
  updateMessage: () => {},
});

export const NotificationContextProvider = (props) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        setStatus(null);
        setMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  const updateStatusHandler = (status) => {
    setStatus(status);
  };

  const updateMessageHandler = (message) => {
    setMessage(message);
  };

  const defaultVal = {
    status,
    message,
    updateStatus: updateStatusHandler,
    updateMessage: updateMessageHandler,
  };

  return (
    <NotificationContext.Provider value={defaultVal}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
