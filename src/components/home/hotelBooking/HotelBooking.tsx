import React, { useState, useRef, useContext } from "react";
import { Icon } from "@iconify/react";
import debounce from "debounce";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import Button from "../../Button";
import DataList from "../../formElements/DataList";
import RoomBooking from "./roombooking/RoomBooking";
import BookingCalendar from "../BookingCalendar";
import InputDropDown from "../../formElements/InputDropDown";
import QualityCheckMark from "../QualityCheckMark";
import SearchPrompt from "../SearchPrompt";

import { betaTravelAxios } from "../../../axios/axios";
import { hotelContext } from "../../../context/HotelContext";
import { Value, months, days } from "../../../utils/data";
import { appContext } from "../../../context/ContextWrapper";
import useUseQuery from "../../../utils/useCustomHooks/useUseQuery";
import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";

const HotelBooking = () => {
  const dataListInputRef = useRef<HTMLInputElement>(null!);
  const [cities, setCities] = useState<{ country: string; dest_id: string; city_name: string }[]>([]);
  const hotelData = useContext(hotelContext);
  const appData = useContext(appContext);
  const { currentDate, currentDay, currentMonthDate, currentMonth, tomorrowDate } = appData;
  const { totalGuest, roomCount } = hotelData;
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [prevCity, setPrevCity] = useState(hotelInfos.city);
  const [date, setDate] = useState<Value>(() => [currentDate, tomorrowDate]);
  const handleOptionClick = (event: React.MouseEvent<HTMLOptionElement>) => {
    dataListInputRef.current.disabled = true;
    setHotelInfo((prevObj) => ({ ...prevObj, city: event.currentTarget.value }));
    console.log(event.currentTarget, "target");
  };

  const { refetch } = useUseQuery(
    "hotel-locations",
    "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
    false,
    {
      text: hotelInfos.city,
      languagecode: "en-us",
    },
    {
      "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
    (data) => setCities(data.data),
    () => setCities([])
  );

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
    _cities.push(<SearchPrompt key="2" searchTerm={hotelInfos.city} />);
  }

  var checkInDate = "",
    checkOutDate = "",
    roomGuestCount = `${roomCount} Room, ${totalGuest} Guest`;
  const date1 = date[0];
  const date2 = date[1];
  checkInDate = `${days[date1.getDay()]}, ${months[date1.getMonth()]} ${date1.getDate()}`;
  checkOutDate = `${days[date2.getDay()]}, ${months[date2.getMonth()]} ${date2.getDate()}`;

  if (prevCity !== hotelInfos.city) {
    if (hotelInfos.city.length >= 3) refetch();
    else if (cities.length) setCities([]);
    setPrevCity(hotelInfos.city);
  }

  const [isFocused, setIsFocused] = useState({
    dataListIsFocused: false,
    roomBookingIsFocused: false,
    calendarIsFocused: false,
  });

  const { dataListIsFocused, roomBookingIsFocused, calendarIsFocused } = isFocused;

  const handleFocus = (focusedInput: string) => {
    setIsFocused(() => ({ dataListIsFocused: focusedInput === "dataListIsFocused", roomBookingIsFocused: focusedInput === "roomBookingIsFocused", calendarIsFocused: focusedInput === "calendarIsFocused" }));
  };

  useAllisBlurred(() => {
    setIsFocused(() => ({ dataListIsFocused: false, roomBookingIsFocused: false, calendarIsFocused: false }));
  });

  return (
    <>
      <ul className="p-0 w-100 d-flex flex-column gap-3">
        <li className="w-100">
          <InputWrapper icon="ic:twotone-flag" label="Going to?">
            <DataList name="city" inputId="city" value={hotelInfos.city} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, city: e.target.value }))} placeHolder="City or hotel name" ref={dataListInputRef} handleFocus={() => handleFocus("dataListIsFocused")} isFocused={dataListIsFocused}>
              {_cities}
            </DataList>
          </InputWrapper>
        </li>
        <li className="w-100">
          <InputWrapper label="Rooms and guests" icon="material-symbols:person">
            <div className="w-100">
              <InputDropDown
                name={"roomGuestCount"}
                inputId="room-guest"
                value={roomGuestCount}
                handleChange={(e) => setHotelInfo((prev) => ({ ...prev, roomGuestCount: e.target.value }))}
                placeHolder="1 Room, 1 Guest"
                handleFocus={() => handleFocus("roomBookingIsFocused")}
                isFocused={roomBookingIsFocused}
              >
                <RoomBooking />
              </InputDropDown>
            </div>
          </InputWrapper>
        </li>
        <li style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", position: "relative" }}>
          <InputWrapper styleClass="hotelCheckIn" label="Check-in" icon="ph:calendar-thin">
            <InputDropDown name="checkInDate" inputId="check-in" value={checkInDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkInDate: e.target.value }))} placeHolder={`${currentDay}, ${currentMonth},${currentMonthDate}`} handleFocus={() => handleFocus("calendarIsFocused")} />
          </InputWrapper>
          <InputWrapper styleClass="hotelCheckOut" label="Check-out" icon="ph:calendar-thin">
            <InputDropDown name={"checkOutDate"} inputId="Check-out" value={checkOutDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkOutDate: e.target.value }))} placeHolder="Wed, Dec 27" handleFocus={() => handleFocus("calendarIsFocused")} />
          </InputWrapper>
          {calendarIsFocused && <BookingCalendar showDoubleView={true} setDate={setDate} value={date} selectRange={true} />}
        </li>
      </ul>
      <Button buttonLabel="Search Hotels" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
      <QualityCheckMark />
    </>
  );
};

export default HotelBooking;
