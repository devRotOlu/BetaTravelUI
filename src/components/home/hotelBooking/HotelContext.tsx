import React, { SetStateAction, useRef, useState } from "react";

import { roomType } from "../../../utils/data";

type hotelContextType = {
  totalGuest: number;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  rooms: roomType;
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  lastRoomId: number;
  roomCount: number;
};

type hotelContextProps = {
  children: React.ReactNode;
};
export const hotelContext = React.createContext({} as hotelContextType);

const HotelContext = ({ children }: hotelContextProps) => {
  const [totalGuest, setTotalGuest] = useState(0);
  const roomIdRef = useRef(1);
  const roomCountRef = useRef(1);
  const [rooms, setRooms] = useState<roomType>([{ roomId: roomIdRef.current }]);

  if (roomCountRef.current < rooms.length) ++roomIdRef.current;
  if (roomCountRef.current !== rooms.length) roomCountRef.current = rooms.length;

  return <hotelContext.Provider value={{ totalGuest, setTotalGuest, rooms, setRooms, lastRoomId: roomIdRef.current, roomCount: roomCountRef.current }}>{children}</hotelContext.Provider>;
};

export default HotelContext;
