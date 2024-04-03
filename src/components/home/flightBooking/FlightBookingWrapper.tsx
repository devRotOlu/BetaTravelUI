import FlightBooking from "./FlightBooking";
import FlightContext from "../../../context/FlightContext";

const FlightBookingWrapper = () => {
  return (
    <FlightContext>
      <FlightBooking />
    </FlightContext>
  );
};

export default FlightBookingWrapper;
