import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

import { BookingCalendarProps } from "../../utils/data";
import { appContext } from "../../context/ContextWrapper";
import { useContext } from "react";

const BookingCalendar = ({ setDate, showDoubleView, calendarId }: BookingCalendarProps) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const appData = useContext(appContext);
  const { currentDate } = appData;

  return (
    <div onClick={handleClick} id={calendarId} className="calendar">
      <Calendar
        showDoubleView={showDoubleView}
        goToRangeStartOnSelect={false}
        allowPartialRange={true}
        selectRange={true}
        minDate={currentDate}
        prevLabel={<Icon icon="wpf:previous" />}
        nextLabel={<Icon icon="wpf:next" />}
        minDetail="decade"
        next2Label={null}
        prev2Label={null}
        calendarType="gregory"
        onChange={(value) => {
          if (Array.isArray(value)) {
            setDate(value);
          }
        }}
        returnValue="range"
      />
    </div>
  );
};

export default BookingCalendar;
