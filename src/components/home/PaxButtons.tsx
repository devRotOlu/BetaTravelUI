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
          const _count = count - 1;
          setCount((prevCount) => {
            return prevCount.map((room, index) => {
              if (index === roomIndex) {
                return { ...room, [guestType]: _count < minCount ? minCount : _count };
              }
              return room;
            });
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
          setCount((prevCount) => {
            return prevCount.map((room, index) => {
              if (index === roomIndex) {
                return { ...room, [guestType]: count + 1 };
              }
              return room;
            });
          });
        }}
      >
        <Icon icon="ph:plus-thin" />
      </Button>
    </span>
  );
};

export default PaxButtons;
