import { useContext } from "react";

import NewBooking from "./NewBooking";
import DefaultBooking from "./DefaultBooking";
import BookingButtons from "../../BookingButtons";
import Wrapper from "../../Wrapper";

import { hotelContext } from "../../../../context/HotelContext";

const RoomBooking = () => {
  const hotelData = useContext(hotelContext);
  const { rooms } = hotelData;
  const roomBookings = rooms.map(({ roomId }, index) => {
    if (!index) return <DefaultBooking roomIndex={index} key={roomId} />;
    return <NewBooking roomIndex={index} key={roomId} />;
  });
  return (
    <Wrapper as="ul">
      {roomBookings}
      <BookingButtons as="li" />
    </Wrapper>
  );
};

export default RoomBooking;
