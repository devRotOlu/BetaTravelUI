import { useContext } from "react";

import InputDropDown from "../../formElements/InputDropDown";
import PassengerCount from "./PassengerCount";

import { appContext } from "../../../context/ContextWrapper";
import { flightContext } from "../../../context/FlightContext";

type SeatBookingProps = {
  inputClass?: string;
  children: React.ReactNode;
};
const SeatBooking = ({ inputClass, children }: SeatBookingProps) => {
  const flightData = useContext(flightContext);
  const appData = useContext(appContext);

  const { isFocused, setIsFocused } = appData;
  const { passengerCount } = flightData;
  const { adults, children: _children, infants } = passengerCount[0];
  const handleFocused = () => setIsFocused("seatBooking");

  return (
    <>
      <InputDropDown name="passengers" inputId="passengerCount" inputClass={inputClass} value={`${adults + _children + infants} Passenger`} handleChange={() => {}} handleFocus={() => handleFocused()} isFocused={isFocused === "seatBooking"} readonly={true}>
        <PassengerCount />
      </InputDropDown>
      {children}
    </>
  );
};

export default SeatBooking;
