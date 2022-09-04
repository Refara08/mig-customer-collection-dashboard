import React, { useState } from "react";

const updateCustomerDataContext = React.createContext({
  data: {},
  updateData: ({}) => {},
});

export const UpdateCustomerDataContextProvider = (props) => {
  const [oldData, setOldData] = useState({});

  const updateOldDataHandler = (data) => {
    setOldData(data);
  };

  const defaultVal = {
    data: oldData,
    updateData: updateOldDataHandler,
  };

  return (
    <updateCustomerDataContext.Provider value={defaultVal}>
      {props.children}
    </updateCustomerDataContext.Provider>
  );
};

export default updateCustomerDataContext;
