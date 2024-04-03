import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";

import FlightSearchDetails from "./FlightSearchDetails";
import FlightGrouping from "./FlightGrouping";
import FlightSlider from "./FlightSlider";

import { searchResultType, searchFlightDetailsType, months, days, flightSearchDataType } from "../../utils/data";

const stringfyDate = (date: Date): string => {
  const year = date.getFullYear();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const _date = date.getDate();
  return `${day} ${month} ${_date}, ${year}`;
};
const isFlightDetails = (details: any): details is searchFlightDetailsType => {
  return details && "departDate" in details && "departLocation" in details;
};
const SearchResults = () => {
  const [cellHeight, setCellHeight] = useState("0px");
  const imageRef = useRef<HTMLImageElement>(null!);
  const width = window.screen.width;
  const widthMultiplier = 0.4284;
  const [columnWidth, setColumnWidth] = useState(() => width * widthMultiplier);
  const location = useLocation();
  const data: flightSearchDataType | undefined = location?.state?.data;
  const error: string | undefined = location.state?.error;
  const searchType: searchResultType | undefined = location?.state?.searchType;
  const searchDetails: searchFlightDetailsType | undefined = location?.state?.searchDetails;
  useEffect(() => {
    const reloadListener = () => {
      const height = imageRef.current.parentElement!.clientHeight;
      setCellHeight(() => `${height + 40}px`);
    };
    imageRef.current.addEventListener("load", reloadListener);
    return () => imageRef.current.removeEventListener("load", reloadListener);
  }, []);
  useEffect(() => {
    const resizeListener = () => {
      const width = window.screen.width;
      setColumnWidth(() => widthMultiplier * width);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  if (error) {
    const _error = error;
  }
  if (isFlightDetails(searchDetails)) {
    const flightNames: string[] = [];
    const flightLogos: string[] = [];
    data!.sort((flight1, flight2) => {
      const {
        segments: segment1,
        priceBreakdown: {
          total: { units: unit1 },
        },
      } = flight1;
      const name1 = segment1[0].legs[0].carriersData[0].name;
      const leg1Length = segment1[0].legs.length;
      const {
        segments: segment2,
        priceBreakdown: {
          total: { units: unit2 },
        },
      } = flight2;
      const name2 = segment2[0].legs[0].carriersData[0].name;
      const leg2Length = segment2[0].legs.length;

      if (name1 > name2) return 1;
      if (name1 < name2) return -1;
      if (name1 === name2) {
        if (leg1Length > leg2Length) return 1;
        if (leg1Length < leg2Length) return -1;
        if (leg1Length === leg2Length) {
          if (unit1 > unit2) return 1;
          if (unit1 < unit2) return -1;
        }
      }
      return 0;
    });
    for (let index = 0; index < data!.length; index++) {
      const { segments } = data![index];
      const { name, logo } = segments[0].legs[0].carriersData[0];
      if (!flightNames.includes(name)) {
        flightNames.push(name);
        flightLogos.push(logo);
      }
    }
    const { departDate, destLocation, departLocation, dest_code, depart_code, children, infants, adults, returnDate, flightClass } = searchDetails;
    if (searchType === "oneWayFlight" || searchType === "roundTripFlight") {
      return (
        <>
          <FlightSearchDetails
            departDate={stringfyDate(departDate)}
            destLocation={destLocation}
            dest_code={dest_code}
            depart_code={depart_code}
            departLocation={departLocation}
            children={children}
            infants={infants}
            adults={adults}
            flightClass={flightClass}
            returnDate={returnDate ? stringfyDate(returnDate) : returnDate}
          />
          <FlightSlider cellHeight={cellHeight} columnWidth={columnWidth} flightNamesCount={flightNames.length}>
            <FlightGrouping ref={imageRef} flightData={data!} cellHeight={cellHeight} columnWidth={columnWidth} flightLogos={flightLogos} flightNames={flightNames} />
          </FlightSlider>
        </>
      );
    }
  }
  return <div>SearchResults</div>;
};

export default SearchResults;
