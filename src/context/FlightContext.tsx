import { useState, Dispatch, SetStateAction, createContext, useReducer, useContext, useMemo } from "react";

import { appContext } from "./ContextWrapper";
import { roomGuestReducer } from "../utils/helperFunctions/roomGuestReducer";
import { roomGuestType, flightDetailsType, RoomGuestAction } from "../utils/data";

type flightContextType = {
  _flightDetails: flightDetailsType;
  flightDetails: flightDetailsType[];
  setFlightDetails: Dispatch<SetStateAction<flightDetailsType[]>>;
  passengerCount: roomGuestType;
  passengerCountReducer: React.Dispatch<RoomGuestAction>;
  flightBookingUrl: string;
  flightBookingHeaders: { "X-RapidAPI-Key": string; "X-RapidAPI-Host": string };
  wardsAgeList: string | undefined;
  flightClasses: string[];
};

const flightClasses = ["Economy", "Premium Economy", "Business Class", "First Class"];

export const flightContext = createContext({} as flightContextType);

type flightContextProps = {
  children: React.ReactNode;
};

const locationDetails = {
  location: "",
  country: "",
  city: "",
  AirportCode: "",
};

const _flightDetails = {
  depart: locationDetails,
  dest: locationDetails,
  departDate: new Date(),
  returnDate: new Date(),
  flightClassIndex: flightClasses.length - 1,
};

/**
 * database_name : neophoen_wp1
 * user_name: neophoen
 * password:rotimi__1989
 * Tripadvisor
 * Booking COM
 */

const flightBookingHost = "booking-com15.p.rapidapi.com";
const flightBookingUrl = `https://${flightBookingHost}/api/v1/flights/searchFlights`;
const flightBookingHeaders = {
  "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
  "X-RapidAPI-Host": flightBookingHost,
};

const FlightContext = ({ children }: flightContextProps) => {
  const appData = useContext(appContext);
  const { flightRoute } = appData;

  const [flightDetails, setFlightDetails] = useState(() => [
    { ..._flightDetails, flightClassIndex: flightClasses.length - 1 },
    { ..._flightDetails, flightClassIndex: 1 },
    { ..._flightDetails, flightClassIndex: 0 },
  ]);

  /*To ensure that when the removeable form of the 2 default forms in the multi-city is removed, it's replaced on re-visting the page*/
  if (flightRoute !== "multi-city" && flightDetails.length < 3) {
    setFlightDetails((prevDetails) => [...prevDetails, { ..._flightDetails, flightClass: "Economy" }]);
  }

  const [passengerCount, passengerCountReducer] = useReducer(roomGuestReducer, [{ adults: 1, children: 0, infants: 0, isIntialRender: true }]);

  const { children: _children, infants } = passengerCount[0];

  const wardsCount = _children + infants;

  const wardsAgeList = useMemo(() => {
    if (wardsCount > 0) {
      let ageList = "";
      for (let index = 0; index < wardsCount; index++) {
        if (index < wardsCount - 1) ageList += "7, ";
        else ageList += "7";
      }
      return ageList;
    }
    return undefined;
  }, [wardsCount]);

  return <flightContext.Provider value={{ flightDetails, setFlightDetails, passengerCount, passengerCountReducer, _flightDetails, flightBookingHeaders, flightBookingUrl, wardsAgeList, flightClasses }}>{children}</flightContext.Provider>;
};

export default FlightContext;
