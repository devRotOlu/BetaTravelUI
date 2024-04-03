import { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";

import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";
import ClassList from "./ClassList";
import InputWrapper from "../../formElements/formDataList/InputWrapper";
import InputDropDown from "../../formElements/InputDropDown";
import BookingCalendar from "../BookingCalendar";
import SeatBookingDropDown from "./SeatBookingDropDown";
import BookingsWrapper from "../BookingsWrapper";
import BookingForm from "../../formElements/BookingForm";
import Button from "../../Button";

import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";

const focusedElement = { departure: "departure", destination: "destination", calendar: "departCalendar" };

const RoundTripBooking = () => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails, flightClasses } = flightData;
  const appData = useContext(appContext);
  const { currentDay, currentMonth, currentMonthDate, isFocused, setIsFocused, blurAll, commaDelimitedDate } = appData;

  const { flightClassIndex, returnDate, departDate } = flightDetails[0];

  const _returnDate = commaDelimitedDate(returnDate);

  const handleCalendarFocus = () => {
    setIsFocused("returnCalendar");
  };
  const handleBookingFocus = () => setIsFocused("seatBooking");

  useEffect(
    () =>
      setFlightDetails((prevDetails) => {
        return prevDetails.map((details, index) => {
          if (!index) {
            return { ...details, returnDate: departDate };
          }
          return details;
        });
      }),
    [departDate, setFlightDetails]
  );
  const handleSubmit = () => {};
  const handleReturnDate = (date: Date) => {
    setFlightDetails((prevState) => {
      return prevState.map((details, index) => {
        if (!index) {
          return { ...details, returnDate: date };
        }
        return details;
      });
    });
  };
  useAllisBlurred(blurAll);
  return (
    <BookingForm handleSubmit={handleSubmit}>
      <BookingsWrapper>
        <BasicFlightFormElements focusedElements={focusedElement} flightIndex={0} />
        <li className="w-100">
          <InputWrapper label="Return" icon="ph:calendar-thin">
            <InputDropDown name="returnDate" inputId="returnDate" value={_returnDate} placeHolder={`${currentDay}, ${currentMonth}, ${currentMonthDate}`} isFocused={isFocused === "returnCalendar"} handleFocus={() => handleCalendarFocus()} readonly={true}>
              <BookingCalendar showDoubleView={false} setDate={handleReturnDate} selectRange={false} />
            </InputDropDown>
          </InputWrapper>
        </li>
        <li className="d-flex gap-0" style={{ height: "65px", position: "relative" }}>
          <SeatBooking inputClass="passengerCount">
            <SeatBookingDropDown handleFocus={handleBookingFocus} styles={{ position: "absolute", top: "50%", transform: "translate(-140%,-50%)", left: "50%", marginRight: "40px", display: "block", cursor: "pointer" }} />
          </SeatBooking>
          <FlightClass inputClass="flightClass" focusedInput="flightClass" flightClass={flightClasses[flightClassIndex]}>
            <ClassList defaultClass={flightClasses[flightClassIndex]} setFlightClass={setFlightDetails} flightIndex={0} />
          </FlightClass>
        </li>
      </BookingsWrapper>
      <Button buttonLabel="Search Flights" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
    </BookingForm>
  );
};

export default RoundTripBooking;
