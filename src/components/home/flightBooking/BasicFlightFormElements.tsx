import { useContext, useState } from "react";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import DataList from "../../formElements/DataList";
import PossibleLocations from "./PossibleLocations";
import SearchPrompt from "../SearchPrompt";
import InputDropDown from "../../formElements/InputDropDown";
import BookingCalendar from "../BookingCalendar";

import { flightContext } from "./FlightContext";
import { appContext } from "../../../context/ContextWrapper";
import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { Value, BasicFlightFormElementsProps } from "../../../utils/data";

const BasicFlightFormElements = ({ index }: BasicFlightFormElementsProps) => {
  const flightData = useContext(flightContext);
  const {
    flightDetails,
    setFlightDetails,
    setIsFocused,
    isFocused: { destDataList, departDataList, departDate },
    blurAll,
  } = flightData;
  const appData = useContext(appContext);
  const { currentDate, currentDay, currentMonth, currentMonthDate } = appData;
  const [_departDate, setDepartDate] = useState<Value>([currentDate, null]);
  const handleFocused = (focusedInput: string) => {
    setIsFocused({
      destDataList: "destDataList" === focusedInput,
      departDataList: "departDataList" === focusedInput,
      departDate: "departDate" === focusedInput,
      returnDate: false,
      seatBooking: false,
      flightClass: false,
    });
  };
  useAllisBlurred(blurAll);
  return (
    <>
      <li className="w-100">
        <InputWrapper label="From" icon="material-symbols-light:flight">
          <>
            {departDataList && <span className="dataListTag" style={{ height: "10px", borderTopLeftRadius: "5px", borderTopRightRadius: "5px", position: "absolute", bottom: "0", width: "50px", zIndex: "100000", backgroundColor: "darkblue", left: "50%", transform: "translateX(-50%)" }} />}
            <DataList
              key={1}
              name="departure"
              inputId="departure"
              value={flightDetails[index].depart}
              handleChange={(e) => setFlightDetails((prev) => ({ ...prev, depart: e.target.value }))}
              placeHolder="Enter City"
              handleFocus={() => handleFocused("departDataList")}
              dropDownClass="flightData"
              isFocused={departDataList}
            >
              <PossibleLocations previousSearches={[]} previousLocations={[]} searchTerm={flightDetails[index].depart}>
                <SearchPrompt searchTerm={flightDetails[index].depart} />
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
            value={flightDetails[index].dest}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, dest: e.target.value }))}
            placeHolder="Enter City"
            handleFocus={() => handleFocused("destDataList")}
            dropDownClass="flightData"
            isFocused={destDataList}
          >
            <PossibleLocations previousSearches={[]} previousLocations={[]} searchTerm={flightDetails[index].dest}>
              <SearchPrompt searchTerm={flightDetails[index].dest} />
            </PossibleLocations>
          </DataList>
        </InputWrapper>
      </li>
      <li className="w-100">
        <InputWrapper label="Departure" icon="ph:calendar-thin">
          <InputDropDown
            name="departDate"
            inputId="departDate"
            value={flightDetails[index].departDate}
            handleChange={(e) => setFlightDetails((prev) => ({ ...prev, departDate: e.target.value }))}
            placeHolder={`${currentDay}, ${currentMonth},${currentMonthDate}`}
            isFocused={departDate}
            handleFocus={() => handleFocused("departDate")}
          >
            <BookingCalendar showDoubleView={false} setDate={setDepartDate} />
          </InputDropDown>
        </InputWrapper>
      </li>
    </>
  );
};

export default BasicFlightFormElements;
