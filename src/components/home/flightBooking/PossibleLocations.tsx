import { ReactNode, useContext } from "react";

import { PossibleLocationsProps, prevLocationtype, locationType } from "../../../utils/data";
import { appContext } from "../../../context/ContextWrapper";

const addCities = (newCities: prevLocationtype[], cities: ReactNode[], startKey: number, handleClick: (locationDetails: locationType) => void, className?: string): number => {
  var _key = startKey;
  var index = 0;
  while (newCities.length && index < newCities.length) {
    const { city, country, AirportCode } = newCities[index];
    const location = `${city}, ${country}`;
    const locationDetails = { city, country, AirportCode, location };
    if (index === newCities.length - 1 && className) {
      cities.push(
        <li onClick={() => handleClick(locationDetails)} className={`previousLocations ${className}`} key={_key}>
          <p>{city}</p>
        </li>
      );
    } else {
      cities.push(
        <li onClick={() => handleClick(locationDetails)} className="previousLocations" key={_key}>
          <p>{city}</p>
        </li>
      );
    }
    index++;
    _key++;
  }
  return _key;
};

const PossibleLocations = ({ airPorts, children, previousLocations, previousSearches, searchTerm, handleClick, setLocation, locationType }: PossibleLocationsProps) => {
  const appData = useContext(appContext);
  const { blurAll } = appData;

  const handleListClick = (locationDetails: locationType) => {
    setLocation(locationType, locationDetails);
    blurAll();
  };

  var cities = [];
  if (!airPorts.length) {
    if (!searchTerm) {
      cities.push(
        <li className="label" key={0}>
          <p>RECENT PLACES</p>
        </li>
      );
      let _key = addCities(previousLocations, cities, 1, handleListClick, "lastLocation");
      cities.push(
        <li className="label" key={_key++}>
          <p>CITIES</p>
        </li>
      );
      addCities(previousSearches, cities, _key, handleListClick);
      return <ul className="flightData">{cities}</ul>;
    } else {
      return <ul className="flightData">{children}</ul>;
    }
  }

  cities = airPorts.map(({ AirportName, AirportCode, city, country }) => {
    return (
      <li
        onClick={() => {
          handleClick(AirportCode);
          blurAll();
        }}
        className="d-flex gap-3 align-items-center"
        key={AirportCode}
      >
        <span className="d-flex flex-column flex-grow-1" style={{ width: "100px", justifyContent: "flex-start", lineHeight: "22px" }}>
          <span style={{ whiteSpace: "pre-wrap" }}>
            {city}, {country}
          </span>
          <span style={{ fontWeight: "lighter", whiteSpace: "pre-wrap" }}>
            {AirportName} ({AirportCode})
          </span>
        </span>
        <span className="d-flex justify-content-center align-items-center" style={{ borderRadius: "5px", border: "solid black 1px", height: "50px", width: "50px" }}>
          {AirportCode.toLocaleUpperCase()}
        </span>
      </li>
    );
  });
  return <ul className="flightData">{cities}</ul>;
};

export default PossibleLocations;
