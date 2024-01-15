import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";

const OneWayBooking = () => {
  return (
    <ul className="p-0 w-100 d-flex flex-column gap-3">
      <BasicFlightFormElements index={0} />
      <li className="d-flex gap-0" style={{ height: "65px", position: "relative" }}>
        <SeatBooking inputClass="passengerCount" />
        <FlightClass inputClass="flightClass" index={0} />
      </li>
    </ul>
  );
};

export default OneWayBooking;
