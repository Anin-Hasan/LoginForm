import { useState } from "react";
import React from "react";
import userContex from "./ContexState";

const ContextApi = ({ children }) => {
  const [login, setLogin] = useState(false);
  const setState = (state) => {
    setLogin(state);
  };
  return (
    <userContex.Provider value={{ setState, login }}>
      {children}
    </userContex.Provider>
  );
};
export default ContextApi;
