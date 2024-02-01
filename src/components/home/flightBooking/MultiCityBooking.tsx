import React, { useState, useContext } from "react";

import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";
import FlightClasses from "./FlightClasses";
import Button from "../../Button";
import SeatBookingDropDown from "./SeatBookingDropDown";
import BookingsWrapper from "../BookingsWrapper";

import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";

const MultiCityBooking = () => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails, _flightDetails, setIsFocused } = flightData;
  const appData = useContext(appContext);
  const { setNtnIsMounted, setNotificationContent } = appData;
  const [travelCount, setTravelcount] = useState(() => [{ travelId: 1 }, { travelId: 2 }]);
  const isMaxFormCount = flightDetails.length === 6;
  const handleAddFlight = () => {
    const isPrevFormsFilled = flightDetails.every(({ depart, dest }, index) => {
      if (!index) return true;
      return depart !== "" && dest !== "";
    });
    if (isPrevFormsFilled) {
      setTravelcount((prevItems) => [...prevItems, { travelId: prevItems[prevItems.length - 1].travelId + 1 }]);
      setFlightDetails((prevItems) => [...prevItems, { ..._flightDetails, flightClass: "Economy" }]);
    } else {
      setNotificationContent("Fill in the details first");
      setNtnIsMounted(true);
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

  const handleBookingFocus = () => setIsFocused("seatBooking");

  const getFlight = (index: number) => (
    <BookingsWrapper>
      <BasicFlightFormElements focusedElements={{ destination: `destination-${index}`, departure: `departure-${index}`, calendar: `calendar ${index}` }} flightIndex={index + 1} />
      <li style={{ height: "65px", position: "relative" }}>
        <FlightClass flightClass={flightDetails[index + 1].flightClass} inputClass="multiFlightClass" focusedInput={`flight-${index}`}>
          <FlightClasses defaultClass={flightDetails[index + 1].flightClass} setFlightClass={setFlightDetails} flightIndex={index + 1} />
        </FlightClass>
      </li>
    </BookingsWrapper>
  );
  const travelBookings = travelCount.map((_, index) => {
    const _key = travelCount[index].travelId;
    if (!index) return <React.Fragment key={_key}>{getFlight(index)}</React.Fragment>;
    return (
      <div key={_key}>
        {getFlight(index)}
        <Button buttonLabel="Remove" buttonType="button" handleClick={() => handleRemoveFlight(index)} buttonClass="deleteFlightBooking" />
      </div>
    );
  });
  return (
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
  );
};

export default MultiCityBooking;
