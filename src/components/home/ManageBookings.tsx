import { useState } from "react";
import { Icon } from "@iconify/react";

import FormInput from "../formElements/FormInput";
import Button from "../Button";
//U+232B
const ManageBookings = () => {
  const [bookingInfos, setBookingInfos] = useState({
    lastName: "",
    PNRNumber: "",
  });

  return (
    <>
      <ul className="p-0 d-flex flex-column gap-4">
        <li className="w-100 " style={{ height: "fit-content" }}>
          <FormInput handleChange={(e) => setBookingInfos((prev) => ({ ...prev, lastName: e.target.value }))} inputName="lastName" inputType="text" inputValue={bookingInfos.lastName} placeHolder="Last Name" inputClass="bookingInput" />
        </li>
        <li className="w-100">
          <FormInput handleChange={(e) => setBookingInfos((prev) => ({ ...prev, PNRNumber: e.target.value }))} inputValue={bookingInfos.PNRNumber} inputType="text" inputName="PNRNumber" placeHolder="PNR Number" inputClass="bookingInput" />
        </li>
      </ul>
      <Button buttonLabel="Search Booking" buttonType="submit">
        <span>
          <Icon icon="ion:chevron-forward-outline" />
        </span>
      </Button>
    </>
  );
};

export default ManageBookings;
