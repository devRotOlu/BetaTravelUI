import React, { SetStateAction, useState } from "react";

type hotelContextType = {
  totalGuest: number;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  roomCount: number;
  setRoomCount: React.Dispatch<SetStateAction<number>>;
};

type hotelContextProps = {
  children: React.ReactNode;
};
export const hotelContext = React.createContext({} as hotelContextType);

const HotelContext = ({ children }: hotelContextProps) => {
  const [totalGuest, setTotalGuest] = useState(0);
  const [roomCount, setRoomCount] = useState(1);
  return <hotelContext.Provider value={{ totalGuest, setTotalGuest, roomCount, setRoomCount }}>{children}</hotelContext.Provider>;
};

export default HotelContext;
