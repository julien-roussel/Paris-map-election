import { createContext, useContext, useState, useEffect } from "react";

const ElectionsContext = createContext();

export const ElectionsProvider = ({ children }) => {




  return (
    <ElectionsContext.Provider value={{  }}>
      {children}
    </ElectionsContext.Provider>
  )
}

export const usePanier = () => useContext(ElectionsContext);
