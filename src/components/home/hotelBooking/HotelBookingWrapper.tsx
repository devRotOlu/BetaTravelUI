import HotelContext from "./HotelContext";
import HotelBooking from "./HotelBooking";

const HotelBookingWrapper = () => {
  return (
    <HotelContext>
      <HotelBooking />
    </HotelContext>
  );
};

export default HotelBookingWrapper;
