import React, { useEffect } from "react";

type AppContextType = {};

export const appContext = React.createContext({} as AppContextType);

const ContextWrapper = () => {
  return <appContext.Provider value={{}}>ContextWrapper</appContext.Provider>;
};

export default ContextWrapper;
