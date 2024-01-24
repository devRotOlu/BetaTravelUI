import { Icon } from "@iconify/react";

import { FlightClassesProps } from "../../../utils/data";

const FlightClasses = ({ defaultClass, setFlightClass, flightIndex }: FlightClassesProps) => {
  const flightClasses = ["Economy", "Premium Economy", "Business Class", "First Class"];
  const handleClick = (flightClass: string) => {
    setFlightClass((prevDetails) => {
      return prevDetails.map((flight, index) => {
        if (index === flightIndex) return { ...flight, flightClass };
        return flight;
      });
    });
  };
  const _flightClasses = flightClasses.map((flightClass, index) => {
    if (defaultClass === flightClass)
      return (
        <li onClick={() => handleClick(flightClass)} style={{ cursor: "pointer" }} className="defaultClass" key={index}>
          <Icon style={{ color: "inherit" }} icon="material-symbols:check" />
          {flightClass}
        </li>
      );
    return (
      <li onClick={() => handleClick(flightClass)} style={{ cursor: "pointer" }} key={index}>
        {flightClass}
      </li>
    );
  });
  return <ul className="flightClasses">{_flightClasses}</ul>;
};

export default FlightClasses;
