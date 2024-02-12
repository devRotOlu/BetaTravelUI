import { roomGuestType, RoomGuestAction } from "../data";

export const roomGuestReducer = (roomGuests: roomGuestType, action: RoomGuestAction) => {
  const { guestMinCount, guestType, prevGuestCount, roomIndex } = action;
  switch (action.type) {
    case "initialize": {
      return roomGuests.map((room, index) => {
        if (index === roomIndex) {
          return { ...room, isIntialRender: false };
        }
        return room;
      });
    }
    case "add": {
      return [...roomGuests, { adults: 1, children: 0, infants: 0, isIntialRender: true }];
    }
    case "remove": {
      return roomGuests.filter((_, index) => index !== action.roomIndex);
    }
    case "increaseGuests": {
      return roomGuests.map((room, index) => {
        if (index === action.roomIndex) {
          return { ...room, [guestType!]: prevGuestCount! + 1 };
        }
        return room;
      });
    }
    case "decreaseGuests": {
      const _count = prevGuestCount! - 1;
      return roomGuests.map((room, index) => {
        if (index === roomIndex) {
          return { ...room, [guestType!]: _count < guestMinCount! ? guestMinCount : _count };
        }
        return room;
      });
    }
    default:
      return roomGuests;
  }
};
