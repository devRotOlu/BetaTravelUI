import { Icon } from "@iconify/react";

import PaxButtons from "../../PaxButtons";
import Pax from "../../Pax";
import Button from "../../../Button";
import ChildPax from "../../ChildPax";
import AdultPax from "../../AdultPax";

import useBookingData from "../../../../utils/useCustomHooks/useBookingData";
import { RoomBookingProps } from "../../../../utils/data";

const DefaultBooking = ({ roomIndex }: RoomBookingProps) => {
  const { setRooms, roomGuests, setRoomGuests, adultMinCount, childMinCount } = useBookingData(roomIndex);
  const { adults, children } = roomGuests[roomIndex];

  return (
    <li className="d-flex flex-column gap-3">
      <span className="d-flex justify-content-between align-items-center">
        <span className="text-secondary">Room {roomIndex + 1}</span>
        <Button
          buttonClass="roomBtn addRoomBtn"
          handleClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            setRooms((rooms) => [...rooms, { roomId: rooms[rooms.length - 1].roomId + 1 }]);
            setRoomGuests((prevData) => [...prevData, { adults: 1, children: 0, infants: 0, isIntialRender: true }]);
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
        <AdultPax>
          <PaxButtons minCount={adultMinCount} count={adults} setCount={setRoomGuests} guestType="adults" roomIndex={roomIndex} />
        </AdultPax>
        <ChildPax label="Children" ageRange="2 - 11yrs">
          <PaxButtons minCount={childMinCount} count={children} setCount={setRoomGuests} guestType="children" roomIndex={roomIndex} />
        </ChildPax>
      </Pax>
    </li>
  );
};

export default DefaultBooking;
