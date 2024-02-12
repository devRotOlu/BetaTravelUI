import React, { SetStateAction, useState, useReducer } from "react";

import { roomGuestReducer } from "../utils/helperFunctions/roomGuestReducer";
import { roomType, roomGuestType, RoomGuestAction } from "../utils/data";

type hotelContextType = {
  totalGuest: number;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
  rooms: roomType;
  setRooms: React.Dispatch<SetStateAction<roomType>>;
  roomCount: number;
  roomGuests: roomGuestType;
  roomGuestsReducer: React.Dispatch<RoomGuestAction>;
};

type hotelContextProps = {
  children: React.ReactNode;
};
export const hotelContext = React.createContext({} as hotelContextType);

const HotelContext = ({ children }: hotelContextProps) => {
  const [totalGuest, setTotalGuest] = useState(() => 1);
  const [rooms, setRooms] = useState<roomType>(() => [{ roomId: 1 }]);
  const [roomCount, setRoomCount] = useState(() => rooms.length);
  if (roomCount !== rooms.length) {
    if (roomCount < rooms.length) setTotalGuest((prevCount) => ++prevCount);
    setRoomCount(rooms.length);
  }

  const [roomGuests, roomGuestsReducer] = useReducer(roomGuestReducer, [
    {
      adults: 1,
      children: 0,
      infants: 0,
      isIntialRender: true,
    },
  ]);

  return <hotelContext.Provider value={{ totalGuest, setTotalGuest, rooms, setRooms, roomCount, roomGuests, roomGuestsReducer }}>{children}</hotelContext.Provider>;
};

export default HotelContext;
