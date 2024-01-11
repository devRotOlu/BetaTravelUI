import { Icon } from "@iconify/react";

import Button from "../../../Button";
import Pax from "./Pax";
import PaxButtons from "./PaxButtons";
import ChildPax from "../../ChildPax";
import AdultPax from "../../AdultPax";

import { RoomBookingProps } from "../../../../utils/data";
import useBookingData from "../../../../utils/useCustomHooks/useBookingData";

const NewBooking = ({ roomIndex }: RoomBookingProps) => {
  const { setRooms, setTotalGuest, childMinCount, childCount, setChildCount, adultMinCount, adultCount, setAdultCount } = useBookingData();
  return (
    <li className="d-flex flex-column gap-3">
      <span className="text-secondary">Room {roomIndex + 1}</span>
      <Pax>
        <AdultPax>
          <PaxButtons minCount={adultMinCount} count={adultCount} setCount={setAdultCount} />
        </AdultPax>
        <ChildPax ageRange="2 - 11yrs" label="Children">
          <PaxButtons minCount={childMinCount} count={childCount} setCount={setChildCount} />
        </ChildPax>
      </Pax>
      <Button
        buttonClass="roomBtn"
        handleClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          setTotalGuest((prevTotal) => prevTotal - (adultCount + childCount));
          setRooms((rooms) => {
            return rooms.filter((_, index) => index !== roomIndex);
          });
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
