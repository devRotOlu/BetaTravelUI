import { useContext } from "react";

import Button from "../../../Button";
import NewBooking from "./NewBooking";
import DefaultBooking from "./DefaultBooking";

import { hotelContext } from "../HotelContext";

const RoomBooking = () => {
  const hotelData = useContext(hotelContext);
  const { roomCount } = hotelData;
  const _list = [];
  for (let index = 0; index < roomCount; index++) {
    if (!index) {
      _list.push(<DefaultBooking roomIndex={index} />);
    } else {
      _list.push(<NewBooking roomIndex={index} />);
    }
  }
  return (
    <>
      {_list}
      <li className=" d-flex justify-content-center gap-3 pb-4">
        <Button buttonClass="bookRoomBtn cancelRoomBtn" buttonType="button" buttonLabel="Cancel"></Button>
        <Button buttonClass="bookRoomBtn" buttonType="button" buttonLabel="Done"></Button>
      </li>
    </>
  );
};

export default RoomBooking;
