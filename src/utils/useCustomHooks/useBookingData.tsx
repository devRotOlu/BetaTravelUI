import React, { useContext, SetStateAction, useEffect, useRef } from "react";

import { hotelContext } from "../../components/home/hotelBooking/HotelContext";
import { roomType, roomGuestType } from "../data";

type BookingData = {
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  adultMinCount: number;
  childMinCount: number;
  roomCount: number;
  lastRoomId: number;
  roomGuests: roomGuestType;
  setRoomGuests: React.Dispatch<SetStateAction<roomGuestType>>;
};

const useBookingData = (roomIndex: number): BookingData => {
  const adultMinCount = 1;
  const childMinCount = 0;

  const hotelData = useContext(hotelContext);
  const { setTotalGuest, setRooms, roomCount, lastRoomId, roomGuests, setRoomGuests } = hotelData;
  const { adults, children, isIntialRender } = roomGuests[roomIndex];
  const prevTotal = useRef(adults + children);

  useEffect(() => {
    if (prevTotal.current !== adults + children) {
      if (prevTotal.current < adults + children) {
        setTotalGuest((prevCount) => ++prevCount);
      } else {
        setTotalGuest((prevCount) => --prevCount);
      }
      prevTotal.current = adults + children;
    }
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
  }, [adults, children, isIntialRender, setTotalGuest, setRoomGuests, roomIndex]);
  return { setRooms, setTotalGuest, adultMinCount, childMinCount, roomCount, lastRoomId, roomGuests, setRoomGuests: hotelData.setRoomGuests };
};

export default useBookingData;
