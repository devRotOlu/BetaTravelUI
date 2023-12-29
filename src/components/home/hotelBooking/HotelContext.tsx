import React, { SetStateAction, useState } from "react";

type hotelContextType = {
  totalGuest: number;
  setTotalGuest: React.Dispatch<SetStateAction<number>>;
};

type hotelContextProps = {
  children: React.ReactNode;
};
export const hotelContext = React.createContext({} as hotelContextType);

const HotelContext = ({ children }: hotelContextProps) => {
  const [totalGuest, setTotalGuest] = useState(0);
  return <hotelContext.Provider value={{ totalGuest, setTotalGuest }}>{children}</hotelContext.Provider>;
};

export default HotelContext;
