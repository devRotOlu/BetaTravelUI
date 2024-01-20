import { useState, Dispatch, SetStateAction, createContext } from "react";

import { roomGuestType } from "../../../utils/data";

type flightDetailsType = {
  depart: string;
  dest: string;
  departDate: string;
  returnDate: string;
  flightClass: string;
};
type IsFocusedType = {
  departDataList: boolean;
  destDataList: boolean;
  departDate: boolean;
  returnDate: boolean;
  seatBooking: boolean;
  flightClass: boolean;
};
type flightContextType = {
  flightDetails: flightDetailsType[];
  setFlightDetails: Dispatch<SetStateAction<flightDetailsType[]>>;
  passengerCount: roomGuestType;
  setPassengerCount: Dispatch<SetStateAction<roomGuestType>>;
  isFocused: IsFocusedType;
  setIsFocused: Dispatch<SetStateAction<IsFocusedType>>;
  blurAll: () => void;
};

export const flightContext = createContext({} as flightContextType);

type flightContextProps = {
  children: React.ReactNode;
};

const FlightContext = ({ children }: flightContextProps) => {
  const _flightDetails = {
    depart: "",
    dest: "",
    departDate: "",
    returnDate: "",
    flightClass: "",
  };
  const [isFocused, setIsFocused] = useState({
    departDataList: false,
    destDataList: false,
    departDate: false,
    returnDate: false,
    seatBooking: false,
    flightClass: false,
  });
  const blurAll = () =>
    setIsFocused({
      departDataList: false,
      destDataList: false,
      departDate: false,
      returnDate: false,
      seatBooking: false,
      flightClass: false,
    });
  const [flightDetails, setFlightDetails] = useState(() => [_flightDetails, _flightDetails]);
  const [passengerCount, setPassengerCount] = useState([{ adults: 1, children: 0, infants: 0, isIntialRender: true }]);
  return <flightContext.Provider value={{ flightDetails, setFlightDetails, passengerCount, setPassengerCount, isFocused, setIsFocused, blurAll }}>{children}</flightContext.Provider>;
};

export default FlightContext;
