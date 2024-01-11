import React, { useEffect, useContext, useRef, SetStateAction, useState } from "react";

import { hotelContext } from "../../components/home/hotelBooking/HotelContext";
import { roomType } from "../data";

type BookingData = {
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  adultCount: number;
  setAdultCount: React.Dispatch<SetStateAction<number>>;
  childCount: number;
  setChildCount: React.Dispatch<SetStateAction<number>>;
  adultMinCount: number;
  childMinCount: number;
  roomCount: number;
  lastRoomId: number;
  infantCount: number;
  setInfantCount: React.Dispatch<SetStateAction<number>>;
};

const useBookingData = (): BookingData => {
  const adultMinCount = 1;
  const childMinCount = 0;
  const [adultCount, setAdultCount] = useState(() => adultMinCount);
  const [childCount, setChildCount] = useState(() => childMinCount);
  const [infantCount, setInfantCount] = useState(() => 0);

  const hotelData = useContext(hotelContext);
  const { setTotalGuest, setRooms, roomCount, lastRoomId } = hotelData;
  const prevTotal = useRef(adultCount + childCount);
  useEffect(() => {
    if (prevTotal.current !== adultCount + childCount + infantCount) {
      if (prevTotal.current < adultCount + childCount + infantCount) {
        setTotalGuest((prevCount) => ++prevCount);
      } else {
        setTotalGuest((prevCount) => --prevCount);
      }
      prevTotal.current = adultCount + childCount + infantCount;
    } else {
      setTotalGuest((prevCount) => prevCount + adultCount);
    }
  }, [adultCount, childCount, infantCount, setTotalGuest]);
  return { setRooms, setTotalGuest, adultCount, setAdultCount, childCount, setChildCount, adultMinCount, childMinCount, roomCount, lastRoomId, infantCount, setInfantCount };
};

export default useBookingData;
