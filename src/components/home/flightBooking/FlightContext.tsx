import { useState, Dispatch, SetStateAction, createContext } from "react";

type flightDetailsType = {
  depart: string;
  dest: string;
  departDate: string;
  returnDate: string;
};
type flightContextType = {
  flightDetails: flightDetailsType;
  setFlightDetails: Dispatch<SetStateAction<flightDetailsType>>;
};

export const flightContext = createContext({} as flightContextType);

type flightContextProps = {
  children: React.ReactNode;
};

const FlightContext = ({ children }: flightContextProps) => {
  const [flightDetails, setFlightDetails] = useState({
    depart: "",
    dest: "",
    departDate: "",
    returnDate: "",
  });
  return <flightContext.Provider value={{ flightDetails, setFlightDetails }}>{children}</flightContext.Provider>;
};

export default FlightContext;
