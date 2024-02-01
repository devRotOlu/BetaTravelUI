import { useContext, useState, useEffect, useRef } from "react";
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
import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { Value, BasicFlightFormElementsProps, days, months, airPortType, prevLocationtype } from "../../../utils/data";

const route = "https://travel-advisor.p.rapidapi.com/airports/search";
const headers = {
  "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
  "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
};

const BasicFlightFormElements = ({ focusedElements: { destination, departure, calendar }, flightIndex }: BasicFlightFormElementsProps) => {
  const flightData = useContext(flightContext);
  const appData = useContext(appContext);
  const [destAirports, setDestAirPorts] = useState<airPortType[]>([]);
  const [departAirports, setDepartAirPorts] = useState<airPortType[]>([]);
  const [selectedDepart, setSelectedDepart] = useState("");
  const [selectedDest, setSelectedDest] = useState("");
  const [prevSearches, setPrevSearches] = useState<prevLocationtype[]>([]);
  const [destIsTyping, setDestIsTyping] = useState(false);
  const [departIsTyping, setDepartIsTyping] = useState(false);

  const { currentDate, currentDay, currentMonth, currentMonthDate } = appData;
  const [_departDate, setDepartDate] = useState<Value>([currentDate, currentDate]);

  const { flightDetails, setFlightDetails, setIsFocused, isFocused, blurAll } = flightData;
  const _date = `${days[_departDate[0].getDay()]}, ${months[_departDate[0].getMonth()]} ${_departDate[0].getDate()}`;
  const { depart, dest } = flightDetails[flightIndex];

  const [debouncedDepart] = useDebounce(depart, 300);
  const [debouncedDest] = useDebounce(dest, 300);
  const [cookie, setCookie] = useCookies(["locations"]);
  const { locations } = cookie;

  const destRef = useRef<HTMLInputElement>(null!);
  const departRef = useRef<HTMLInputElement>(null!);

  const handleFocused = (focusedInput: string) => {
    setIsFocused(focusedInput);
  };
  useAllisBlurred(blurAll);

  const setCookies = (cityName: string, displayName: string) => {
    if (Array.isArray(locations) && cityName) {
      let _flightDetails = locations.filter((item, index) => {
        if (locations.length < 5) return item !== cityName;
        return index < 5 || item !== cityName;
      });
      setCookie("locations", JSON.stringify([{ cityName, displayName }, ..._flightDetails]));
    } else if (!Array.isArray(locations) && cityName) {
      setCookie("locations", JSON.stringify([{ cityName, displayName }]));
    }
  };

  const {
    refetch: refetchDest,
    isLoading: destIsLoading,
    isError: destIsError,
  } = useUseQuery(
    "destination-airports",
    route,
    false,
    {
      query: debouncedDest,
      locale: "en-us",
    },
    headers,
    (data) => {
      let _data = [];
      if (Array.isArray(data.data)) _data = data.data.filter((_, index) => index < 5);
      setDestAirPorts(_data);
    },
    () => setDestAirPorts([])
  );

  const {
    refetch: refetchDepart,
    isLoading: departIsLoading,
    isError: departIsError,
  } = useUseQuery(
    "departure-airports",
    route,
    false,
    {
      query: debouncedDepart,
      locale: "en-us",
    },
    headers,
    (data) =>
      setDepartAirPorts(() => {
        const _data = data.data;
        if (Array.isArray(_data)) {
          return _data.filter((_, index) => index < 5);
        }
        return [];
      }),
    () => setDepartAirPorts([])
  );
  const handleDepartSelectn = (display_name: string, cityName: string) => {
    const displayName = display_name.split("(")[0].trimEnd();
    setSelectedDepart(displayName);
    setCookies(cityName, displayName);
    const data = departAirports.map(({ city_name, display_name }) => ({
      cityName: city_name,
      displayName: display_name.split("(")[0].trimEnd(),
    }));
    setPrevSearches(data);
  };
  const handleDestSelectn = (display_name: string, cityName: string) => {
    const displayName = display_name.split("(")[0].trimEnd();
    setSelectedDest(displayName);
    setCookies(cityName, displayName);
    const data = departAirports.map(({ city_name, display_name }) => ({ cityName: city_name, displayName: display_name.split("(")[0].trimEnd() }));
    setPrevSearches(data);
  };

  useEffect(() => {
    if (debouncedDepart.length >= 3) {
      refetchDepart();
    }
  }, [debouncedDepart, refetchDepart]);
  useEffect(() => {
    if (debouncedDepart.length < 3 && departAirports.length) {
      setDepartAirPorts([]);
    }
  }, [debouncedDepart, departAirports.length]);
  useEffect(() => {
    if (debouncedDest.length >= 3) refetchDest();
  }, [debouncedDest, refetchDest]);
  useEffect(() => {
    if (debouncedDest.length < 3 && destAirports.length) {
      setDestAirPorts([]);
    }
  }, [debouncedDest, destAirports.length]);

  if (isFocused === destination && !destIsTyping) setDestIsTyping(true);
  if (isFocused === departure && !departIsTyping) setDepartIsTyping(true);

  return (
    <>
      <li className="w-100" style={{ position: "relative" }}>
        <InputWrapper label="From" icon="material-symbols-light:flight">
          <>
            {isFocused === departure && <InputBar />}
            <InputDropDown
              name="departure"
              inputId="departure"
              value={selectedDepart || depart}
              handleChange={(e) =>
                setFlightDetails((prev) => {
                  return prev.map((flight, index) => {
                    if (index === flightIndex) return { ...flight, depart: e.target.value };
                    return flight;
                  });
                })
              }
              placeHolder="Enter City"
              handleFocus={() => handleFocused(departure)}
              isFocused={isFocused === departure}
            >
              <PossibleLocations previousSearches={prevSearches} previousLocations={locations || []} searchTerm={depart} airPorts={departAirports} handleClick={handleDepartSelectn} setLocation={setSelectedDepart}>
                <SearchPrompt as="li" searchTerm={depart} isError={departIsError} isLoading={departIsLoading} isTyping={departIsTyping} />
              </PossibleLocations>
            </InputDropDown>
            {selectedDepart && (
              <Button
                handleClick={() => {
                  setSelectedDepart("");
                  setFlightDetails((prev) => {
                    return prev.map((flight, index) => {
                      if (index === flightIndex) return { ...flight, depart: "" };
                      return flight;
                    });
                  });
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
            value={selectedDest || dest}
            handleChange={(e) => {
              setFlightDetails((prev) => {
                return prev.map((flight, index) => {
                  if (index === flightIndex) return { ...flight, dest: e.target.value };
                  return flight;
                });
              });
            }}
            placeHolder="Enter City"
            handleFocus={() => handleFocused(destination)}
            isFocused={isFocused === destination}
          >
            <PossibleLocations previousSearches={prevSearches} previousLocations={locations || []} searchTerm={dest} airPorts={destAirports} handleClick={handleDestSelectn} setLocation={setSelectedDest}>
              <SearchPrompt as="li" searchTerm={dest} isError={destIsError} isTyping={destIsTyping} isLoading={destIsLoading} />
            </PossibleLocations>
          </InputDropDown>
          {selectedDest && (
            <Button
              handleClick={() => {
                setSelectedDest("");
                setFlightDetails((prev) => {
                  return prev.map((flight, index) => {
                    if (index === flightIndex) return { ...flight, dest: "" };
                    return flight;
                  });
                });
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
          <InputDropDown
            name="departDate"
            inputId="departDate"
            value={_date}
            handleChange={(e) => {
              setFlightDetails((prev) => {
                return prev.map((flight, index) => {
                  if (index === flightIndex) return { ...flight, departDate: e.target.value };
                  return flight;
                });
              });
            }}
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
