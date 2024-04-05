import React from "react";

import FlightCard from "./FlightCard";
import Button from "../Button";

import { flightListPropType } from "../../utils/data";

const FlightList = ({ flightData, flightNames }: flightListPropType) => {
  let flightName = flightNames[0];
  let startIndex = 0;
  const flightList = flightData.map(({ segments, priceBreakdown, token }, index) => {
    const { name } = segments[0].legs[0].carriersData[0];
    if (name !== flightName) {
      const lastFlightName = flightName;
      flightName = name;
      const prevFlightCount = index - startIndex;
      const hiddenListCount = prevFlightCount - 2;
      const shouldHideSome = hiddenListCount > 0;
      startIndex = index;
      if (shouldHideSome) {
        return (
          <React.Fragment key={index}>
            <li className="d-flex justify-content-center w-100">
              <Button buttonType="button" buttonLabel={`Load ${hiddenListCount} more results for ${lastFlightName}`} buttonClass="flightListToggle" />
            </li>
            <FlightCard segments={segments} priceBreakdown={priceBreakdown} token={token} key={index} />
          </React.Fragment>
        );
      }
    }
    return <FlightCard segments={segments} priceBreakdown={priceBreakdown} token={token} key={index} />;
  });
  return <ul className="d-flex flex-column gap-3 w-100 p-0 mt-5">{flightList}</ul>;
};

export default FlightList;
