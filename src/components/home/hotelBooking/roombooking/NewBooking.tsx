import { Icon } from "@iconify/react";

import Button from "../../../Button";
import Pax from "../../Pax";
import PaxButtons from "../../PaxButtons";
import ChildPax from "../../ChildPax";
import AdultPax from "../../AdultPax";

import { RoomBookingProps } from "../../../../utils/data";
import useBookingData from "../../../../utils/useCustomHooks/useBookingData";

const NewBooking = ({ roomIndex }: RoomBookingProps) => {
  const { setRooms, setTotalGuest, childMinCount, adultMinCount, roomGuests, setRoomGuests } = useBookingData(roomIndex);
  const { adults, children } = roomGuests[roomIndex];
  return (
    <li className="d-flex flex-column gap-3">
      <span className="text-secondary">Room {roomIndex + 1}</span>
      <Pax>
        <AdultPax>
          <PaxButtons minCount={adultMinCount} count={adults} setCount={setRoomGuests} guestType="adults" roomIndex={roomIndex} />
        </AdultPax>
        <ChildPax ageRange="2 - 11yrs" label="Children">
          <PaxButtons minCount={childMinCount} count={children} setCount={setRoomGuests} guestType="children" roomIndex={roomIndex} />
        </ChildPax>
      </Pax>
      <Button
        buttonClass="roomBtn"
        handleClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          setTotalGuest((prevTotal) => prevTotal - (adults + children));
          setRooms((rooms) => {
            return rooms.filter((_, index) => index !== roomIndex);
          });
          setRoomGuests((prevGuests) => {
            return prevGuests.filter((_, index) => index !== roomIndex);
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
