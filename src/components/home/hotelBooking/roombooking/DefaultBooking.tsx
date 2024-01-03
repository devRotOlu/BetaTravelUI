import { Icon } from "@iconify/react";

import PaxButtons from "./PaxButtons";
import Pax from "./Pax";
import Button from "../../../Button";

import useRoomData from "../../../../utils/useCustomHooks/useRoomData";
import { RoomBookingProps } from "../../../../utils/data";

const DefaultBooking = ({ roomIndex }: RoomBookingProps) => {
  const { setRoomCount, childCount, setChildCount, adultCount, setAdultCount, adultMinCount, childMinCount } = useRoomData();

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
