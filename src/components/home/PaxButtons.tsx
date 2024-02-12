import React from "react";
import { Icon } from "@iconify/react";

import Button from "../Button";

import { PaxButtonsProps } from "../../utils/data";

const PaxButtons = ({ count, setCount, minCount, guestType, roomIndex }: PaxButtonsProps) => {
  return (
    <span className="paxBtnWrapper d-flex justify-content-between align-items-center">
      <Button
        handleClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          setCount({
            type: "decreaseGuests",
            roomIndex,
            prevGuestCount: count,
            guestType,
            guestMinCount: minCount,
          });
        }}
        buttonClass="paxBtn paxBtn_1"
        buttonType="button"
      >
        <Icon icon="ph:minus-thin" />
      </Button>
      <span>{count}</span>
      <Button
        buttonClass="paxBtn"
        buttonType="button"
        handleClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          setCount({
            type: "increaseGuests",
            roomIndex,
            guestType,
            prevGuestCount: count,
          });
        }}
      >
        <Icon icon="ph:plus-thin" />
      </Button>
    </span>
  );
};

export default PaxButtons;
