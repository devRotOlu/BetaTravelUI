import React from "react";
import FormInput from "../../formElements/FormInput";

const SeatBooking = () => {
  return (
    <li className="d-flex">
      <FormInput inputName="passengers" inputType="text" inputValue="" handleChange={() => {}} />
      <FormInput inputName="seatType" inputType="text" inputValue="" handleChange={() => {}} />
    </li>
  );
};

export default SeatBooking;
