import React, { useContext, SetStateAction, useEffect, useRef } from "react";

import { hotelContext } from "../../context/HotelContext";
import { roomType, roomGuestType } from "../data";

type BookingData = {
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  adultMinCount: number;
  childMinCount: number;
  roomCount: number;
  roomGuests: roomGuestType;
  setRoomGuests: React.Dispatch<SetStateAction<roomGuestType>>;
};

const useBookingData = (roomIndex: number): BookingData => {
  const adultMinCount = 1;
  const childMinCount = 0;

  const hotelData = useContext(hotelContext);
  const { setTotalGuest, setRooms, roomCount, roomGuests, setRoomGuests } = hotelData;
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
      setRoomGuests((prevGuests) => {
        return prevGuests.map((room, index) => {
          if (index === roomIndex) {
            return { ...room, isIntialRender: false };
          }
          return room;
        });
      });
    }
  }, [isIntialRender, setRoomGuests, roomIndex]);
  return { setRooms, setTotalGuest, adultMinCount, childMinCount, roomCount, roomGuests, setRoomGuests: hotelData.setRoomGuests };
};

export default useBookingData;
