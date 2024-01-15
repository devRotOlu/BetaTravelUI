import { useContext } from "react";
import { Icon } from "@iconify/react";

import InputDropDown from "../../formElements/InputDropDown";
import PassengerCount from "./PassengerCount";

import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { flightContext } from "./FlightContext";

type SeatBookingProps = {
  inputClass?: string;
};
const SeatBooking = ({ inputClass }: SeatBookingProps) => {
  const flightData = useContext(flightContext);
  const {
    passengerCount: { adults, children, infants },
    blurAll,
    isFocused: { seatBooking },
    setIsFocused,
  } = flightData;
  useAllisBlurred(blurAll);
  const handleFocused = () => {
    setIsFocused({
      seatBooking: true,
      departDate: false,
      returnDate: false,
      flightClass: false,
      departDataList: false,
      destDataList: false,
    });
  };
  return (
    <InputDropDown name="passengers" inputId="passengerCount" inputClass={inputClass} value={`${adults + children + infants} Passenger`} handleChange={() => {}} handleFocus={() => handleFocused()} isFocused={seatBooking}>
      <PassengerCount />
    </InputDropDown>
  );
};

export default SeatBooking;

{
  /* <span style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "10px" }}>
<Icon icon="bxs:down-arrow" />
</span> */
}
