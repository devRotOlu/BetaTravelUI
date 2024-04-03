import { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

import { searchFlightDetailsType } from "../../../utils/data";

import BasicFlightFormElements from "./BasicFlightFormElements";
import SeatBooking from "./SeatBooking";
import FlightClass from "./FlightClass";
import ClassList from "./ClassList";
import SeatBookingDropDown from "./SeatBookingDropDown";
import BookingsWrapper from "../BookingsWrapper";
import NotificationWrapper from "../../notifications/NotificationWrapper";
import SearchResultNotification from "../../notifications/SearchResultNotification";
import BookingForm from "../../formElements/BookingForm";
import Button from "../../Button";

import useAllisBlurred from "../../../utils/useCustomHooks/useAllisBlurred";
import { flightContext } from "../../../context/FlightContext";
import { appContext } from "../../../context/ContextWrapper";
import useUseQuery from "../../../utils/useCustomHooks/useUseQuery";
import { flightBookingParamsType } from "../../../utils/data";

const focusedElement = { departure: "departure", destination: "destination", calendar: "departCalendar" };

const _flightClasses = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"];

const OneWayBooking = () => {
  const flightData = useContext(flightContext);
  const appData = useContext(appContext);

  const { flightDetails, setFlightDetails, passengerCount, flightBookingHeaders, flightBookingUrl, wardsAgeList, flightClasses } = flightData;
  const { setIsFocused, notification, setNotification, blurAll, commaDelimitedDate, dashDelimitedDate } = appData;

  const {
    depart: { city: departLocation, AirportCode: depart_code },
    departDate,
    dest: { city: destLocation, AirportCode: dest_code },
    flightClassIndex,
  } = flightDetails[0];
  const { adults, children: _children, infants } = passengerCount[0];
  const passengerSum = adults + _children + infants;

  const handleFocus = () => setIsFocused("seatBooking");

  const flightParams: flightBookingParamsType = {
    adults: `${adults}`,
    children: wardsAgeList,
    departDate: dashDelimitedDate(departDate),
    fromId: `${depart_code}.AIRPORT`,
    toId: `${dest_code}.AIRPORT`,
    cabinClass: _flightClasses[flightClassIndex],
    currency_code: "NGN",
  };

  const _departDate = commaDelimitedDate(departDate);

  const { isFetched, isFetching, data, isPaused, refetch, isError } = useUseQuery(["oneWayFlightBooking"], flightBookingUrl, false, flightParams, flightBookingHeaders);

  const handleSubmit = () => {
    refetch();
  };

  const navigate = useNavigate();

  let searchDetails: searchFlightDetailsType = { departDate, departLocation, depart_code, destLocation, dest_code, adults, children: _children, infants, flightClass: flightClasses[flightClassIndex] };

  const queryParams = `?adults=${adults}&children=${wardsAgeList}&departDate=${dashDelimitedDate(departDate)}&fromId=${depart_code}.AIRPORT&toId=${dest_code}.AIRPORT$cabinClass=${_flightClasses[flightClassIndex]}$currency_code=NGN`;

  useEffect(() => {
    if (isFetching) setNotification("searchResultLoader");
    if (isFetched || isPaused) {
      setNotification("");
      const route = "/search/one-way-flights";
      const _data = data?.data?.data?.flightOffers;
      if (_data) {
        const reqLength = queryParams.length + route.length;
        navigate(route.padEnd(reqLength, queryParams), { state: { data: _data, searchDetails, searchType: "oneWayFlight" } });
      } else {
        navigate(route, { state: { error: "" } });
      }
    }
  }, [isFetching, isFetched]);

  useAllisBlurred(blurAll);
  return (
    <>
      <BookingForm handleSubmit={handleSubmit}>
        <BookingsWrapper>
          <BasicFlightFormElements focusedElements={focusedElement} flightIndex={0} />
          <li className="d-flex gap-0" style={{ height: "65px", position: "relative" }}>
            <SeatBooking inputClass="passengerCount">
              <SeatBookingDropDown handleFocus={handleFocus} styles={{ position: "absolute", top: "50%", transform: "translate(-140%,-50%)", left: "50%", marginRight: "40px", display: "block", cursor: "pointer" }} />
            </SeatBooking>
            <FlightClass inputClass="flightClass" focusedInput="flightClass" flightClass={flightClasses[flightClassIndex]}>
              <ClassList defaultClass={flightClasses[flightClassIndex]} setFlightClass={setFlightDetails} flightIndex={0} />
            </FlightClass>
          </li>
        </BookingsWrapper>
        <Button buttonLabel="Search Flights" buttonType="submit">
          <span>
            <Icon icon="ion:chevron-forward-outline" />
          </span>
        </Button>
      </BookingForm>
      {notification === "searchResultLoader" && (
        <NotificationWrapper>
          <SearchResultNotification departure={`${departLocation} (${depart_code})`} destination={`${destLocation} (${dest_code})`} departureDate={_departDate} flightClass={flightClasses[flightClassIndex]} passengerCount={passengerSum} />
        </NotificationWrapper>
      )}
    </>
  );
};

export default OneWayBooking;
