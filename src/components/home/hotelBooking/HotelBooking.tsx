import { useState, useRef, useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDebounce } from "use-debounce";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import Button from "../../Button";
import DataList from "../../formElements/DataList";
import RoomBooking from "./roombooking/RoomBooking";
import BookingCalendar from "../BookingCalendar";
import InputDropDown from "../../formElements/InputDropDown";
import QualityCheckMark from "../QualityCheckMark";
import SearchPrompt from "../SearchPrompt";
import BookingsWrapper from "../BookingsWrapper";

import { hotelContext } from "../../../context/HotelContext";
import { Value, months, days } from "../../../utils/data";
import { appContext } from "../../../context/ContextWrapper";
import useUseQuery from "../../../utils/useCustomHooks/useUseQuery";
import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";

const HotelBooking = () => {
  const hotelData = useContext(hotelContext);
  const appData = useContext(appContext);

  const [selectedCity, setSelectedCity] = useState("");
  const [isFocused, setIsFocused] = useState("");
  const [cities, setCities] = useState<{ country: string; dest_id: string; city_name: string }[]>([]);
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const { currentDate, currentDay, currentMonthDate, currentMonth, tomorrowDate } = appData;
  const [date, setDate] = useState<Value>(() => [currentDate, tomorrowDate]);

  const [debouncedCity] = useDebounce(hotelInfos.city, 200);

  const dataListInputRef = useRef<HTMLInputElement>(null!);

  const { totalGuest, roomCount } = hotelData;

  const handleOptionClick = (city: string) => {
    setSelectedCity(city);
    dataListInputRef.current.disabled = true;
  };
  const handleFocus = (focusedInput: string) => setIsFocused(focusedInput);
  useAllisBlurred(() => setIsFocused(""));
  const { refetch, isFetching, isFetched, isIdle } = useUseQuery(
    "hotel-locations",
    "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
    false,
    {
      text: debouncedCity,
      languagecode: "en-us",
    },
    {
      "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
    (data) => setCities(data.data),
    () => setCities([])
  );

  var _cities = [];
  if (!cities.length || hotelInfos.city.length < 3) {
    _cities.push(<option key="0">CITY, COUNTRY</option>);
    _cities.push(<SearchPrompt isError={isFetched && !cities.length} isLoading={isFetching} key="2" searchTerm={hotelInfos.city} />);
  }

  console.log(isIdle, "isIdle");

  if (!_cities.length) {
    _cities.push(<option key="0">CITY, COUNTRY</option>);
    for (let index = 0; index < cities.length; index++) {
      const { city_name, country, dest_id } = cities[index];
      if (city_name && country) {
        _cities.push(
          <option onClick={() => handleOptionClick(`${city_name}, ${country}`)} key={dest_id} value={`${city_name}, ${country}`} className={index === cities.length - 1 ? "baseList" : ""}>
            {`${city_name}, ${country}`}
          </option>
        );
      }
    }
  }

  let roomGuestCount = `${roomCount} Room, ${totalGuest} Guest`;
  let checkInDate = `${days[date[0].getDay()]}, ${months[date[0].getMonth()]} ${date[0].getDate()}`;
  let checkOutDate = `${days[date[1].getDay()]}, ${months[date[1].getMonth()]} ${date[1].getDate()}`;

  useEffect(() => {
    if (debouncedCity.length >= 3) refetch();
    else if (cities.length) setCities([]);
  }, [debouncedCity, refetch, cities.length, setCities]);

  return (
    <>
      <BookingsWrapper>
        <li className="w-100">
          <InputWrapper icon="ic:twotone-flag" label="Going to?">
            <DataList
              name="city"
              inputId="city"
              value={selectedCity || hotelInfos.city}
              handleChange={(e) => {
                if (!selectedCity) {
                  setHotelInfo((prev) => ({ ...prev, city: e.target.value }));
                }
              }}
              placeHolder="City or hotel name"
              ref={dataListInputRef}
              handleFocus={() => handleFocus("dataListIsFocused")}
              isFocused={isFocused === "dataListIsFocused"}
            >
              {_cities}
            </DataList>
            {selectedCity && (
              <Button
                handleClick={() => {
                  dataListInputRef.current.disabled = false;
                  setSelectedCity("");
                  setHotelInfo((prev) => ({ ...prev, city: "" }));
                  dataListInputRef.current.focus();
                }}
                buttonClass="datalistTrigger"
                buttonType="button"
              >
                <Icon style={{ color: "white", fontSize: "15px" }} icon="mdi:cancel-bold" />
              </Button>
            )}
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
                isFocused={isFocused === "roomBookingIsFocused"}
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
          {isFocused === "calendarIsFocused" && <BookingCalendar showDoubleView={true} setDate={setDate} value={date} selectRange={true} />}
        </li>
      </BookingsWrapper>
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
