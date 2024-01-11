import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";

const OneWayBooking = () => {
  return (
    <ul className="p-0 w-100 d-flex flex-column gap-3">
      <BasicFlightFormElements />
      <SeatBooking />
    </ul>
  );
};

export default OneWayBooking;
