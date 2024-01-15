import React, { useEffect, useContext, useRef, SetStateAction, useState } from "react";

import { hotelContext } from "../../components/home/hotelBooking/HotelContext";
import { roomType, guestCountType } from "../data";

type BookingData = {
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  adultMinCount: number;
  childMinCount: number;
  roomCount: number;
  lastRoomId: number;
  guestCount: guestCountType;
  setGuestCount: React.Dispatch<SetStateAction<guestCountType>>;
};

const useBookingData = (): BookingData => {
  const adultMinCount = 1;
  const childMinCount = 0;
  const [guestCount, setGuestCount] = useState(() => ({
    adults: adultMinCount,
    children: childMinCount,
    infants: 0,
  }));
  const { adults, children } = guestCount;

  const hotelData = useContext(hotelContext);
  const { setTotalGuest, setRooms, roomCount, lastRoomId } = hotelData;
  const prevTotal = useRef(adultMinCount);
  useEffect(() => {
    if (prevTotal.current !== adults + children) {
      if (prevTotal.current < adults + children) {
        setTotalGuest((prevCount) => ++prevCount);
      } else {
        setTotalGuest((prevCount) => --prevCount);
      }
      prevTotal.current = adults + children;
    } else {
      setTotalGuest((prevCount) => prevCount + adults);
    }
  }, [adults, children, setTotalGuest]);
  return { setRooms, setTotalGuest, adultMinCount, childMinCount, roomCount, lastRoomId, guestCount, setGuestCount };
};

export default useBookingData;
