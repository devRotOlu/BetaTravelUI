import { useContext, useState } from "react";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import DataList from "../../formElements/DataList";
import PossibleLocations from "./PossibleLocations";
import SearchPrompt from "../SearchPrompt";
import InputDropDown from "../hotelBooking/InputDropDown";
import BookingCalendar from "../BookingCalendar";

import { flightContext } from "./FlightContext";
import { appContext } from "../../../context/ContextWrapper";
import useDisplayClass from "../../../utils/useCustomHooks/useDisplayClass";
import { Value } from "../../../utils/data";

const BasicFlightFormElements = () => {
  const departDataListId = "departData";
  const departDataListTag = "dataListTag";
  const destDataListId = "destData";
  const departCalendarId = "departCalendar";
  useDisplayClass(departDataListTag);
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails } = flightData;
  const appData = useContext(appContext);
  const { displayClass, currentDate, currentDay, currentMonth, currentMonthDate } = appData;
  const [departDate, setDepartDate] = useState<Value>([currentDate, null]);
  const handleFocus = (target1Id: string, target2Id?: string) => {
    document.getElementById(departDataListId)!.classList.remove(displayClass);
    document.getElementById(departDataListTag)!.classList.remove(displayClass);
    document.getElementById(destDataListId)!.classList.remove(displayClass);
    document.getElementById(departCalendarId)!.classList.remove(displayClass);
    document.getElementById(target1Id)!.classList.add(displayClass);
    if (target2Id) document.getElementById(target2Id)!.classList.add(displayClass);
  };
  return (
    <>
      <li className="w-100">
        <InputWrapper label="From" icon="material-symbols-light:flight">
          <>
            <span id={departDataListTag} className={departDataListTag} style={{ height: "10px", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", position: "absolute", bottom: "0", width: "50px", zIndex: "100000", backgroundColor: "darkblue", left: "50%", transform: "translateX(-50%)" }} />
            <DataList
              key={1}
              name="departure"
              inputId="departure"
              value={flightDetails.depart}
              handleChange={(e) => setFlightDetails((prev) => ({ ...prev, depart: e.target.value }))}
              placeHolder="Enter City"
              dropDownId={departDataListId}
              handleFocus={() => handleFocus(departDataListId, departDataListTag)}
              dropDownClass="flightData"
            >
              <PossibleLocations previousSearches={[]} previousLocations={[]} searchTerm={flightDetails.depart}>
                <SearchPrompt searchTerm={flightDetails.depart} />
              </PossibleLocations>
            </DataList>
          </>
        </InputWrapper>
      </li>
      <li className="w-100">
        <InputWrapper label="To" icon="mdi:location">
          <DataList
            key={4}
            name="destination"
            inputId="destination"
            value={flightDetails.dest}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, dest: e.target.value }))}
            placeHolder="Enter City"
            dropDownId={destDataListId}
            handleFocus={() => handleFocus(destDataListId)}
            dropDownClass="flightData"
          >
            <PossibleLocations previousSearches={[]} previousLocations={[]} searchTerm={flightDetails.dest}>
              <SearchPrompt searchTerm={flightDetails.dest} />
            </PossibleLocations>
          </DataList>
        </InputWrapper>
      </li>
      <li className="w-100">
        <InputWrapper label="Departure" icon="ph:calendar-thin">
          <InputDropDown
            name="departDate"
            inputId="departDate"
            value={flightDetails.departDate}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, departDate: e.target.value }))}
            placeHolder={`${currentDay}, ${currentMonth},${currentMonthDate}`}
            dropDownId={departCalendarId}
            handleFocus={() => handleFocus(departCalendarId)}
          >
            <BookingCalendar showDoubleView={false} setDate={setDepartDate} calendarId={departCalendarId} />
          </InputDropDown>
        </InputWrapper>
      </li>
    </>
  );
};

export default BasicFlightFormElements;
