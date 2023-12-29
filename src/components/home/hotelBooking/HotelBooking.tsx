import React, { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "@iconify/react";

import InputDropDown from "../../formElements/formDataList/InputDropDown";
import DataListWrapper from "../../formElements/formDataList/DataListWrapper";
import Button from "../../Button";
import DataList from "../../formElements/DataList";
import RoomBooking from "./RoomBooking";
import HotelContext from "./HotelContext";

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
  const dataListRef = useRef<HTMLDataListElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [roomCount, setRoomCount] = useState(1);
  const [cities, setCities] = useState<{ country: string; dest_id: string; city_name: string }[]>([]);
  const hotelData = useContext(hotelContext);
  const { totalGuest } = hotelData;

  var _cities = cities.map(({ country, dest_id, city_name }, index) => {
    if (city_name && country) {
      if (index === cities.length - 1) {
        return (
          <option className="baseList" key={dest_id} value={`${city_name}, ${country}`}>
            {`${city_name}, ${country}`}
          </option>
        );
      }
      return (
        <option key={dest_id} value={`${city_name}, ${country}`}>
          {`${city_name}, ${country}`}
        </option>
      );
    }
  });

  if (!cities.length || hotelInfos.city.length < 3) {
    _cities = [
      <option style={{ height: "230px", textAlign: "center", paddingTop: "20px", borderBottomRightRadius: "2px", borderBottomLeftRadius: "2px", borderBottom: "none", fontWeight: "normal" }} key={1}>
        {hotelInfos.city.length >= 3 ? "" : "Keep typing to reveal list"}
      </option>,
    ];
  }

  useEffect(() => {
    const length = dataListRef.current.children.length;
    const _list = dataListRef.current.children;
    if (cities.length) {
      for (let index = 1; index < length; index++) {
        _list[index].addEventListener("click", function (this: HTMLOptionElement) {
          console.log("in here");
          inputRef.current.disabled = true;
          setHotelInfo((prevObj) => ({ ...prevObj, city: this.value }));
        });
      }
    }
  }, [cities.length]);

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
    const eventFunc = () => {
      dataListRef.current.classList.remove("_dataListDisplay");
      listRef.current.classList.remove("_dataListDisplay");
    };
    window.addEventListener("click", eventFunc);
    return () => {
      window.removeEventListener("click", eventFunc);
    };
  }, []);

  const handleFocus = () => {
    dataListRef.current.classList.add("_dataListDisplay");
  };
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <HotelContext>
      <ul className="p-0 w-100 d-flex flex-column gap-3">
        <DataListWrapper icon="ic:twotone-flag" label="Going to?">
          <InputDropDown name="city" id="city" value={hotelInfos.city} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, city: e.target.value }))} placeHolder="City or hotel name" ref={inputRef} handleClick={handleClick} handleFocus={handleFocus}>
            <DataList ref={dataListRef}>{_cities}</DataList>
          </InputDropDown>
        </DataListWrapper>
        <DataListWrapper label="Rooms and guests" icon="material-symbols:person">
          <li className="w-100">
            <InputDropDown
              name={"roomGuestCount"}
              id="room-guest"
              value={hotelInfos.roomGuestCount}
              handleChange={(e) => setHotelInfo((prev) => ({ ...prev, roomGuestCount: e.target.value }))}
              placeHolder="1 Room, 1 Guest"
              ref={inputRef}
              handleClick={handleClick}
              handleFocus={() => listRef.current.classList.add("_dataListDisplay")}
            >
              <RoomBooking roomCount={roomCount} setRoomCount={setRoomCount} ref={listRef} />
            </InputDropDown>
          </li>
        </DataListWrapper>
        <li style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          <DataListWrapper styleClass="hotelCheckIn" label="Check-in" icon="ph:calendar-thin">
            <InputDropDown name={"checkInDate"} id="check-in" value={hotelInfos.checkInDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkInDate: e.target.value }))} placeHolder="Mon, Dec 25" ref={inputRef} handleClick={handleClick} handleFocus={handleFocus}>
              <div></div>
            </InputDropDown>
          </DataListWrapper>
          <DataListWrapper styleClass="hotelCheckOut" label="Check-out" icon="ph:calendar-thin">
            <InputDropDown name={"checkOutDate"} id="Check-out" value={hotelInfos.checkOutDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkOutDate: e.target.value }))} placeHolder="Wed, Dec 27" ref={inputRef} handleClick={handleClick} handleFocus={handleFocus}>
              <div></div>
            </InputDropDown>
          </DataListWrapper>
        </li>
      </ul>
      <Button buttonLabel="Search Hotels" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
    </HotelContext>
  );
};

export default HotelBooking;
