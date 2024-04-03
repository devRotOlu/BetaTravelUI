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
import BookingForm from "../../formElements/BookingForm";

import { hotelContext } from "../../../context/HotelContext";
import { months, days } from "../../../utils/data";
import { appContext } from "../../../context/ContextWrapper";
import useUseQuery from "../../../utils/useCustomHooks/useUseQuery";
import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";

const defaultTypedCity = "City or hotel name";

const HotelBooking = () => {
  const hotelData = useContext(hotelContext);
  const { totalGuest, roomCount } = hotelData;

  const appData = useContext(appContext);
  const { currentDate, currentDay, currentMonthDate, currentMonth, tomorrowDate, isFocused, setIsFocused, blurAll } = appData;

  const _roomGuestCount = `${roomCount} Room, ${totalGuest} Guest`;

  const [typedCity, setTypedCity] = useState(defaultTypedCity);
  const [cities, setCities] = useState<{ country: string; dest_id: string; city_name: string }[]>([]);
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: _roomGuestCount,
    checkInDate: currentDate,
    checkOutDate: tomorrowDate,
  });

  const { city, roomGuestCount, checkInDate, checkOutDate } = hotelInfos;

  const _checkInDate = `${days[checkInDate.getDay()]}, ${months[checkInDate.getMonth()]} ${checkInDate.getDate()}`;
  const _checkOutDate = `${days[checkOutDate.getDay()]}, ${months[checkOutDate.getMonth()]} ${checkOutDate.getDate()}`;

  const [debouncedCity] = useDebounce(hotelInfos.city, 200);

  const dataListInputRef = useRef<HTMLInputElement>(null!);

  const handleOptionClick = (city: string) => {
    setHotelInfo((prevInfo) => ({ ...prevInfo, city }));
  };

  const handleFocus = (focusedInput: string) => setIsFocused(focusedInput);

  const { refetch, isFetching, isFetched, data, isSuccess, isError, isPaused } = useUseQuery(
    ["hotel-locations"],
    "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
    false,
    {
      text: debouncedCity,
      languagecode: "en-us",
    },
    {
      "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    }
  );

  var _cities = [];
  if (!cities.length || hotelInfos.city.length < 3) {
    _cities.push(<option key="0">CITY, COUNTRY</option>);
    _cities.push(<SearchPrompt isError={isFetched && !cities.length} isLoading={isFetching} key="2" searchTerm={hotelInfos.city} />);
  }

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

  useEffect(() => {
    if (isSuccess && data && isFocused === "dataListIsFocused") setCities(data.data);
    else if (isError && isFocused === "dataListIsFocused") setCities([]);
  }, [data, isError, isSuccess, isFocused]);

  useEffect(() => {
    if (debouncedCity.length >= 3) refetch();
    else if (cities.length) setCities([]);
  }, [debouncedCity, refetch, cities.length, setCities]);

  const handleSubmit = () => {};

  const handleCheckInOutDate = (date1: Date, date2?: Date) => {
    setHotelInfo((prevInfo) => {
      return { ...prevInfo, checkInDate: date1, checkOutDate: date2! };
    });
  };

  useAllisBlurred(blurAll);

  if (_roomGuestCount !== roomGuestCount) {
    setHotelInfo((prev) => ({ ...prev, roomGuestCount: _roomGuestCount }));
  }

  if (isFocused !== "dataListIsFocused" && !city && !typedCity) {
    setTypedCity(defaultTypedCity);
  }

  return (
    <>
      <BookingForm handleSubmit={handleSubmit}>
        <BookingsWrapper>
          <li className="w-100">
            <InputWrapper icon="ic:twotone-flag" label="Going to?">
              <DataList
                name="city"
                inputId="city"
                value={city || typedCity}
                handleChange={(e) => {
                  setTypedCity(e.target.value);
                }}
                placeHolder={defaultTypedCity}
                ref={dataListInputRef}
                handleFocus={() => {
                  handleFocus("dataListIsFocused");
                  setTypedCity("");
                }}
                isFocused={isFocused === "dataListIsFocused"}
                readonly={city ? true : false}
              >
                {_cities}
              </DataList>
              {city && (
                <Button
                  handleClick={() => {
                    dataListInputRef.current.disabled = false;
                    setTypedCity("");
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
                <InputDropDown name={"roomGuestCount"} inputId="room-guest" value={roomGuestCount} placeHolder="1 Room, 1 Guest" handleFocus={() => handleFocus("roomBookingIsFocused")} isFocused={isFocused === "roomBookingIsFocused"} readonly={true}>
                  <RoomBooking />
                </InputDropDown>
              </div>
            </InputWrapper>
          </li>
          <li style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", position: "relative" }}>
            <InputWrapper styleClass="hotelCheckIn" label="Check-in" icon="ph:calendar-thin">
              <InputDropDown name="checkInDate" inputId="check-in" value={_checkInDate} placeHolder={`${currentDay}, ${currentMonth},${currentMonthDate}`} handleFocus={() => handleFocus("calendarIsFocused")} readonly={true} />
            </InputWrapper>
            <InputWrapper styleClass="hotelCheckOut" label="Check-out" icon="ph:calendar-thin">
              <InputDropDown name="checkOutDate" inputId="Check-out" value={_checkOutDate} placeHolder="Wed, Dec 27" handleFocus={() => handleFocus("calendarIsFocused")} readonly={true} />
            </InputWrapper>
            {isFocused === "calendarIsFocused" && <BookingCalendar showDoubleView={true} setDate={handleCheckInOutDate} selectRange={true} />}
          </li>
        </BookingsWrapper>
        <Button buttonLabel="Search Hotels" buttonType="submit">
          <span>
            <Icon icon="ion:chevron-forward-outline" />
          </span>
        </Button>
      </BookingForm>
      <QualityCheckMark />
    </>
  );
};

export default HotelBooking;
