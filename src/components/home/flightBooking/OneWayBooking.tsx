import { useContext } from "react";

import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";
import FlightClasses from "./FlightClasses";
import SeatBookingDropDown from "./SeatBookingDropDown";
import BookingsWrapper from "../BookingsWrapper";

import { flightContext } from "../../../context/FlightContext";

const focusedElement = { departure: "departure", destination: "destination", calendar: "departCalendar" };

const OneWayBooking = () => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails, setIsFocused } = flightData;
  const handleFocus = () => setIsFocused("seatBooking");
  return (
    <BookingsWrapper>
      <BasicFlightFormElements focusedElements={focusedElement} flightIndex={0} />
      <li className="d-flex gap-0" style={{ height: "65px", position: "relative" }}>
        <SeatBooking inputClass="passengerCount">
          <SeatBookingDropDown handleFocus={handleFocus} styles={{ position: "absolute", top: "50%", transform: "translate(-140%,-50%)", left: "50%", marginRight: "40px", display: "block", cursor: "pointer" }} />
        </SeatBooking>
        <FlightClass inputClass="flightClass" focusedInput="flightClass" flightClass={flightDetails[0].flightClass}>
          <FlightClasses defaultClass={flightDetails[0].flightClass} setFlightClass={setFlightDetails} flightIndex={0} />
        </FlightClass>
      </li>
    </BookingsWrapper>
  );
};

export default OneWayBooking;
