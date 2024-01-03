import React, { useEffect, useContext, useRef, SetStateAction, useState } from "react";

import { hotelContext } from "../../components/home/hotelBooking/HotelContext";

type RoomData = {
  setRoomCount: React.Dispatch<SetStateAction<number>>;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  adultCount: number;
  setAdultCount: React.Dispatch<SetStateAction<number>>;
  childCount: number;
  setChildCount: React.Dispatch<SetStateAction<number>>;
  adultMinCount: number;
  childMinCount: number;
};

const useRoomData = (): RoomData => {
  const adultMinCount = 1;
  const childMinCount = 0;
  const [adultCount, setAdultCount] = useState(adultMinCount);
  const [childCount, setChildCount] = useState(childMinCount);

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
  return { setRoomCount, setTotalGuest, adultCount, setAdultCount, childCount, setChildCount, adultMinCount, childMinCount };
};

export default useRoomData;
