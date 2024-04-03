import React, { useState, useContext } from "react";
import { Icon } from "@iconify/react";

import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";
import ClassList from "./ClassList";
import Button from "../../Button";
import SeatBookingDropDown from "./SeatBookingDropDown";
import BookingsWrapper from "../BookingsWrapper";
import BookingForm from "../../formElements/BookingForm";

import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";

const MultiCityBooking = () => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails, _flightDetails, flightClasses } = flightData;
  const appData = useContext(appContext);
  const { setNotification, setIsFocused, blurAll } = appData;
  const [travelCount, setTravelcount] = useState(() => [{ travelId: 1 }, { travelId: 2 }]);
  const isMaxFormCount = flightDetails.length === 6;
  const handleAddFlight = () => {
    const isPrevFormsFilled = flightDetails.every(({ depart: { location: departLocation }, dest: { location: destLocation } }, index) => {
      if (!index) return true;
      return departLocation !== "" && destLocation !== "";
    });
    if (isPrevFormsFilled) {
      setTravelcount((prevItems) => [...prevItems, { travelId: prevItems[prevItems.length - 1].travelId + 1 }]);
      setFlightDetails((prevItems) => [...prevItems, { ..._flightDetails, flightClass: "Economy" }]);
    } else {
      setNotification("flightForm");
    }
  };
  const handleRemoveFlight = (index: number) => {
    setTravelcount((prevItems) => {
      return prevItems.filter((_, _index) => _index !== index);
    });
    setFlightDetails((prevItems) => {
      return prevItems.filter((_, _index) => _index !== index + 1);
    });
  };

  useAllisBlurred(blurAll);

  const handleBookingFocus = () => setIsFocused("seatBooking");

  const getFlight = (index: number) => {
    const { flightClassIndex } = flightDetails[index + 1];
    return (
      <BookingsWrapper>
        <BasicFlightFormElements focusedElements={{ destination: `destination-${index}`, departure: `departure-${index}`, calendar: `calendar ${index}` }} flightIndex={index + 1} />
        <li style={{ height: "65px", position: "relative" }}>
          <FlightClass flightClass={flightClasses[flightClassIndex]} inputClass="multiFlightClass" focusedInput={`flight-${index}`}>
            <ClassList defaultClass={flightClasses[flightClassIndex]} setFlightClass={setFlightDetails} flightIndex={index + 1} />
          </FlightClass>
        </li>
      </BookingsWrapper>
    );
  };
  const travelBookings = travelCount.map(({ travelId }, index) => {
    const _key = travelId;
    if (!index) return <React.Fragment key={_key}>{getFlight(index)}</React.Fragment>;
    return (
      <div key={_key}>
        {getFlight(index)}
        <Button buttonLabel="Remove" buttonType="button" handleClick={() => handleRemoveFlight(index)} buttonClass="deleteFlightBooking" />
      </div>
    );
  });
  const handleSubmit = () => {};
  return (
    <BookingForm handleSubmit={handleSubmit}>
      <div className="d-flex gap-4 flex-column">
        {travelBookings}
        <div className="d-flex gap-3 flex-column">
          {!isMaxFormCount && <Button buttonLabel="Add Flight" buttonClass="addFlight" buttonType="button" handleClick={() => handleAddFlight()} />}
          <div style={{ position: "relative", height: "65px" }}>
            <SeatBooking inputClass="passengerCount multipassengerCount">
              <SeatBookingDropDown handleFocus={handleBookingFocus} styles={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: "10px", display: "block", cursor: "pointer" }} />
            </SeatBooking>
          </div>
        </div>
      </div>
      <Button buttonLabel="Search Flights" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
    </BookingForm>
  );
};

export default MultiCityBooking;
