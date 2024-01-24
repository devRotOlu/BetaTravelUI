import { useContext } from "react";

import InputDropDown from "../../formElements/InputDropDown";
import PassengerCount from "./PassengerCount";

import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { flightContext } from "../../../context/FlightContext";

type SeatBookingProps = {
  inputClass?: string;
  children: React.ReactNode;
};
const SeatBooking = ({ inputClass, children }: SeatBookingProps) => {
  const flightData = useContext(flightContext);
  const { passengerCount, blurAll, isFocused, setIsFocused } = flightData;
  const { adults, children: _children, infants } = passengerCount[0];
  useAllisBlurred(blurAll);
  const handleFocused = () => setIsFocused("seatBooking");

  return (
    <>
      <InputDropDown name="passengers" inputId="passengerCount" inputClass={inputClass} value={`${adults + _children + infants} Passenger`} handleChange={() => {}} handleFocus={() => handleFocused()} isFocused={isFocused === "seatBooking"}>
        <PassengerCount />
      </InputDropDown>
      {children}
    </>
  );
};

export default SeatBooking;
