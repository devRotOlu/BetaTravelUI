import React, { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "@iconify/react";

import InputDropDown from "../../formElements/formDataList/InputDropDown";
import InputWrapper from "../../formElements/formDataList/InputWrapper";
import Button from "../../Button";
import DataList from "../../formElements/DataList";
import RoomBooking from "./roombooking/RoomBooking";
import DropDown from "../../formElements/DropDown";

import { betaTravelAxios } from "../../../axios/axios";
import { hotelContext } from "./HotelContext";

const getCities = async (city: string, func: (val: { country: string; dest_id: string; city_name: string }[]) => void) => {
  const data = await betaTravelAxios.get("https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete", {
    params: {
      text: city,
      languagecode: "en-us",
    },
    headers: {
      "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
  });
  func(data.data);
};

const HotelBooking = () => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [cities, setCities] = useState<{ country: string; dest_id: string; city_name: string }[]>([]);
  const hotelData = useContext(hotelContext);
  const { totalGuest, roomCount } = hotelData;
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const handleOptionClick = (event: React.FormEvent<HTMLOptionElement>) => {
    inputRef.current.disabled = true;
    setHotelInfo((prevObj) => ({ ...prevObj, city: event.currentTarget.value }));
  };

  var _cities = [<option key="0">CITY, COUNTRY</option>];

  for (let index = 0; index < cities.length; index++) {
    const { city_name, country, dest_id } = cities[index];
    if (city_name && country) {
      if (index === cities.length - 1) {
        _cities.push(
          <option onClick={handleOptionClick} className="baseList" key={dest_id} value={`${city_name}, ${country}`}>
            {`${city_name}, ${country}`}
          </option>
        );
      } else {
        _cities.push(
          <option onClick={handleOptionClick} key={dest_id} value={`${city_name}, ${country}`}>
            {`${city_name}, ${country}`}
          </option>
        );
      }
    }
  }

  if (!cities.length || hotelInfos.city.length < 3) {
    _cities.push(
      <option style={{ height: "230px", textAlign: "center", paddingTop: "20px", borderBottomRightRadius: "2px", borderBottomLeftRadius: "2px", borderBottom: "none", fontWeight: "normal" }} key={1}>
        {hotelInfos.city.length >= 3 ? "" : "Keep typing to reveal list"}
      </option>
    );
  }

  useEffect(() => {
    if (hotelInfos.city.length >= 3) {
      try {
        getCities(hotelInfos.city, (val: { country: string; dest_id: string; city_name: string }[]) => {
          setCities(val);
        });
      } catch (error) {
        setCities([]);
      }
    }
  }, [hotelInfos.city]);

  useEffect(() => {
    setHotelInfo((prevData) => ({ ...prevData, roomGuestCount: `${roomCount} Room, ${totalGuest} Guest` }));
  }, [roomCount, totalGuest]);

  return (
    <>
      <ul className="p-0 w-100 d-flex flex-column gap-3">
        <InputWrapper icon="ic:twotone-flag" label="Going to?">
          <DataList name="city" id="city" value={hotelInfos.city} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, city: e.target.value }))} placeHolder="City or hotel name" ref={inputRef}>
            {_cities}
          </DataList>
        </InputWrapper>
        <InputWrapper label="Rooms and guests" icon="material-symbols:person">
          <li className="w-100">
            <DropDown name={"roomGuestCount"} id="room-guest" value={hotelInfos.roomGuestCount} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, roomGuestCount: e.target.value }))} placeHolder="1 Room, 1 Guest">
              <RoomBooking />
            </DropDown>
          </li>
        </InputWrapper>
        <li style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          <InputWrapper styleClass="hotelCheckIn" label="Check-in" icon="ph:calendar-thin">
            <InputDropDown name={"checkInDate"} id="check-in" value={hotelInfos.checkInDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkInDate: e.target.value }))} placeHolder="Mon, Dec 25" ref={inputRef}>
              <div></div>
            </InputDropDown>
          </InputWrapper>
          <InputWrapper styleClass="hotelCheckOut" label="Check-out" icon="ph:calendar-thin">
            <InputDropDown name={"checkOutDate"} id="Check-out" value={hotelInfos.checkOutDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkOutDate: e.target.value }))} placeHolder="Wed, Dec 27" ref={inputRef}>
              <div></div>
            </InputDropDown>
          </InputWrapper>
        </li>
      </ul>
      <Button buttonLabel="Search Hotels" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
    </>
  );
};

export default HotelBooking;
