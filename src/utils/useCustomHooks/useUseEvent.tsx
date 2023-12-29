import React, { useEffect, useContext, useRef, SetStateAction } from "react";

import { hotelContext } from "../../components/home/hotelBooking/HotelContext";

const useUseEvent = (adultCount: number, childCount: number): { setRoomCount: React.Dispatch<SetStateAction<number>>; setTotalGuest: React.Dispatch<SetStateAction<number>> } => {
  const hotelData = useContext(hotelContext);
  const { setTotalGuest, setRoomCount } = hotelData;
  const prevTotal = useRef(adultCount + childCount);
  useEffect(() => {
    if (prevTotal.current !== adultCount + childCount) {
      if (prevTotal.current < adultCount + childCount) {
        setTotalGuest((prevCount) => ++prevCount);
      } else {
        setTotalGuest((prevCount) => --prevCount);
      }
      prevTotal.current = adultCount + childCount;
    } else {
      setTotalGuest((prevCount) => prevCount + adultCount);
    }
  }, [adultCount, childCount, setTotalGuest]);
  return { setRoomCount, setTotalGuest };
};

export default useUseEvent;
