import { useContext, useState } from "react";

import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";
import FlightClasses from "./FlightClasses";
import InputWrapper from "../../formElements/formDataList/InputWrapper";
import InputDropDown from "../../formElements/InputDropDown";
import BookingCalendar from "../BookingCalendar";
import SeatBookingDropDown from "./SeatBookingDropDown";

import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";
import { Value, days, months } from "../../../utils/data";

const RoundTripBooking = () => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails, isFocused, setIsFocused } = flightData;
  const appData = useContext(appContext);
  const { currentDate, tomorrowDate, currentDay, currentMonth, currentMonthDate } = appData;
  const [_returnDate, setReturnDate] = useState<Value>([tomorrowDate, currentDate]);
  const _date = `${days[_returnDate[0].getDay()]}, ${months[_returnDate[0].getMonth()]} ${_returnDate[0].getDate()}`;
  const handleCalendarFocus = () => {
    setIsFocused("returnCalendar");
  };
  const handleBookingFocus = () => setIsFocused("seatBooking");
  return (
    <ul className="p-0 w-100 d-flex flex-column gap-3">
      <BasicFlightFormElements focusedElements={{ departure: "departure", destination: "destination", calendar: "departCalendar" }} flightIndex={0} />
      <li className="w-100">
        <InputWrapper label="Return" icon="ph:calendar-thin">
          <InputDropDown
            name="returnDate"
            inputId="returnDate"
            value={_date}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, returnDate: e.target.value }))}
            placeHolder={`${currentDay}, ${currentMonth}, ${currentMonthDate}`}
            isFocused={isFocused === "returnCalendar"}
            handleFocus={() => handleCalendarFocus()}
          >
            <BookingCalendar showDoubleView={false} setDate={setReturnDate} value={_returnDate} selectRange={false} />
          </InputDropDown>
        </InputWrapper>
      </li>
      <li className="d-flex gap-0" style={{ height: "65px", position: "relative" }}>
        <SeatBooking inputClass="passengerCount">
          <SeatBookingDropDown handleFocus={handleBookingFocus} styles={{ position: "absolute", top: "50%", transform: "translate(-140%,-50%)", left: "50%", marginRight: "40px", display: "block", cursor: "pointer" }} />
        </SeatBooking>
        <FlightClass inputClass="flightClass" focusedInput="flightClass" flightClass={flightDetails[0].flightClass}>
          <FlightClasses defaultClass={flightDetails[0].flightClass} setFlightClass={setFlightDetails} flightIndex={0} />
        </FlightClass>
      </li>
    </ul>
  );
};

export default RoundTripBooking;
