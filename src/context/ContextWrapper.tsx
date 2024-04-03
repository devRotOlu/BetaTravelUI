import React, { useState, useMemo, SetStateAction, useCallback } from "react";

import NotificationWrapper from "../components/notifications/NotificationWrapper";
import FlightFormNotification from "../components/notifications/FlightFormNotification";

import { months, days, signupDetailsType, signinDetailsType } from "../utils/data";

type AppContextType = {
  currentYear: number;
  currentDate: Date;
  tomorrowDate: Date;
  currentMonth: string;
  currentDay: string;
  currentMonthDate: number;
  notification: "flightForm" | "searchResultLoader" | "";
  setNotification: React.Dispatch<SetStateAction<"flightForm" | "searchResultLoader" | "">>;
  signupDetails: signupDetailsType;
  setSignupDetails: React.Dispatch<SetStateAction<signupDetailsType>>;
  signinDetails: signinDetailsType;
  setSigninDetails: React.Dispatch<SetStateAction<signinDetailsType>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<SetStateAction<boolean>>;
  flightRoute: string;
  setFlightRoute: React.Dispatch<SetStateAction<string>>;
  isFocused: string;
  setIsFocused: React.Dispatch<SetStateAction<string>>;
  blurAll: () => void;
  commaDelimitedDate: (date: Date) => string;
  dashDelimitedDate: (date: Date) => string;
};

type ContextProps = {
  children: React.ReactNode;
};

export const appContext = React.createContext({} as AppContextType);

const commaDelimitedDate = (date: Date): string => {
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
};

const dashDelimitedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month / 10 < 1 ? `0${month}` : month}-${day / 10 < 1 ? `0${day}` : day}`;
};

const ContextWrapper = ({ children }: ContextProps) => {
  const [flightRoute, setFlightRoute] = useState("");
  const [notification, setNotification] = useState<"flightForm" | "searchResultLoader" | "">("");
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFocused, setIsFocused] = useState("");

  const blurAll = useCallback(() => setIsFocused(""), []);
  const currentDate = useMemo(() => new Date(), []);
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = days[currentDate.getDay()];
  const currentMonthDate = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const tomorrowDate = useMemo(() => {
    const dayIncreament = new Date(`${currentYear}-${currentMonth}-${currentMonthDate + 1}`);
    const monthIncreament = new Date(`${currentYear}-${months[currentDate.getMonth() + 1]}-1`);
    const yearIncreament = new Date(`${currentYear + 1}-1-1`);
    if (isNaN(dayIncreament.getTime()) === false) return dayIncreament;
    if (isNaN(monthIncreament.getTime()) === false) return monthIncreament;
    return yearIncreament;
  }, [currentYear, currentMonth, currentMonthDate, currentDate]);

  return (
    <appContext.Provider
      value={{
        currentDate,
        currentDay,
        currentMonth,
        currentMonthDate,
        tomorrowDate,
        currentYear,
        setNotification,
        notification,
        signupDetails,
        setSignupDetails,
        signinDetails,
        setSigninDetails,
        isSignedIn,
        setIsSignedIn,
        setFlightRoute,
        flightRoute,
        isFocused,
        setIsFocused,
        blurAll,
        commaDelimitedDate,
        dashDelimitedDate,
      }}
    >
      <div id="mainWrap" style={{ position: "relative", minHeight: "100vh" }}>
        {children}
        {notification === "flightForm" && (
          <NotificationWrapper>
            <FlightFormNotification />
          </NotificationWrapper>
        )}
      </div>
    </appContext.Provider>
  );
};

export default ContextWrapper;
