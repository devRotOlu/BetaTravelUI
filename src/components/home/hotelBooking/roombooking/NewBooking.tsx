import { Icon } from "@iconify/react";

import Button from "../../../Button";
import Pax from "./Pax";
import PaxButtons from "./PaxButtons";

import { RoomBookingProps } from "../../../../utils/data";
import useRoomData from "../../../../utils/useCustomHooks/useRoomData";

const NewBooking = ({ roomIndex }: RoomBookingProps) => {
  const { setRoomCount, setTotalGuest, childMinCount, childCount, setChildCount, adultMinCount, adultCount, setAdultCount } = useRoomData();
  return (
    <li className="d-flex flex-column gap-3" key={roomIndex}>
      <span className="text-secondary">Room {roomIndex + 1}</span>
      <Pax>
        <PaxButtons minCount={adultMinCount} count={adultCount} setCount={setAdultCount} />
        <PaxButtons minCount={childMinCount} count={childCount} setCount={setChildCount} />
      </Pax>
      <Button
        buttonClass="roomBtn"
        handleClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          setTotalGuest((prevTotal) => prevTotal - (adultCount + childCount));
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
};

export default NewBooking;
