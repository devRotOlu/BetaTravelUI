import { useContext } from "react";

import NewBooking from "./NewBooking";
import DefaultBooking from "./DefaultBooking";
import BookingButtons from "../../BookingButtons";

import { hotelContext } from "../HotelContext";

const RoomBooking = () => {
  const hotelData = useContext(hotelContext);
  const { rooms } = hotelData;
  const roomBookings = rooms.map(({ roomId }, index) => {
    if (!index) return <DefaultBooking roomIndex={index} key={roomId} />;
    return <NewBooking roomIndex={index} key={roomId} />;
  });
  return (
    <ul id="roomBooking" className="roomBooking" style={{ backgroundColor: "white" }}>
      {roomBookings}
      <BookingButtons as="li" />
    </ul>
  );
};

export default RoomBooking;
