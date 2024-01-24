import { useState, Dispatch, SetStateAction, createContext, useCallback } from "react";

import { roomGuestType, flightDetailsType } from "../utils/data";

type flightContextType = {
  _flightDetails: flightDetailsType;
  flightDetails: flightDetailsType[];
  setFlightDetails: Dispatch<SetStateAction<flightDetailsType[]>>;
  passengerCount: roomGuestType;
  setPassengerCount: Dispatch<SetStateAction<roomGuestType>>;
  isFocused: string;
  setIsFocused: Dispatch<SetStateAction<string>>;
  blurAll: () => void;
};

export const flightContext = createContext({} as flightContextType);

type flightContextProps = {
  children: React.ReactNode;
};

const _flightDetails = {
  depart: "",
  dest: "",
  departDate: "",
  returnDate: "",
  flightClass: "",
};

const FlightContext = ({ children }: flightContextProps) => {
  const [isFocused, setIsFocused] = useState("");
  const [flightDetails, setFlightDetails] = useState(() => [
    { ..._flightDetails, flightClass: "First Class" },
    { ..._flightDetails, flightClass: "Premium Economy" },
    { ..._flightDetails, flightClass: "Economy" },
  ]);
  const [passengerCount, setPassengerCount] = useState([{ adults: 1, children: 0, infants: 0, isIntialRender: true }]);
  const blurAll = useCallback(() => setIsFocused(""), []);
  return <flightContext.Provider value={{ flightDetails, setFlightDetails, passengerCount, setPassengerCount, isFocused, setIsFocused, blurAll, _flightDetails }}>{children}</flightContext.Provider>;
};

export default FlightContext;
