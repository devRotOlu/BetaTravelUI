import { useContext, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import Calendar from "react-calendar";

import { BookingCalendarProps, days, months } from "../../utils/data";
import { appContext } from "../../context/ContextWrapper";

const BookingCalendar = ({ setDate, showDoubleView, selectRange }: BookingCalendarProps) => {
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();
  const appData = useContext(appContext);
  const { currentDate, blurAll } = appData;

  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (!initialRenderRef.current) blurAll();
    if (initialRenderRef.current) initialRenderRef.current = false;
  });

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
            const date1 = value[0];
            const date2 = value[1];
            if (date2 === null && date1 !== null) setDate(date1, date1);
            if (date1 !== null && date2 !== null) setDate(date1, date2);
          }
        }}
        returnValue="range"
      />
    </div>
  );
};

export default BookingCalendar;
