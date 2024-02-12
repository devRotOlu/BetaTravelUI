import { useState, Dispatch, SetStateAction, createContext, useCallback, useReducer } from "react";

import { roomGuestReducer } from "../utils/helperFunctions/roomGuestReducer";
import { roomGuestType, flightDetailsType, RoomGuestAction } from "../utils/data";

type flightContextType = {
  _flightDetails: flightDetailsType;
  flightDetails: flightDetailsType[];
  setFlightDetails: Dispatch<SetStateAction<flightDetailsType[]>>;
  passengerCount: roomGuestType;
  passengerCountReducer: React.Dispatch<RoomGuestAction>;
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
  const [passengerCount, passengerCountReducer] = useReducer(roomGuestReducer, [{ adults: 1, children: 0, infants: 0, isIntialRender: true }]);
  const blurAll = useCallback(() => setIsFocused(""), []);
  return <flightContext.Provider value={{ flightDetails, setFlightDetails, passengerCount, passengerCountReducer, isFocused, setIsFocused, blurAll, _flightDetails }}>{children}</flightContext.Provider>;
};

export default FlightContext;
