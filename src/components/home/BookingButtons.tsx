import React from "react";
import Button from "../Button";
import { BookingButtonsProps } from "../../utils/data";

const BookingButtons = <E extends React.ElementType = "div">({ as }: BookingButtonsProps<E>) => {
  const Component = as || "div";
  return (
    <Component className=" d-flex justify-content-center gap-3 pb-4">
      <Button buttonClass="bookRoomBtn cancelRoomBtn" buttonType="button" buttonLabel="Cancel"></Button>
      <Button buttonClass="bookRoomBtn" buttonType="button" buttonLabel="Done"></Button>
    </Component>
  );
};

export default BookingButtons;
