import React, { createContext, useContext, useState } from "react";

const OpenDivContext = createContext();

export const OpenDivProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OpenDivContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </OpenDivContext.Provider>
  );
};

export const useOpenDiv = () => {
  const context = useContext(OpenDivContext);
  if (context === undefined) {
    throw new Error("useOpenDiv must be used within an OpenDivProvider");
  }
  return context;
};
