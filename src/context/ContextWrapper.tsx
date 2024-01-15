import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { flightTabLinks, months, days } from "../utils/data";
import { getRouteLocationIndex } from "../utils/helperFunctions/helperFunction";

type AppContextType = {
  flightLink: string;
  currentDate: Date;
  currentMonth: string;
  currentDay: string;
  currentMonthDate: number;
};

type ContextProps = {
  children: React.ReactNode;
};

export const appContext = React.createContext({} as AppContextType);

const ContextWrapper = ({ children }: ContextProps) => {
  const location = useLocation();
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = days[currentDate.getDay()];
  const currentMonthDate = currentDate.getDate();

  const { pathname } = location;

  const [flightLink, setFlightLink] = useState("");

  useEffect(() => {
    const routeIndex = getRouteLocationIndex(pathname, flightTabLinks, 3);
    if (routeIndex >= 0 && pathname.includes("flight")) {
      setFlightLink(flightTabLinks[routeIndex].link);
    }
  }, [pathname]);

  return <appContext.Provider value={{ flightLink, currentDate, currentDay, currentMonth, currentMonthDate }}>{children}</appContext.Provider>;
};

export default ContextWrapper;
