import { useContext, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

import { ClassListProps } from "../../../utils/data";
import { appContext } from "../../../context/ContextWrapper";

const ClassList = ({ defaultClass, setFlightClass, flightIndex }: ClassListProps) => {
  const appData = useContext(appContext);
  const { blurAll } = appData;
  const flightClasses = ["Economy", "Premium Economy", "Business Class", "First Class"];
  const handleListClick = (flightClassIndex: number) => {
    setFlightClass((prevDetails) => {
      return prevDetails.map((flight, index) => {
        if (index === flightIndex) return { ...flight, flightClassIndex };
        return flight;
      });
    });
  };

  const intialRenderRef = useRef(true);

  useEffect(() => {
    if (!intialRenderRef.current) blurAll();
    else intialRenderRef.current = false;
  });

  const _flightClasses = flightClasses.map((flightClass, index) => {
    if (defaultClass === flightClass)
      return (
        <li onClick={() => handleListClick(index)} style={{ cursor: "pointer" }} className="defaultClass" key={index}>
          <Icon style={{ color: "inherit" }} icon="material-symbols:check" />
          {flightClass}
        </li>
      );
    return (
      <li onClick={() => handleListClick(index)} style={{ cursor: "pointer" }} key={index}>
        {flightClass}
      </li>
    );
  });
  return <ul className="flightClasses">{_flightClasses}</ul>;
};

export default ClassList;
