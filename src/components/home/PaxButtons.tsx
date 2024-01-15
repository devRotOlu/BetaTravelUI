import React from "react";
import { Icon } from "@iconify/react";

import Button from "../Button";

import { PaxButtonsProps } from "../../utils/data";

const PaxButtons = ({ count, setCount, minCount, guestType }: PaxButtonsProps) => {
  return (
    <span className="paxBtnWrapper d-flex justify-content-between align-items-center">
      <Button
        handleClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          const _count = count - 1;
          setCount((prevCount) => ({ ...prevCount, [guestType]: _count < minCount ? minCount : _count }));
        }}
        buttonClass="paxBtn pa
        xBtn_1"
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
          console.log("clicking");
          setCount((prevCount) => ({ ...prevCount, [guestType]: count + 1 }));
        }}
      >
        <Icon icon="ph:plus-thin" />
      </Button>
    </span>
  );
};

export default PaxButtons;
