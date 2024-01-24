import { useContext, useState } from "react";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import DataList from "../../formElements/DataList";
import PossibleLocations from "./PossibleLocations";
import SearchPrompt from "../SearchPrompt";
import InputDropDown from "../../formElements/InputDropDown";
import BookingCalendar from "../BookingCalendar";
import InputBar from "./InputBar";

import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";
import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { Value, BasicFlightFormElementsProps, days, months } from "../../../utils/data";

const BasicFlightFormElements = ({ focusedElements: { destination, departure, calendar }, flightIndex }: BasicFlightFormElementsProps) => {
  const flightData = useContext(flightContext);
  const { flightDetails, setFlightDetails, setIsFocused, isFocused, blurAll } = flightData;
  const appData = useContext(appContext);
  const { currentDate, currentDay, currentMonth, currentMonthDate } = appData;
  const [_departDate, setDepartDate] = useState<Value>([currentDate, currentDate]);
  const _date = `${days[_departDate[0].getDay()]}, ${months[_departDate[0].getMonth()]} ${_departDate[0].getDate()}`;
  const handleFocused = (focusedInput: string) => {
    setIsFocused(focusedInput);
  };
  useAllisBlurred(blurAll);
  return (
    <>
      <li className="w-100">
        <InputWrapper label="From" icon="material-symbols-light:flight">
          <>
            {isFocused === departure && <InputBar />}
            <DataList
              key={1}
              name="departure"
              inputId="departure"
              value={flightDetails[flightIndex].depart}
              handleChange={(e) => setFlightDetails((prev) => ({ ...prev, depart: e.target.value }))}
              placeHolder="Enter City"
              handleFocus={() => handleFocused(departure)}
              dropDownClass="flightData"
              isFocused={isFocused === departure}
            >
              <PossibleLocations previousSearches={[]} previousLocations={[]} searchTerm={flightDetails[flightIndex].depart}>
                <SearchPrompt searchTerm={flightDetails[flightIndex].depart} />
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
            value={flightDetails[flightIndex].dest}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, dest: e.target.value }))}
            placeHolder="Enter City"
            handleFocus={() => handleFocused(destination)}
            dropDownClass="flightData"
            isFocused={isFocused === destination}
          >
            <PossibleLocations previousSearches={[]} previousLocations={[]} searchTerm={flightDetails[flightIndex].dest}>
              <SearchPrompt searchTerm={flightDetails[flightIndex].dest} />
            </PossibleLocations>
          </DataList>
        </InputWrapper>
      </li>
      <li className="w-100">
        <InputWrapper label="Departure" icon="ph:calendar-thin">
          <InputDropDown
            name="departDate"
            inputId="departDate"
            value={_date}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, departDate: e.target.value }))}
            placeHolder={`${currentDay}, ${currentMonth}, ${currentMonthDate}`}
            isFocused={isFocused === calendar}
            handleFocus={() => handleFocused(calendar)}
          >
            <BookingCalendar showDoubleView={false} setDate={setDepartDate} value={_departDate} selectRange={false} />
          </InputDropDown>
        </InputWrapper>
      </li>
    </>
  );
};

export default BasicFlightFormElements;
