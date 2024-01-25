import React, { useEffect, useState, useMemo, SetStateAction } from "react";

import Notification from "../components/home/flightBooking/Notification";

import { useLocation } from "react-router-dom";

import { flightTabLinks, months, days } from "../utils/data";
import { getRouteLocationIndex } from "../utils/helperFunctions/helperFunction";

type AppContextType = {
  flightLink: string;
  currentDate: Date;
  tomorrowDate: Date;
  currentMonth: string;
  currentDay: string;
  currentMonthDate: number;
  setNotificationContent: React.Dispatch<SetStateAction<string>>;
  setNotIsMounted: React.Dispatch<SetStateAction<boolean>>;
};

type ContextProps = {
  children: React.ReactNode;
};

export const appContext = React.createContext({} as AppContextType);

const ContextWrapper = ({ children }: ContextProps) => {
  const [notificationContent, setNotificationContent] = useState("");
  const [notIsMounted, setNotIsMounted] = useState(false);
  const location = useLocation();
  const currentDate = useMemo(() => new Date(), []);
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = days[currentDate.getDay()];
  const currentMonthDate = currentDate.getDate();
  const tomorrowDate = useMemo(() => {
    const currentYear = currentDate.getFullYear();
    const dayIncreament = new Date(`${currentYear}-${currentMonth}-${currentMonthDate + 1}`);
    const monthIncreament = new Date(`${currentYear}-${currentDate.getMonth() + 1}-${currentMonthDate}`);
    const yearIncreament = new Date(`${currentYear + 1}-${currentMonth}-${currentMonthDate}`);
    if (dayIncreament) return dayIncreament;
    if (monthIncreament) return monthIncreament;
    return yearIncreament;
  }, [currentMonth, currentDate, currentMonthDate]);

  const { pathname } = location;

  const [flightLink, setFlightLink] = useState("");

  useEffect(() => {
    const routeIndex = getRouteLocationIndex(pathname, flightTabLinks, 3);
    console.log(pathname, "pathname");
    if (routeIndex >= 0 && pathname.includes("flight")) {
      setFlightLink(flightTabLinks[routeIndex].link);
    }
  }, [pathname]);

  return (
    <appContext.Provider value={{ flightLink, currentDate, currentDay, currentMonth, currentMonthDate, tomorrowDate, setNotIsMounted, setNotificationContent }}>
      <div style={{ position: "relative" }}>
        {children}
        {notIsMounted && <Notification content={notificationContent} mount={setNotIsMounted} />}
      </div>
    </appContext.Provider>
  );
};

export default ContextWrapper;
