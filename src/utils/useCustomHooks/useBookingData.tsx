import React, { useContext, SetStateAction, useEffect, useRef } from "react";

import { hotelContext } from "../../context/HotelContext";
import { roomType, roomGuestType, RoomGuestAction } from "../data";

type BookingData = {
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  adultMinCount: number;
  childMinCount: number;
  roomCount: number;
  roomGuests: roomGuestType;
  roomGuestsReducer: React.Dispatch<RoomGuestAction>;
};

const useBookingData = (roomIndex: number): BookingData => {
  const adultMinCount = 1;
  const childMinCount = 0;

  const hotelData = useContext(hotelContext);
  const { setTotalGuest, setRooms, roomCount, roomGuests, roomGuestsReducer } = hotelData;
  const { adults, children: _children, isIntialRender } = roomGuests[roomIndex];
  const prevTotal = useRef(adults + _children);

  useEffect(() => {
    if (prevTotal.current !== adults + _children) {
      if (prevTotal.current < adults + _children) {
        setTotalGuest((prevCount) => ++prevCount);
      } else {
        setTotalGuest((prevCount) => --prevCount);
      }
      prevTotal.current = adults + _children;
    }
  }, [adults, _children, setTotalGuest, roomIndex]);
  useEffect(() => {
    if (isIntialRender) {
      roomGuestsReducer({
        type: "initialize",
        roomIndex,
      });
    }
  }, [isIntialRender, roomGuestsReducer, roomIndex]);
  return { setRooms, setTotalGuest, adultMinCount, childMinCount, roomCount, roomGuests, roomGuestsReducer };
};

export default useBookingData;
