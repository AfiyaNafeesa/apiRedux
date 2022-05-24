import axios from "axios";
import React, { createContext, useState } from "react";
import App from "../App";

export const RootContext = createContext();

export const RootProvider = () => {
  const [nation, setNation] = useState("NL");
  const [gender, setGender] = useState("All");

  return (
    <RootContext.Provider
      value={{ nation, setNation, gender, setGender }}>
      <App />
    </RootContext.Provider>
  );
};
