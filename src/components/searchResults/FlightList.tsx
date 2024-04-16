import React, { useState } from "react";
import { Icon } from "@iconify/react";

import FlightCard from "./FlightCard";
import Button from "../Button";

import { flightListPropType } from "../../utils/data";

const FlightList = ({ flightData, flightNames }: flightListPropType) => {
  let startIndex = 0;
  let flightNameIndex = 0;
  const _shouldDisplay: boolean[] = [];
  for (let index = 0; index < flightNames.length; index++) _shouldDisplay.push(false);

  const [shouldDisplay, setShoulDispay] = useState(_shouldDisplay);
  const handleClick = (index: number) => {
    setShoulDispay((prevArray) => {
      return prevArray.map((value, _index) => {
        if (_index === index) return !value;
        return value;
      });
    });
  };
  const flightList = flightData.map(({ segments, priceBreakdown, token }, index) => {
    const { name } = segments[0].legs[0].carriersData[0];
    const prevFlightCount = index - startIndex;
    if (name !== flightNames[flightNameIndex]) {
      const _flightNameIndex = flightNameIndex;
      const lastFlightName = flightNames[flightNameIndex];
      flightNameIndex++;
      const hiddenListCount = prevFlightCount - 2;
      const shouldHideSome = hiddenListCount > 0;
      startIndex = index;
      if (shouldHideSome) {
        return (
          <React.Fragment key={index}>
            <li className="d-flex justify-content-center w-100">
              <Button handleClick={() => handleClick(_flightNameIndex)} buttonType="button" buttonLabel={!shouldDisplay[_flightNameIndex] ? `Load ${hiddenListCount} more results for ${lastFlightName}` : "Show Less Result"} buttonClass="flightListToggle text-dark">
                {!shouldDisplay[_flightNameIndex] && <Icon icon="ep:plus" />}
                {shouldDisplay[_flightNameIndex] && <Icon icon="ep:minus" />}
              </Button>
            </li>
            <FlightCard flightData={{ segments, priceBreakdown, token }} key={index} />
          </React.Fragment>
        );
      }
    }
    if (prevFlightCount > 1) {
      const shouldDisplayCard = shouldDisplay[flightNameIndex];
      return <React.Fragment key={index}>{shouldDisplayCard && <FlightCard flightData={{ segments, priceBreakdown, token }} />}</React.Fragment>;
    }
    return <FlightCard flightData={{ segments, priceBreakdown, token }} key={index} />;
  });
  return <ul className="d-flex flex-column gap-3 w-100 p-0 mt-5">{flightList}</ul>;
};

export default FlightList;
