import { useContext, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Icon } from "@iconify/react";
import { useCookies } from "react-cookie";

import InputWrapper from "../../formElements/formDataList/InputWrapper";
import PossibleLocations from "./PossibleLocations";
import SearchPrompt from "../SearchPrompt";
import InputDropDown from "../../formElements/InputDropDown";
import BookingCalendar from "../BookingCalendar";
import InputBar from "./InputBar";
import ArrowSwap from "./ArrowSwap";
import Button from "../../Button";

import useUseQuery from "../../../utils/useCustomHooks/useUseQuery";

import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";
import { BasicFlightFormElementsProps, airPortType, prevLocationtype, locationType, flightDetailsKeyType, days, months } from "../../../utils/data";
import { AxiosResponse } from "axios";
import { stringify } from "querystring";

const host = "world-airports-directory.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
  "X-RapidAPI-Host": host,
};

const params = {
  page: "1",
  limit: "20",
  sortBy: "AirportName:asc",
};

const getData = (data: AxiosResponse<any, any>): any[] => {
  const results = data.data.results;
  if (Array.isArray(results)) {
    return results.map(({ AirportCode, AirportName, city, country }) => ({ AirportCode, AirportName, city, country }));
  }
  return [];
};

const typedLocationDefault = "Enter city";

const BasicFlightFormElements = ({ focusedElements: { destination, departure, calendar }, flightIndex }: BasicFlightFormElementsProps) => {
  const flightData = useContext(flightContext);
  const appData = useContext(appContext);

  const [destAirports, setDestAirPorts] = useState<airPortType[]>([]);
  const [departAirports, setDepartAirPorts] = useState<airPortType[]>([]);
  const [typedLocations, setTypedLocations] = useState({
    typedDest: typedLocationDefault,
    typedDepart: typedLocationDefault,
  });
  const { typedDest, typedDepart } = typedLocations;
  const [prevSearches, setPrevSearches] = useState<prevLocationtype[]>([]);

  const { currentDay, currentMonth, currentMonthDate, setIsFocused, isFocused, blurAll, commaDelimitedDate } = appData;

  const { flightDetails, setFlightDetails } = flightData;

  const {
    depart: { location: departLocation },
    dest: { location: destLocation },
    departDate,
  } = flightDetails[flightIndex];

  const _departDate = commaDelimitedDate(departDate);

  const [debouncedDepart] = useDebounce(typedDepart, 700);
  const [debouncedDest] = useDebounce(typedDest, 700);
  const [cookie, setCookie] = useCookies(["locations"]);
  const { locations } = cookie;

  const handleFocus = (focusedInput: string, inputValue: string) => {
    setIsFocused(focusedInput);
  };
  const setCookies = (locationDetails: locationType) => {
    const { location: _location } = locationDetails;
    if (Array.isArray(locations)) {
      let _flightDetails = locations.filter((item, index) => {
        const { location } = item as locationType;
        return location !== _location && index <= 3;
      });
      setCookie("locations", JSON.stringify([locationDetails, ..._flightDetails]));
    } else if (!Array.isArray(locations)) {
      setCookie("locations", JSON.stringify([locationDetails]));
    }
  };

  const query = isFocused === destination ? debouncedDest : debouncedDepart;
  const { refetch, isFetching, isFetched, isPaused, data, isSuccess, isError } = useUseQuery(["airports"], `https://${host}/v1/airports/${query}`, false, params, headers);

  const handleSelections = (locationDetails: locationType, airPort: airPortType[]) => {
    setCookies(locationDetails);
    const data = airPort.map(({ city, country, AirportCode }) => ({
      city,
      country,
      AirportCode,
    }));
    setPrevSearches(data);
  };

  const handleSetFlightDetails = (flightDetailsKey: flightDetailsKeyType, value: string | locationType | Date) => {
    setFlightDetails((prevDetails) => {
      return prevDetails.map((flight, index) => {
        if (index === flightIndex) return { ...flight, [flightDetailsKey]: value };
        return flight;
      });
    });
  };

  const handleSelectedDeparture = (selected_code: string) => {
    let airport = departAirports.find(({ AirportCode }) => AirportCode === selected_code);
    const { city, country, AirportCode } = airport!;
    const locationDetails = { city, country, AirportCode, location: `${city}, ${country}` };
    handleSetFlightDetails("depart", locationDetails);
    handleSelections(locationDetails, departAirports);
  };
  const handleSelectedDestination = (selected_code: string) => {
    const airport = destAirports.find(({ AirportCode }) => AirportCode === selected_code);
    const { city, country, AirportCode } = airport!;
    const locationDetails = { city, country, AirportCode, location: `${city}, ${country}` };
    handleSetFlightDetails("dest", locationDetails);
    handleSelections(locationDetails, destAirports);
  };

  const handleDepartureDate = (date: Date) => {
    handleSetFlightDetails("departDate", date);
  };

  useEffect(() => {
    if (isSuccess && data) {
      if (isFocused === departure) setDepartAirPorts(getData(data));
      if (isFocused === destination) setDestAirPorts(getData(data));
    } else if (isError) {
      if (isFocused === departure) setDepartAirPorts([]);
      if (isFocused === destination) setDestAirPorts([]);
    }
  }, [isSuccess, isError, data, isFocused, departure, destination]);

  const departIsDefaultLocation = debouncedDepart === typedLocationDefault;
  const destIsDefaultLocation = debouncedDest === typedLocationDefault;
  useEffect(() => {
    if ((!departIsDefaultLocation && debouncedDepart.length >= 3 && isFocused === departure) || (!destIsDefaultLocation && debouncedDest.length >= 3 && isFocused === destination)) {
      refetch();
    }
  }, [debouncedDepart, debouncedDest, departIsDefaultLocation, departure, destIsDefaultLocation, destination, isFocused, refetch]);
  useEffect(() => {
    if ((departIsDefaultLocation || debouncedDepart.length < 3) && departAirports.length) {
      setDepartAirPorts([]);
    }
  }, [debouncedDepart, departAirports.length, departIsDefaultLocation]);
  useEffect(() => {
    if ((destIsDefaultLocation || debouncedDest.length < 3) && destAirports.length) {
      setDestAirPorts([]);
    }
  }, [debouncedDest, destAirports.length, destIsDefaultLocation]);
  if (isFocused !== departure && !departLocation && !typedDepart) {
    setTypedLocations((prevInputs) => ({ ...prevInputs, typedDepart: typedLocationDefault }));
  }

  if (isFocused !== destination && !destLocation && !typedDest) {
    setTypedLocations((prevInputs) => ({ ...prevInputs, typedDest: typedLocationDefault }));
  }

  const departIsError = ((isFetched && !data) || isPaused) && isFocused === departure;
  const destIsError = ((isFetched && !data) || isPaused) && isFocused === destination;
  const departIsLoading = isFetching && isFocused === departure && debouncedDepart.length >= 3;
  const destIsLoading = isFetching && isFocused === destination && debouncedDest.length >= 3;

  return (
    <>
      <li className="w-100" style={{ position: "relative" }}>
        <InputWrapper label="From" icon="material-symbols-light:flight">
          <>
            {isFocused === departure && <InputBar />}
            <InputDropDown
              name="departure"
              inputId="departure"
              value={departLocation || typedDepart}
              handleChange={(e) => {
                if (!departLocation) {
                  setTypedLocations((prevInputs) => ({ ...prevInputs, typedDepart: e.target.value }));
                }
              }}
              placeHolder={typedLocationDefault}
              handleFocus={() => {
                handleFocus(departure, departLocation);
                if (typedDepart === typedLocationDefault) {
                  setTypedLocations((prevInputs) => ({ ...prevInputs, typedDepart: "" }));
                }
              }}
              isFocused={isFocused === departure}
              disabled={departLocation ? true : false}
            >
              <PossibleLocations previousSearches={prevSearches} previousLocations={locations || []} searchTerm={typedDepart === typedLocationDefault ? "" : typedDepart} airPorts={departAirports} handleClick={handleSelectedDeparture} setLocation={handleSetFlightDetails} locationType="depart">
                <SearchPrompt as="li" searchTerm={typedDepart === typedLocationDefault ? "" : typedDepart} isError={departIsError} isLoading={departIsLoading} />
              </PossibleLocations>
            </InputDropDown>
            {departLocation && (
              <Button
                handleClick={(e) => {
                  e.stopPropagation();
                  setTypedLocations((prevInputs) => ({ ...prevInputs, typedDepart: "" }));
                  handleSetFlightDetails("depart", "");
                  handleFocus(departure, departLocation);
                }}
                buttonClass="datalistTrigger"
                buttonType="button"
              >
                <Icon style={{ color: "white", fontSize: "15px" }} icon="mdi:cancel-bold" />
              </Button>
            )}
          </>
        </InputWrapper>
        <ArrowSwap />
      </li>
      <li className="w-100">
        <InputWrapper label="To" icon="mdi:location">
          <InputDropDown
            name="destination"
            inputId="destination"
            value={destLocation || typedDest}
            handleChange={(e) => {
              if (!destLocation) {
                setTypedLocations((prevInputs) => ({ ...prevInputs, typedDest: e.target.value }));
              }
            }}
            placeHolder={typedLocationDefault}
            handleFocus={() => {
              handleFocus(destination, destLocation);
              if (typedDest === typedLocationDefault) {
                setTypedLocations((prevInputs) => ({ ...prevInputs, typedDest: "" }));
              }
            }}
            isFocused={isFocused === destination}
            disabled={destLocation ? true : false}
          >
            <PossibleLocations previousSearches={prevSearches} previousLocations={locations || []} searchTerm={typedDest === typedLocationDefault ? "" : typedDest} airPorts={destAirports} handleClick={handleSelectedDestination} setLocation={handleSetFlightDetails} locationType="dest">
              <SearchPrompt as="li" searchTerm={typedDest === typedLocationDefault ? "" : typedDest} isError={destIsError} isLoading={destIsLoading} />
            </PossibleLocations>
          </InputDropDown>
          {destLocation && (
            <Button
              handleClick={(e) => {
                e.stopPropagation();
                setTypedLocations((prevInputs) => ({ ...prevInputs, typedDest: "" }));
                handleSetFlightDetails("dest", "");
              }}
              buttonClass="datalistTrigger"
              buttonType="button"
            >
              <Icon style={{ color: "white", fontSize: "15px" }} icon="mdi:cancel-bold" />
            </Button>
          )}
        </InputWrapper>
      </li>
      <li className="w-100">
        <InputWrapper label="Departure" icon="ph:calendar-thin">
          <InputDropDown name="departDate" inputId="departDate" value={_departDate} placeHolder={`${currentDay}, ${currentMonth}, ${currentMonthDate}`} isFocused={isFocused === calendar} handleFocus={() => handleFocus(calendar, _departDate)} readonly={true}>
            <BookingCalendar showDoubleView={false} setDate={handleDepartureDate} selectRange={false} />
          </InputDropDown>
        </InputWrapper>
      </li>
    </>
  );
};

export default BasicFlightFormElements;
