import { useState } from "react";
import { Icon } from "@iconify/react";

import FormDatalist from "../formElements/formDataList/FormDatalist";
import DataListWrapper from "../formElements/formDataList/DataListWrapper";
import Button from "../Button";

const HotelBooking = () => {
  const names = ["olumide", "dolapo", "adeola"].map((val, index) => {
    return <option key={index} value={val} />;
  });
  const [hotelInfos, setHotelInfo] = useState({
    city: "",
    roomGuestCount: "",
    checkInDate: "",
    checkOutDate: "",
  });
  return (
    <>
      <ul className="p-0 w-100 d-flex flex-column gap-3">
        <DataListWrapper icon="ic:twotone-flag" label="Going to?">
          <FormDatalist name="city" list="cities" id="city" value={hotelInfos.city} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, city: e.target.value }))}>
            {names}
          </FormDatalist>
        </DataListWrapper>
        <DataListWrapper label="Rooms and guests" icon="material-symbols:person">
          <li className="w-100">
            <FormDatalist name="room-guest" list="Rooms and guests" id="room-guest" value={hotelInfos.roomGuestCount} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, roomGuestCount: e.target.value }))}>
              {names}
            </FormDatalist>
          </li>
        </DataListWrapper>
        <li style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          <DataListWrapper styleClass="hotelCheckIn" label="Check-in" icon="ph:calendar-thin">
            <FormDatalist name="check-in" list="Possible check-in dates" id="check-in" value={hotelInfos.checkInDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkInDate: e.target.value }))}>
              {names}
            </FormDatalist>
          </DataListWrapper>
          <DataListWrapper styleClass="hotelCheckOut" label="Check-out" icon="ph:calendar-thin">
            <FormDatalist name="Check-out" list="Possible check-out dates" id="Check-out" value={hotelInfos.checkOutDate} handleChange={(e) => setHotelInfo((prev) => ({ ...prev, checkOutDate: e.target.value }))}>
              {names}
            </FormDatalist>
          </DataListWrapper>
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
