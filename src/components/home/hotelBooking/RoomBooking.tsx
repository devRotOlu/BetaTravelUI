import React, { useState } from "react";
import { Icon } from "@iconify/react";

import Pax from "./Pax";

import Button from "../../Button";

import { RoomBookingProps } from "../../../utils/data";

const RoomBooking = React.forwardRef<HTMLUListElement, RoomBookingProps>(({ roomCount, setRoomCount }: RoomBookingProps, ref) => {
  const _list = [];
  for (let index = 0; index < roomCount; index++) {
    if (!index) {
      _list.push(
        <li className="d-flex flex-column gap-3" key={index}>
          <span className="d-flex justify-content-between align-items-center">
            <span className="text-secondary">Room {index + 1}</span>
            <Button
              buttonClass="roomBtn addRoomBtn"
              handleClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                setRoomCount((prevCount) => ++prevCount);
              }}
              buttonType="button"
              buttonLabel="Add room"
            >
              <span>
                <Icon icon="ph:plus-thin" />
              </span>
            </Button>
          </span>
          <Pax />
        </li>
      );
    } else {
      _list.push(
        <li className="d-flex flex-column gap-3" key={index}>
          <span className="text-secondary">Room {index + 1}</span>
          <Pax />
          <Button
            buttonClass="roomBtn"
            handleClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              setRoomCount((prevCount) => --prevCount);
            }}
            buttonType="button"
            buttonLabel="Remove room"
          >
            <span>
              <Icon icon="ph:minus-thin" />
            </span>
          </Button>
        </li>
      );
    }
  }
  return (
    <ul ref={ref} className="roomBooking flex-column gap-3" style={{ backgroundColor: "white" }}>
      {_list}
      <li className=" d-flex justify-content-center gap-3 pb-4">
        <Button buttonClass="bookRoomBtn cancelRoomBtn" buttonType="button" buttonLabel="Cancel"></Button>
        <Button buttonClass="bookRoomBtn" buttonType="button" buttonLabel="Done"></Button>
      </li>
    </ul>
  );
});

export default RoomBooking;
