import { Icon } from "@iconify/react";

import { SeatBookingDropDownProps } from "../../../utils/data";

const SeatBookingDropDown = ({ handleFocus, styles }: SeatBookingDropDownProps) => {
  return (
    <span onClick={() => handleFocus()} style={styles}>
      <Icon icon="bxs:down-arrow" />
    </span>
  );
};

export default SeatBookingDropDown;
