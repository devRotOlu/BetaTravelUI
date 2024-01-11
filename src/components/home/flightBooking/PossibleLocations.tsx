import { ReactNode, useState, useEffect } from "react";

import { PossibleLocationsProps } from "../../../utils/data";

import useUseQuery from "../../../utils/useCustomHooks/useUseQuery";

const addCities = (newCities: string[], cities: ReactNode[], startKey: number): number => {
  var _key = startKey;
  var index = 0;
  while (newCities.length && index < newCities.length) {
    cities.push(<option key={_key}>{newCities[index]}</option>);
    index++;
    _key++;
  }
  return _key;
};

const PossibleLocations = ({ searchTerm, children, previousLocations, previousSearches }: PossibleLocationsProps) => {
  const [airports, setAirPorts] = useState<
    {
      name: string;
      code: string;
      display_name: string;
    }[]
  >([]);
  useEffect(() => console.log("being rendered"), []);
  const { refetch } = useUseQuery(
    "airport-locations",
    "https://travel-advisor.p.rapidapi.com/airports/search",
    false,
    {
      query: searchTerm,
      locale: "en-us",
    },
    {
      "X-RapidAPI-Key": "2565c29410msh5d5d2f756f9eed5p130a89jsn0a7a959312b9",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
    (data) => setAirPorts(data.data),
    () => setAirPorts([])
  );

  useEffect(() => {
    if (searchTerm.length >= 3) refetch();
    else setAirPorts([]);
  }, [searchTerm, refetch]);

  var cities = [];
  if (!airports.length) {
    if (!searchTerm) {
      cities.push(<option key={0}>RECENT PLACES</option>);
      let _key = addCities(previousLocations, cities, 1);
      cities.push(
        <option className="baseList" key={_key++}>
          CITIES
        </option>
      );
      addCities(previousSearches, cities, _key);
      return <>{cities}</>;
    } else {
      return <>{children}</>;
    }
  }
  cities = airports.map(({ name, code, display_name }) => {
    return (
      <option className="d-flex gap-1 align-items-center justify-content-between" key={code}>
        <p className="d-flex flex-column flex-grow-1" style={{ textWrap: "wrap" }}>
          <span>{display_name}</span>
          <span>
            {name} ({code})
          </span>
        </p>
        <span className="d-flex justify-content-center align-items-center" style={{ width: "fit-content", padding: "2px 5px", borderRadius: "5px", border: "solid black 1px", height: "fit-content" }}>
          {code.toLocaleUpperCase()}
        </span>
      </option>
    );
  });
  return <>{cities}</>;
};

export default PossibleLocations;
