import React, { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "@iconify/react";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import Button from "../../Button";
import DataList from "../../formElements/DataList";
import RoomBooking from "./roombooking/RoomBooking";
import BookingCalendar from "./BookingCalendar";
import InputDropDown from "./InputDropDown";
import { months, days } from "../../../utils/data";

import { betaTravelAxios } from "../../../axios/axios";
import { hotelContext } from "./HotelContext";
import { Value } from "../../../utils/data";
import { appContext } from "../../../context/ContextWrapper";

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
  const calendarId = "calendarWrapper";
  const dataListId = "dataList";
  const roomBookingId = "roomBooking";
  const dataListInputRef = useRef<HTMLInputElement>(null!);
  const [cities, setCities] = useState<{ country: string; dest_id: string; city_name: string }[]>([]);
  const hotelData = useContext(hotelContext);
  const appData = useContext(appContext);
  const { displayClass } = appData;
  const { totalGuest, roomCount } = hotelData;
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [date, setDate] = useState<Value>([new Date(), null]);
  const handleOptionClick = (event: React.FormEvent<HTMLOptionElement>) => {
    dataListInputRef.current.disabled = true;
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
    const date1 = date[0];
    const date2 = date[1];
    if (!date2 && date1) {
      const day = date1.getDay();
      const month = date1.getMonth();
      const date = date1.getDate();
      setHotelInfo((prev) => ({ ...prev, checkInDate: `${days[day]}, ${months[month]} ${date}`, checkOutDate: `${days[day]}, ${months[month]} ${date}` }));
    } else if (date1 && date2) {
      setHotelInfo((prev) => ({ ...prev, checkInDate: `${days[date1.getDay()]}, ${months[date1.getMonth()]} ${date1.getDate()}`, checkOutDate: `${days[date2.getDay()]}, ${months[date2.getMonth()]} ${date2.getDate()}` }));
    }
  }, [date]);

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

  const handleCalendarFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    document.getElementById(calendarId)!.classList.add(displayClass);
    document.getElementById(roomBookingId)!.classList.remove(displayClass);
    document.getElementById(dataListId)!.classList.remove(displayClass);
    event.currentTarget.disabled = true;
  };

  const handleRoomBookingFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    document.getElementById(roomBookingId)!.classList.add(displayClass);
    document.getElementById(dataListId)!.classList.remove(displayClass);
    document.getElementById(calendarId)!.classList.remove(displayClass);
    event.currentTarget.disabled = true;
  };

  const handleDatalistFocus = () => {
    document.getElementById(dataListId)!.classList.add(displayClass);
    document.getElementById(roomBookingId)!.classList.remove(displayClass);
    document.getElementById(calendarId)!.classList.remove(displayClass);
  };

  return (
    <>
      <ul className="p-0 w-100 d-flex flex-column gap-3">
        <InputWrapper icon="ic:twotone-flag" label="Going to?">
          <DataList name="city" inputId="city" value={hotelInfos.city} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, city: e.target.value }))} placeHolder="City or hotel name" ref={dataListInputRef} handleFocus={handleDatalistFocus} dropDownId={dataListId}>
            {_cities}
          </DataList>
        </InputWrapper>
        <InputWrapper label="Rooms and guests" icon="material-symbols:person">
          <li className="w-100">
            <InputDropDown name={"roomGuestCount"} inputId="room-guest" value={hotelInfos.roomGuestCount} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, roomGuestCount: e.target.value }))} placeHolder="1 Room, 1 Guest" dropDownId={roomBookingId} handleFocus={handleRoomBookingFocus}>
              <RoomBooking />
            </InputDropDown>
          </li>
        </InputWrapper>
        <li style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", position: "relative" }}>
          <InputWrapper styleClass="hotelCheckIn" label="Check-in" icon="ph:calendar-thin">
            <InputDropDown name={"checkInDate"} inputId="check-in" value={hotelInfos.checkInDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkInDate: e.target.value }))} placeHolder="Mon, Dec 25" dropDownId={calendarId} handleFocus={handleCalendarFocus} />
          </InputWrapper>
          <InputWrapper styleClass="hotelCheckOut" label="Check-out" icon="ph:calendar-thin">
            <InputDropDown name={"checkOutDate"} inputId="Check-out" value={hotelInfos.checkOutDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkOutDate: e.target.value }))} placeHolder="Wed, Dec 27" dropDownId={calendarId} handleFocus={handleCalendarFocus} />
          </InputWrapper>
          <BookingCalendar date={date} setDate={setDate} />
        </li>
      </ul>
      <Button buttonLabel="Search Hotels" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
      <p className="mt-4 d-flex justify-content-center text-light gap-2">
        <span style={{ color: "black" }}>
          <Icon style={{ color: "inherit" }} icon="emojione:white-heavy-check-mark" />
        </span>
        we offer the best deals in the industry
      </p>
    </>
  );
};

export default HotelBooking;
