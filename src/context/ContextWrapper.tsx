import React, { useState, useMemo, SetStateAction } from "react";

import Notification from "../components/home/flightBooking/Notification";

import { months, days, signupDetailsType, signinDetailsType } from "../utils/data";

type AppContextType = {
  currentDate: Date;
  tomorrowDate: Date;
  currentMonth: string;
  currentDay: string;
  currentMonthDate: number;
  setNotificationContent: React.Dispatch<SetStateAction<string>>;
  setNtnIsMounted: React.Dispatch<SetStateAction<boolean>>;
  signupDetails: signupDetailsType;
  setSignupDetails: React.Dispatch<SetStateAction<signupDetailsType>>;
  signinDetails: signinDetailsType;
  setSigninDetails: React.Dispatch<SetStateAction<signinDetailsType>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<SetStateAction<boolean>>;
};

type ContextProps = {
  children: React.ReactNode;
};

export const appContext = React.createContext({} as AppContextType);

const ContextWrapper = ({ children }: ContextProps) => {
  const [notificationContent, setNotificationContent] = useState("");
  const [ntnIsMounted, setNtnIsMounted] = useState(false);
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

  const currentDate = useMemo(() => new Date(), []);
  const currentMonth = months[currentDate.getMonth()];
  const currentDay = days[currentDate.getDay()];
  const currentMonthDate = currentDate.getDate();
  const tomorrowDate = useMemo(() => {
    const currentYear = currentDate.getFullYear();
    const dayIncreament = new Date(`${currentYear}-${currentMonth}-${currentMonthDate + 1}`);
    const monthIncreament = new Date(`${currentYear}-${months[currentDate.getMonth() + 1]}-1`);
    const yearIncreament = new Date(`${currentYear + 1}-1-1`);
    if (isNaN(dayIncreament.getTime()) === false) return dayIncreament;
    if (isNaN(monthIncreament.getTime()) === false) return monthIncreament;
    return yearIncreament;
  }, [currentMonth, currentDate, currentMonthDate]);

  return (
    <appContext.Provider value={{ currentDate, currentDay, currentMonth, currentMonthDate, tomorrowDate, setNtnIsMounted, setNotificationContent, signupDetails, setSignupDetails, signinDetails, setSigninDetails, isSignedIn, setIsSignedIn }}>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        {children}
        {ntnIsMounted && <Notification content={notificationContent} mount={setNtnIsMounted} />}
      </div>
    </appContext.Provider>
  );
};

export default ContextWrapper;
