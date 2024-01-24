import { useContext } from "react";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

import { BookingCalendarProps } from "../../utils/data";
import { appContext } from "../../context/ContextWrapper";

const BookingCalendar = ({ setDate, showDoubleView, value, selectRange }: BookingCalendarProps) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const appData = useContext(appContext);
  const { currentDate } = appData;

  return (
    <div onClick={handleClick} className="calendar">
      <Calendar
        showDoubleView={showDoubleView}
        goToRangeStartOnSelect={false}
        allowPartialRange={true}
        selectRange={selectRange}
        minDate={currentDate}
        prevLabel={<Icon icon="wpf:previous" />}
        nextLabel={<Icon icon="wpf:next" />}
        minDetail="decade"
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        onChange={(value) => {
          if (Array.isArray(value)) {
            if (value[1] === null && value[0] !== null) {
              setDate([value[0], value[0]]);
            }
            if (value[1] !== null && value[0] !== null) {
              setDate([value[0], value[1]]);
            }
          }
        }}
        returnValue="range"
        value={value}
      />
    </div>
  );
};

export default BookingCalendar;
