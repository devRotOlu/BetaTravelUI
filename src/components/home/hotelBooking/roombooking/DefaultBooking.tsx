import React, { useState } from "react";
import { Icon } from "@iconify/react";

import PaxButtons from "./PaxButtons";
import Pax from "./Pax";
import Button from "../../../Button";

import useUseEvent from "../../../../utils/useCustomHooks/useUseEvent";
import { RoomBookingProps } from "../../../../utils/data";

const DefaultBooking = ({ roomIndex }: RoomBookingProps) => {
  const adultMinCount = 1;
  const childMinCount = 0;
  const [adultCount, setAdultCount] = useState(adultMinCount);
  const [childCount, setChildCount] = useState(childMinCount);
  const { setRoomCount } = useUseEvent(adultCount, childCount);

  return (
    <li className="d-flex flex-column gap-3" key={roomIndex}>
      <span className="d-flex justify-content-between align-items-center">
        <span className="text-secondary">Room {roomIndex + 1}</span>
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
      <Pax>
        <PaxButtons minCount={adultMinCount} count={adultCount} setCount={setAdultCount} />
        <PaxButtons minCount={childMinCount} count={childCount} setCount={setChildCount} />
      </Pax>
    </li>
  );
};

export default DefaultBooking;
