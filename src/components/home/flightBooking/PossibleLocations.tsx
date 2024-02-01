import { ReactNode } from "react";

import { PossibleLocationsProps, prevLocationtype } from "../../../utils/data";

const addCities = (newCities: prevLocationtype[], cities: ReactNode[], startKey: number, handleClick: (displayName: string) => void, className?: string): number => {
  var _key = startKey;
  var index = 0;
  while (newCities.length && index < newCities.length) {
    const displayName = newCities[index].displayName;
    if (index === newCities.length - 1 && className) {
      cities.push(
        <li onClick={() => handleClick(displayName)} className={`previousLocations ${className}`} key={_key}>
          <p>{newCities[index].cityName}</p>
        </li>
      );
    } else {
      cities.push(
        <li onClick={() => handleClick(displayName)} className="previousLocations" key={_key}>
          <p>{newCities[index].cityName}</p>
        </li>
      );
    }
    index++;
    _key++;
  }
  return _key;
};

const PossibleLocations = ({ airPorts, children, previousLocations, previousSearches, searchTerm, handleClick, setLocation }: PossibleLocationsProps) => {
  const handleListClick = (location: string) => setLocation(location);
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

  cities = airPorts.map(({ name, code, display_name, city_name }) => {
    return (
      <li onClick={() => handleClick(display_name, city_name)} className="d-flex gap-3 align-items-center" key={code}>
        <span className="d-flex flex-column flex-grow-1" style={{ width: "100px", justifyContent: "flex-start", lineHeight: "22px" }}>
          <span style={{ whiteSpace: "pre-wrap" }}>{display_name}</span>
          <span style={{ fontWeight: "lighter", whiteSpace: "pre-wrap" }}>
            {name} ({code})
          </span>
        </span>
        <span className="d-flex justify-content-center align-items-center" style={{ borderRadius: "5px", border: "solid black 1px", height: "50px", width: "50px" }}>
          {code.toLocaleUpperCase()}
        </span>
      </li>
    );
  });
  return <ul className="flightData">{cities}</ul>;
};

export default PossibleLocations;
