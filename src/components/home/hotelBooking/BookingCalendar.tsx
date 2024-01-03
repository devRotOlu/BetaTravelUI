import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

import { BookingCalendarProps } from "../../../utils/data";

const BookingCalendar = ({ date, setDate }: BookingCalendarProps) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <div onClick={handleClick} id="calendarWrapper" className="calendar">
      <Calendar
        showDoubleView={true}
        goToRangeStartOnSelect={false}
        allowPartialRange={true}
        selectRange={true}
        minDate={new Date()}
        prevLabel={<Icon icon="wpf:previous" />}
        nextLabel={<Icon icon="wpf:next" />}
        minDetail="decade"
        next2Label={null}
        prev2Label={null}
        tileClassName={["monthView ", "yearView"]}
        calendarType="gregory"
        onChange={(value) => {
          if (Array.isArray(value)) {
            setDate(value);
          }
        }}
        returnValue="range"
        value={date}
      />
    </div>
  );
};

export default BookingCalendar;
