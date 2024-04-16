import { useState } from "react";

import FilterHeader from "./FilterHeader";

import { flightFiltersTypeProps } from "../../utils/data";

const FlightFliters = ({ children, sortedFlightData }: flightFiltersTypeProps) => {
  const [stops, setStops] = useState<string[]>([]);
  return (
    <ul className="w-100  d-flex flex-column gap-4 p-0" style={{ paddingBottom: "700px" }}>
      {children}
      <li>
        <FilterHeader filterType="Stops" handleClick={() => {}} />
      </li>
    </ul>
  );
};

export default FlightFliters;
